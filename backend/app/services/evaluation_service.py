
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


@lru_cache(maxsize=1)
def get_model_performance_summary():
    """Evaluate the saved XGBoost model on the held-out test set."""

    from sklearn.metrics import (
        mean_absolute_error,
        mean_squared_error,
        median_absolute_error,
        r2_score,
    )

    X_test, actual_ha, model = load_evaluation_data()

    prediction_log = model.predict(X_test)
    predicted_ha = np.expm1(prediction_log)

    if (
        not np.isfinite(predicted_ha).all()
        or np.any(predicted_ha < 0)
    ):
        raise ValueError("Invalid predictions in evaluation results.")

    absolute_errors = np.abs(predicted_ha - actual_ha)
    signed_errors = predicted_ha - actual_ha

    size_edges = [0, 100, 500, 1000, 5000, np.inf]
    size_labels = [
        "0–100 ha",
        "100–500 ha",
        "500–1,000 ha",
        "1,000–5,000 ha",
        "5,000+ ha",
    ]

    evaluation = pd.DataFrame({
        "actual_ha": actual_ha,
        "predicted_ha": predicted_ha,
        "absolute_error_ha": absolute_errors,
        "signed_error_ha": signed_errors,
    })

    evaluation["size_group"] = pd.cut(
        evaluation["actual_ha"],
        bins=size_edges,
        labels=size_labels,
        include_lowest=True,
    )

    grouped = (
        evaluation.groupby(
            "size_group",
            observed=True,
        )
        .agg(
            observation_count=("actual_ha", "size"),
            median_actual_ha=("actual_ha", "median"),
            median_predicted_ha=("predicted_ha", "median"),
            mean_absolute_error_ha=("absolute_error_ha", "mean"),
            mean_signed_error_ha=("signed_error_ha", "mean"),
        )
        .reset_index()
    )

    error_groups = []

    for row in grouped.itertuples(index=False):
        error_groups.append({
            "size_group": str(row.size_group),
            "observation_count": int(row.observation_count),
            "median_actual_ha": round(float(row.median_actual_ha), 2),
            "median_predicted_ha": round(float(row.median_predicted_ha), 2),
            "mean_absolute_error_ha": round(
                float(row.mean_absolute_error_ha), 2
            ),
            "mean_signed_error_ha": round(
                float(row.mean_signed_error_ha), 2
            ),
        })

    return {
        "model": "Optimized XGBoost",
        "dataset": "Mesogeos held-out test set",
        "test_observations": int(len(X_test)),
        "feature_count": int(X_test.shape[1]),
        "metrics": {
            "mae_ha": round(
                float(mean_absolute_error(actual_ha, predicted_ha)), 2
            ),
            "rmse_ha": round(
                float(np.sqrt(mean_squared_error(actual_ha, predicted_ha))), 2
            ),
            "median_absolute_error_ha": round(
                float(median_absolute_error(actual_ha, predicted_ha)), 2
            ),
            "r2": round(float(r2_score(actual_ha, predicted_ha)), 4),
            "mean_signed_error_ha": round(
                float(np.mean(signed_errors)), 2
            ),
        },
        "prediction_range": {
            "actual_min_ha": round(float(actual_ha.min()), 2),
            "actual_max_ha": round(float(actual_ha.max()), 2),
            "predicted_min_ha": round(float(predicted_ha.min()), 2),
            "predicted_max_ha": round(float(predicted_ha.max()), 2),
        },
        "prediction_direction": {
            "overpredictions": int(np.sum(signed_errors > 0)),
            "underpredictions": int(np.sum(signed_errors < 0)),
            "exact_predictions": int(np.sum(signed_errors == 0)),
        },
        "error_by_size": error_groups,
    }


@lru_cache(maxsize=1)
def get_model_feature_importance():
    """Return normalized XGBoost gain importance for all model features."""

    model, feature_names = load_model()

    booster = model.get_booster()

    # Gain measures average improvement from splits using each feature.
    raw_scores = booster.get_score(importance_type="gain")

    scores = np.array(
        [float(raw_scores.get(feature, 0.0)) for feature in feature_names],
        dtype=float,
    )

    if not np.isfinite(scores).all() or np.any(scores < 0):
        raise ValueError("Invalid XGBoost feature importance values.")

    total = float(scores.sum())

    if total <= 0:
        raise ValueError("No positive feature importance values found.")

    normalized = scores / total

    features = [
        {
            "feature": str(feature),
            "importance": round(float(score), 8),
            "importance_percent": round(float(score) * 100, 4),
        }
        for feature, score in zip(feature_names, normalized)
    ]

    features.sort(key=lambda item: item["importance"], reverse=True)

    return {
        "model": "Optimized XGBoost",
        "importance_method": "gain",
        "feature_count": len(features),
        "nonzero_features": int(np.count_nonzero(scores)),
        "zero_importance_features": int(np.sum(scores == 0)),
        "features": features,
    }


