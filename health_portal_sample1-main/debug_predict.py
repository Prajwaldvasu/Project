import os
import joblib
import tensorflow as tf
import numpy as np
import traceback

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MLB_PATH = os.path.join(BASE_DIR, 'mlb.pkl')
LE_PATH = os.path.join(BASE_DIR, 'le.pkl')
MODEL_PATH = os.path.join(BASE_DIR, 'model.keras')

print('Paths:')
print(' MLB:', MLB_PATH)
print(' LE:', LE_PATH)
print(' Model:', MODEL_PATH)

try:
    mlb = joblib.load(MLB_PATH)
    print('Loaded mlb')
except Exception as e:
    print('Failed to load mlb:', e)
    traceback.print_exc()
    raise

try:
    le = joblib.load(LE_PATH)
    print('Loaded le')
except Exception as e:
    print('Failed to load le:', e)
    traceback.print_exc()
    raise

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print('Loaded model, input_shape=', model.input_shape)
except Exception as e:
    print('Failed to load model:', e)
    traceback.print_exc()
    raise

# Change symptoms here to test different inputs
symptoms = ['chills']
print('Symptoms:', symptoms)

try:
    x = mlb.transform([symptoms])
    if hasattr(x, 'toarray'):
        x = x.toarray()
    x = np.asarray(x, dtype=np.float32)
    x = np.ascontiguousarray(x)
    print('Prepared input shape=', x.shape, 'dtype=', x.dtype, 'contiguous=', x.flags['C_CONTIGUOUS'])
    print('Sample values:', x.flatten()[:40])

    # pad/trim to model input if needed
    inp_shape = model.input_shape
    expected = None
    if isinstance(inp_shape, (list, tuple)) and len(inp_shape) >= 2:
        expected = inp_shape[1]
    if expected is not None:
        n_features = x.shape[1]
        if n_features < expected:
            pad_width = expected - n_features
            x = np.pad(x, ((0,0),(0,pad_width)), mode='constant', constant_values=0)
            print(f'Padded input from {n_features} to {expected}')
        elif n_features > expected:
            x = x[:, :expected]
            print(f'Trimmed input from {n_features} to {expected}')

    print('Final input shape for predict:', x.shape)
    pred = model.predict(x)
    print('Prediction output shape:', pred.shape)
    idx = np.argmax(pred, axis=1)[0]
    print('Predicted index:', idx)
    print('Predicted label:', le.inverse_transform([idx])[0])
except Exception as e:
    print('Error during transform/predict:')
    traceback.print_exc()
    raise
