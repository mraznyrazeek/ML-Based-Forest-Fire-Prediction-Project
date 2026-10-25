
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import json


PROJECT_ROOT = Path(__file__).resolve().parents[3]

IMPUTER_PATH = (
    PROJECT_ROOT / "dataset" / "processed" / "median_imputer.pkl"
)

FEATURES_PATH = (
    PROJECT_ROOT / "dataset" / "processed" / "final_features.json"
)

# Verified values recovered from the original processed training data.
WIND_DIRECTION_SIN_FILL = -0.21390125065974405
WIND_DIRECTION_COS_FILL = 0.35087804871155615

# Exact column order expected by the saved general median imputer.
IMPUTED_COLUMNS = [
    "temperature_c",
    "dew_point_c",
    "relative_humidity",
    "wind_speed",
    "rainfall_mm",
    "surface_pressure",
    "solar_radiation",
    "soil_moisture",
    "lai",
    "ndvi",
    "population",
]

# These indicators must be calculated before missing-value imputation.
MISSING_FLAG_COLUMNS = [
    "temperature_c",
    "dew_point_c",
    "relative_humidity",
    "wind_speed",
    "rainfall_mm",
    "surface_pressure",
    "solar_radiation",
    "soil_moisture",
    "wind_direction",
]

def preprocess_features(raw_data):
    """
    Convert one raw Mesogeos record into the 44 model features.

    Expected input:
        Dictionary containing date and environmental variables.

    Returns:
        DataFrame with one row and the exact 44 model features.
    """

    if not isinstance(raw_data, dict):
        raise TypeError("Input must be a dictionary.")

    # 1. Load the original model feature order.
    with open(FEATURES_PATH, "r", encoding="utf-8") as file:
        feature_names = json.load(file)

    # 2. Create a DataFrame from the raw input.
    df = pd.DataFrame([raw_data.copy()])

    # 3. Generate calendar features from the observation date.
    if "date" not in df.columns:
        raise ValueError("Observation date is required.")

    observation_date = pd.to_datetime(
        df["date"], errors="raise"
    )

    df["year"] = observation_date.dt.year
    df["month"] = observation_date.dt.month
    df["day_of_year"] = observation_date.dt.dayofyear

    df["month_sin"] = np.sin(
        2 * np.pi * df["month"] / 12
    )
    df["month_cos"] = np.cos(
        2 * np.pi * df["month"] / 12
    )

    df["day_of_year_sin"] = np.sin(
        2 * np.pi * df["day_of_year"] / 365
    )
    df["day_of_year_cos"] = np.cos(
        2 * np.pi * df["day_of_year"] / 365
    )

    # 4. Create missing-value indicators BEFORE imputation.
    for column in MISSING_FLAG_COLUMNS:
        if column not in df.columns:
            df[column] = np.nan

        df[f"{column}_missing"] = (
            df[column].isna().astype(int)
        )

    # 5. Restore missing general-imputer columns.
    for column in IMPUTED_COLUMNS:
        if column not in df.columns:
            df[column] = np.nan

    # 6. Apply the previously fitted median imputer.
    imputer = joblib.load(IMPUTER_PATH)

    df[IMPUTED_COLUMNS] = imputer.transform(
        df[IMPUTED_COLUMNS]
    )

    # 7. Convert wind direction into sine/cosine.
    wind_direction = pd.to_numeric(
        df["wind_direction"], errors="raise"
    )

    wind_radians = np.deg2rad(wind_direction)

    df["wind_direction_sin"] = np.sin(wind_radians)
    df["wind_direction_cos"] = np.cos(wind_radians)

    df["wind_direction_sin"] = df[
        "wind_direction_sin"
    ].fillna(WIND_DIRECTION_SIN_FILL)

    df["wind_direction_cos"] = df[
        "wind_direction_cos"
    ].fillna(WIND_DIRECTION_COS_FILL)

    # 8. Validate that every required feature exists.
    missing_features = [
        feature for feature in feature_names
        if feature not in df.columns
    ]

    if missing_features:
        raise ValueError(
            f"Required environmental features are missing: "
            f"{missing_features}"
        )

    # 9. Apply the exact 44-feature ordering.
    processed_df = df[feature_names].copy()

    processed_df = processed_df.apply(
        pd.to_numeric, errors="raise"
    )

    if not np.isfinite(
        processed_df.to_numpy(dtype=float)
    ).all():
        raise ValueError(
            "Processed features contain missing or infinite values."
        )

    return processed_df