@lru_cache(maxsize=1)
def get_model_scatter_data():
    """Return held-out actual and predicted burned areas for visualization."""
    import numpy as np

    X_test, actual_ha, model = load_evaluation_data()
    predicted_ha = np.expm1(model.predict(X_test))

    if len(actual_ha) != len(predicted_ha):
        raise ValueError("Actual and predicted observation counts differ.")

    if not np.all(np.isfinite(actual_ha)):
        raise ValueError("Actual burned areas contain non-finite values.")

    if not np.all(np.isfinite(predicted_ha)):
        raise ValueError("Predicted burned areas contain non-finite values.")

    observations = [
        {
            "record_id": int(index),
            "actual_ha": round(float(actual), 2),
            "predicted_ha": round(float(predicted), 2),
        }
        for index, (actual, predicted) in enumerate(
            zip(actual_ha, predicted_ha)
        )
    ]

    return {
        "model": "Optimized XGBoost",
        "dataset": "Held-out Mesogeos test set",
        "observation_count": len(observations),
        "observations": observations,
    }


@lru_cache(maxsize=1)
def get_model_baseline_comparison():
    """Compare XGBoost with a training-median baseline on held-out data."""
    from sklearn.metrics import (
        mean_absolute_error,
        mean_squared_error,
        median_absolute_error,
        r2_score,
    )

    y_train_path = PROJECT_ROOT / "dataset/processed/y_train.csv"

    if not y_train_path.is_file():
        raise FileNotFoundError(
            f"Missing training targets: {y_train_path}"
        )

    y_train = pd.read_csv(y_train_path)

    if "log_burned_area" not in y_train.columns:
        raise ValueError("Missing log_burned_area in training targets.")

    training_log = y_train["log_burned_area"].to_numpy(dtype=float)

    if len(training_log) == 0 or not np.isfinite(training_log).all():
        raise ValueError("Training targets are empty or contain invalid values.")

    training_actual_ha = np.expm1(training_log)

    if (
        not np.isfinite(training_actual_ha).all()
        or np.any(training_actual_ha < 0)
    ):
        raise ValueError("Invalid training burned-area values.")

    baseline_ha = float(np.median(training_actual_ha))

    X_test, actual_ha, model = load_evaluation_data()

    baseline_predictions = np.full(
        len(actual_ha),
        baseline_ha,
        dtype=float,
    )

    xgboost_predictions = np.expm1(model.predict(X_test))

    if (
        not np.isfinite(xgboost_predictions).all()
        or np.any(xgboost_predictions < 0)
    ):
        raise ValueError("XGBoost returned invalid predictions.")

    def calculate_metrics(predictions):
        return {
            "mae_ha": round(
                float(mean_absolute_error(actual_ha, predictions)), 2
            ),
            "rmse_ha": round(
                float(np.sqrt(mean_squared_error(actual_ha, predictions))), 2
            ),
            "median_absolute_error_ha": round(
                float(median_absolute_error(actual_ha, predictions)), 2
            ),
            "r2": round(
                float(r2_score(actual_ha, predictions)), 4
            ),
        }

    baseline_metrics = calculate_metrics(baseline_predictions)
    xgboost_metrics = calculate_metrics(xgboost_predictions)

    mae_improvement_percent = (
        (
            baseline_metrics["mae_ha"] -
            xgboost_metrics["mae_ha"]
        ) / baseline_metrics["mae_ha"] * 100
        if baseline_metrics["mae_ha"] > 0
        else 0.0
    )

    return {
        "model": "Optimized XGBoost",
        "baseline": "Training median burned area",
        "training_observations": int(len(training_actual_ha)),
        "test_observations": int(len(actual_ha)),
        "baseline_prediction_ha": round(baseline_ha, 2),
        "baseline_metrics": baseline_metrics,
        "xgboost_metrics": xgboost_metrics,
        "mae_improvement_percent": round(
            float(mae_improvement_percent), 2
        ),
    }

