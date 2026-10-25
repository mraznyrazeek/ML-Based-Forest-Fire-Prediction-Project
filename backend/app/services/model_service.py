
from pathlib import Path
import joblib
import numpy as np
import pandas as pd

# Find the project root from this file's location.
PROJECT_ROOT = Path(__file__).resolve().parents[3]

MODEL_PATH = PROJECT_ROOT / "models" / "xgboost_optimized_final.pkl"
FEATURES_PATH = PROJECT_ROOT / "models" / "xgboost_optimized_features.pkl"


def load_model():
    """Load the saved optimized XGBoost model and its feature list."""

    if not MODEL_PATH.is_file():
        raise FileNotFoundError(f"Model not found: {MODEL_PATH}")

    if not FEATURES_PATH.is_file():
        raise FileNotFoundError(f"Feature list not found: {FEATURES_PATH}")

    model = joblib.load(MODEL_PATH)
    feature_names = joblib.load(FEATURES_PATH)

    if len(feature_names) != 44:
        raise ValueError(
            f"Expected 44 model features, found {len(feature_names)}"
        )

    if list(model.feature_names_in_) != list(feature_names):
        raise ValueError("Model feature names do not match the saved feature list.")

    return model, feature_names


def predict_burned_area(input_data):
    """
    Predict burned area in hectares using 44 preprocessed features.

    input_data must contain the exact features expected by the model.
    """
    model, feature_names = load_model()

    if not isinstance(input_data, dict):
        raise TypeError("Input must be a dictionary of feature values.")

    missing_features = [
        feature for feature in feature_names
        if feature not in input_data
    ]

    extra_features = [
        feature for feature in input_data
        if feature not in feature_names
    ]

    if missing_features or extra_features:
        raise ValueError(
            f"Missing features: {missing_features}; "
            f"Unexpected features: {extra_features}"
        )

    input_frame = pd.DataFrame(
        [[input_data[feature] for feature in feature_names]],
        columns=feature_names
    )

    input_frame = input_frame.apply(pd.to_numeric, errors="raise")

    if not np.isfinite(input_frame.to_numpy(dtype=float)).all():
        raise ValueError("All 44 preprocessed features must be finite.")

    prediction_log = float(model.predict(input_frame)[0])
    prediction_ha = float(np.expm1(prediction_log))

    if not np.isfinite(prediction_ha) or prediction_ha < 0:
        raise ValueError("Model returned an invalid burned-area estimate.")

    return {
        "predicted_burned_area_ha": round(prediction_ha, 2),
        "prediction_log": prediction_log,
        "model": "Optimized XGBoost"
    }
