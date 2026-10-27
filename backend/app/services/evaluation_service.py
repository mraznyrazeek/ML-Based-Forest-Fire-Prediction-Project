
from pathlib import Path
from functools import lru_cache

import joblib
import numpy as np
import pandas as pd

from .model_service import load_model

PROJECT_ROOT = Path(__file__).resolve().parents[3]

X_TEST_PATH = PROJECT_ROOT / "dataset/processed/X_test.csv"
Y_TEST_PATH = PROJECT_ROOT / "dataset/processed/y_test.csv"


@lru_cache(maxsize=1)
def load_evaluation_data():
    """Load and validate the held-out test records."""

    if not X_TEST_PATH.is_file():
        raise FileNotFoundError(f"Missing test features: {X_TEST_PATH}")

    if not Y_TEST_PATH.is_file():
        raise FileNotFoundError(f"Missing test targets: {Y_TEST_PATH}")

    X_test = pd.read_csv(X_TEST_PATH)
    y_test = pd.read_csv(Y_TEST_PATH)

    model, feature_names = load_model()

    if list(X_test.columns) != list(feature_names):
        raise ValueError("Test features do not match the saved model schema.")

    if len(X_test) != len(y_test):
        raise ValueError("Test features and targets have different row counts.")

    if "log_burned_area" not in y_test.columns:
        raise ValueError("Missing log_burned_area target column.")

    if not np.isfinite(X_test.to_numpy(dtype=float)).all():
        raise ValueError("Test features contain invalid values.")

    target_log = y_test["log_burned_area"].to_numpy(dtype=float)

    if not np.isfinite(target_log).all():
        raise ValueError("Test targets contain invalid values.")

    actual_ha = np.expm1(target_log)

    if not np.isfinite(actual_ha).all() or np.any(actual_ha < 0):
        raise ValueError("Test targets contain invalid burned areas.")

    return X_test, actual_ha, model


def get_evaluation_record(record_id: int):
    """Evaluate one held-out record using its zero-based row index."""

    X_test, actual_areas, model = load_evaluation_data()

    if isinstance(record_id, bool) or not isinstance(record_id, int):
        raise ValueError("Record ID must be an integer.")

    if record_id < 0 or record_id >= len(X_test):
        raise ValueError(
            f"Record ID must be between 0 and {len(X_test) - 1}."
        )

    record = X_test.iloc[[record_id]]

    prediction_log = float(model.predict(record)[0])
    predicted_ha = float(np.expm1(prediction_log))
    actual_ha = float(actual_areas[record_id])

    if not np.isfinite(predicted_ha) or predicted_ha < 0:
        raise ValueError("Model returned an invalid burned-area estimate.")

    absolute_error = abs(predicted_ha - actual_ha)

    percentage_error = (
        (absolute_error / actual_ha) * 100
        if actual_ha > 0
        else None
    )

    return {
        "record_id": record_id,
        "actual_burned_area_ha": round(actual_ha, 2),
        "predicted_burned_area_ha": round(predicted_ha, 2),
        "absolute_error_ha": round(absolute_error, 2),
        "absolute_percentage_error": (
            round(percentage_error, 2)
            if percentage_error is not None
            else None
        ),
        "model": "Optimized XGBoost",
        "dataset": "Mesogeos held-out test set",
        "total_test_records": len(X_test),
        "features": {
            "latitude": float(record.iloc[0]["latitude"]),
            "longitude": float(record.iloc[0]["longitude"]),
            "year": int(record.iloc[0]["year"]),
            "month": int(record.iloc[0]["month"]),
            "temperature_c": float(record.iloc[0]["temperature_c"]),
            "relative_humidity": float(record.iloc[0]["relative_humidity"]),
        },
    }
