
from flask import Flask, jsonify, request
from .services.model_service import predict_burned_area
from .preprocessing.feature_processor import preprocess_features
from .services.evaluation_service import get_evaluation_record
from .services.map_service import get_wildfire_locations


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

    
    @app.get("/api/evaluation/<int:record_id>")
    def evaluate_historical_record(record_id):
        try:
            result = get_evaluation_record(record_id)

            return jsonify({
                "status": "success",
                "evaluation": result,
            }), 200

        except (ValueError, TypeError) as error:
            return jsonify({
                "status": "error",
                "message": str(error),
            }), 400

    
    @app.get("/api/wildfires/map")
    def wildfire_map():
        try:
            year_value = request.args.get("year")
            country_value = request.args.get("country")
            min_area_value = request.args.get("min_area")
            limit_value = request.args.get("limit", "2000")

            # Reject invalid query parameters before processing.
            year = None
            if year_value is not None:
                year = int(year_value)

                if year < 1900 or year > 2100:
                    raise ValueError("Year must be between 1900 and 2100.")

            min_area = None
            if min_area_value is not None:
                min_area = float(min_area_value)

            limit = int(limit_value)

            result = get_wildfire_locations(
                year=year,
                country=country_value,
                min_area=min_area,
                limit=limit,
            )

            return jsonify({
                "status": "success",
                **result,
            }), 200

        except (ValueError, TypeError) as error:
            return jsonify({
                "status": "error",
                "message": str(error),
            }), 400



    return app
