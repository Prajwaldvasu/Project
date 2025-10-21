import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer, LabelEncoder
from sklearn.metrics import accuracy_score
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import joblib
import os

# Verify file exists
file_path = 'dataset.csv.xlsx'
if not os.path.exists(file_path):
    print(f"Error: File '{file_path}' not found in {os.getcwd()}")
    exit(1)

# Load dataset
try:
    data = pd.read_excel(file_path)
    print("Dataset loaded successfully. Shape:", data.shape)
except Exception as e:
    print(f"Error loading dataset: {e}")
    exit(1)

# Clean symptom columns: Strip spaces
symptom_cols = data.columns[1:]
data[symptom_cols] = data[symptom_cols].apply(lambda x: x.str.strip() if x.dtype == "object" else x)

# Create list of non-null symptoms per row
data['symptoms'] = data[symptom_cols].apply(lambda row: [s for s in row if pd.notnull(s)], axis=1)

# Binarize symptoms (one-hot)
mlb = MultiLabelBinarizer()
X = mlb.fit_transform(data['symptoms'])

# Encode diseases (multi-class)
le = LabelEncoder()
y = le.fit_transform(data['Disease'])

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
input_shape = X.shape[1]
num_classes = len(le.classes_)
model = Sequential([
    Dense(128, activation='relu', input_shape=(input_shape,)),
    Dense(64, activation='relu'),
    Dense(num_classes, activation='softmax')
])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train
model.fit(X_train, y_train, epochs=20, batch_size=32, validation_data=(X_test, y_test))

# Save
# model.save('model.h5')
model.save('model.keras')
joblib.dump(mlb, 'mlb.pkl')
joblib.dump(le, 'le.pkl')

# Test accuracy
predictions = np.argmax(model.predict(X_test), axis=1)
print(f'Test Accuracy: {accuracy_score(y_test, predictions) * 100:.2f}%')