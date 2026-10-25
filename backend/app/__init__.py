
from flask import Flask, jsonify, request
from .services.model_service import predict_burned_area
from .preprocessing.feature_processor import preprocess_features


def create_app():
    app = Flask(__name__)

    @app.get("/api/health")
    def health_check():
        return {
            "status": "success",
            "message": "Forest Fire Prediction API is running"
        }

    @app.post("/api/predict")
    def predict():
        data = request.get_json(silent=True)

        if not isinstance(data, dict):
            return jsonify({
                "status": "error",
                "message": "A JSON object containing 44 processed features is required."
            }), 400

        try:
            result = predict_burned_area(data)

            return jsonify({
                "status": "success",
                "prediction": result
            }), 200

        except (ValueError, TypeError) as error:
            return jsonify({
                "status": "error",
                "message": str(error)
            }), 400

    
    @app.post("/api/predict/raw")
    def predict_raw():
        data = request.get_json(silent=True)

        if not isinstance(data, dict):
            return jsonify({
                "status": "error",
                "message": "A JSON object containing raw Mesogeos environmental data is required."
            }), 400

        try:
            # Convert raw environmental values into 44 model features.
            processed = preprocess_features(data)

            # Predict using our existing model service.
            result = predict_burned_area(
                processed.iloc[0].to_dict()
            )

            return jsonify({
                "status": "success",
                "prediction": result
            }), 200

        except (ValueError, TypeError, KeyError) as error:
            return jsonify({
                "status": "error",
                "message": str(error)
            }), 400

    return app
