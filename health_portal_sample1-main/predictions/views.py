import os
import joblib
import tensorflow as tf
from rest_framework.views import APIView
from rest_framework.response import Response
import numpy as np
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

# Try to load model artifacts at import time so errors are visible early.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MLB_PATH = os.path.join(BASE_DIR, 'mlb.pkl')
LE_PATH = os.path.join(BASE_DIR, 'le.pkl')
MODEL_PATH = os.path.join(BASE_DIR, 'model.keras')

mlb = None
le = None
model = None
model_input_size = None

def _safe_load():
    global mlb, le, model
    try:
        if os.path.exists(MLB_PATH):
            mlb = joblib.load(MLB_PATH)
        else:
            logger.warning('mlb.pkl not found at %s', MLB_PATH)

        if os.path.exists(LE_PATH):
            le = joblib.load(LE_PATH)
        else:
            logger.warning('le.pkl not found at %s', LE_PATH)

        if os.path.exists(MODEL_PATH):
            model = tf.keras.models.load_model(MODEL_PATH)
            # record expected input size if available
            try:
                inp_shape = model.input_shape
                # input_shape can be a tuple or list; pick the last known dims
                if isinstance(inp_shape, (list, tuple)) and len(inp_shape) >= 2:
                    # common case: (None, n_features)
                    model_input_size = int(inp_shape[1]) if inp_shape[1] is not None else None
                else:
                    model_input_size = None
                print('MODEL_LOADED input_shape=', inp_shape, 'expected_input_size=', model_input_size)
            except Exception:
                print('MODEL_LOADED but could not determine input_shape')
        else:
            logger.warning('model.keras not found at %s', MODEL_PATH)
    except Exception as e:
        logger.exception('Failed to load model artifacts: %s', e)


_safe_load()


class PredictionView(APIView):
    def post(self, request):
        symptoms = request.data.get('symptoms', [])  # List of strings

        if not isinstance(symptoms, list):
            return Response({'error': 'Invalid payload: symptoms must be a list'}, status=400)

        if mlb is None or le is None or model is None:
            # Model artifacts are missing or failed to load.
            # If we're in DEBUG mode, return a small dev-only fallback prediction so UI can be tested.
            if getattr(settings, 'DEBUG', False):
                # Simple heuristic fallback: if some common symptoms present, return a matching label;
                # otherwise return a generic test disease. This is only for local development.
                low = [s.lower() for s in symptoms]
                if any('cough' in s for s in low):
                    return Response({'disease': 'Common Cold'})
                if any('fever' in s or 'temperature' in s or 'high_fever' in s for s in low):
                    return Response({'disease': 'Flu'})
                if any('itch' in s or 'rash' in s or 'skin' in s for s in low):
                    return Response({'disease': 'Skin Allergy'})
                return Response({'disease': 'Test Disease (dev)'})

            return Response(
                {'error': 'Prediction model is not available on the server. Contact administrator.'},
                status=503,
            )

        try:
            input_data = mlb.transform([symptoms])
            # If the transformer returns a sparse matrix, convert to dense array
            if hasattr(input_data, 'toarray'):
                input_data = input_data.toarray()
            # Ensure numeric dtype expected by the model and make contiguous
            input_data = np.asarray(input_data, dtype=np.float32)
            input_data = np.ascontiguousarray(input_data)
            # If model has a known expected input size, ensure compatibility
            if model is not None and model_input_size is not None:
                # input_data expected shape: (1, n_features)
                n_features = input_data.shape[1]
                if n_features < model_input_size:
                    # pad with zeros
                    pad_width = model_input_size - n_features
                    input_data = np.pad(input_data, ((0,0),(0,pad_width)), mode='constant', constant_values=0)
                    print(f'PADDING input from {n_features} to {model_input_size}')
                elif n_features > model_input_size:
                    input_data = input_data[:, :model_input_size]
                    print(f'TRIMMING input from {n_features} to {model_input_size}')
            # basic sanity checks after shaping
            finite_ok = np.isfinite(input_data).all()
            logger.debug('Prepared input for model: shape=%s dtype=%s contiguous=%s finite=%s',
                         getattr(input_data, 'shape', None), input_data.dtype, input_data.flags['C_CONTIGUOUS'], finite_ok)
            # Temporary print for easier debugging in the Django console
            try:
                print('DEBUG_INPUT shape=', getattr(input_data, 'shape', None), 'dtype=', input_data.dtype, 'sample=', input_data.flatten()[:10])
            except Exception:
                print('DEBUG_INPUT: could not print sample')
            if not finite_ok:
                # include a small summary in logs for debugging
                logger.error('Input contains non-finite values: %s', input_data)
                raise ValueError('Input contains non-finite values')
            prediction = model.predict(input_data)
            disease_idx = np.argmax(prediction, axis=1)[0]
            disease = le.inverse_transform([disease_idx])[0]
            return Response({'disease': disease})
        except Exception as e:
            logger.exception('Prediction failed during transform/predict: %s', e)
            # Provide full error in DEBUG mode to help debugging; otherwise return generic message
            if getattr(settings, 'DEBUG', False):
                return Response({'error': f'Prediction failed on server: {str(e)}'}, status=500)
            return Response({'error': 'Prediction failed on server.'}, status=500)