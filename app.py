import pickle
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.wrappers import Request, Response

scaler, model = None, None
model_loaded = False

try:
    with open('model.pkl', 'rb') as f:
        scaler, model = pickle.load(f)
        model_loaded = True
except Exception as e:
    print(f"Model failed to load: {e}")

app = Flask(__name__)
CORS(app, origins=['https://nyenyakin.netlify.app'])

def preprocess_data(data):
    weight = float(data['weight'])
    height = float(data['height'])/100
    bmi = weight/(height**2)

    gender = 1 if data['gender'].lower() == "male" else 0
    marital = 1 if data['maritalStatus'].lower() == "married" else 0
    neck = 1 if data['neckPain'].lower() == "yes" else 0
    head = 1 if data['headache'].lower() == "yes" else 0

    features = [
        data['age'],
        gender,
        data['coffeeIntake'],
        data['teaIntake'],
        data['electronicsUsage'],
        marital,
        neck,
        bmi,
        head
    ]

    return [features]

@app.route('/')
def health_check():
    return jsonify({
        'status': 'running',
        'model_loaded': model_loaded,
        'message': 'PSQI API is running'
    })

@app.route('/api/psqi-test', methods=['POST'])
def predict():
    data = request.json
    input_features = preprocess_data(data)
    input_features = scaler.transform(input_features)
    prediction = model.predict(input_features)[0]
    return jsonify({'prediction': str(prediction)})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
