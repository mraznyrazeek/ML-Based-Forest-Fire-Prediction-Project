
from functools import lru_cache
from pathlib import Path
import numpy as np
import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[3]
DATASET_PATH = PROJECT_ROOT / "dataset" / "mesogeos_wildfire_dataset.csv"


@lru_cache(maxsize=1)
def load_analytics_dataset():
    """Load and cache the original Mesogeos analytics dataset."""

    if not DATASET_PATH.is_file():
        raise FileNotFoundError(
            f"Wildfire dataset not found: {DATASET_PATH}"
        )

    data = pd.read_csv(DATASET_PATH)

    numeric_columns = [
        "year",
        "month",
        "burned_area_ha",
        "temperature_c",
        "relative_humidity",
        "rainfall_mm",
        "wind_speed",
        "ndvi",
        "soil_moisture",
        "elevation",
    ]

    for column in numeric_columns:
        data[column] = pd.to_numeric(
            data[column],
            errors="coerce",
        )

    valid = (
        data["year"].notna()
        & np.isfinite(data["burned_area_ha"])
        & (data["burned_area_ha"] >= 0)
    )

    return data.loc[valid].copy()


def get_annual_wildfire_trends():
    """Summarize historical observations by year."""

    data = load_analytics_dataset()

    annual = (
        data.groupby("year")
        .agg(
            observation_count=("burned_area_ha", "size"),
            total_burned_area_ha=("burned_area_ha", "sum"),
            mean_burned_area_ha=("burned_area_ha", "mean"),
            median_burned_area_ha=("burned_area_ha", "median"),
            largest_fire_ha=("burned_area_ha", "max"),
        )
        .reset_index()
        .sort_values("year")
    )

    records = []

    for row in annual.itertuples(index=False):
        records.append({
            "year": int(row.year),
            "observation_count": int(row.observation_count),
            "total_burned_area_ha": round(
                float(row.total_burned_area_ha), 2
            ),
            "mean_burned_area_ha": round(
                float(row.mean_burned_area_ha), 2
            ),
            "median_burned_area_ha": round(
                float(row.median_burned_area_ha), 2
            ),
            "largest_fire_ha": round(
                float(row.largest_fire_ha), 2
            ),
        })

    return {
        "dataset": "Mesogeos historical wildfire observations",
        "total_observations": len(data),
        "year_count": len(records),
        "annual_trends": records,
    }


ENVIRONMENTAL_VARIABLES = {
    "temperature_c": "Temperature",
    "relative_humidity": "Relative humidity",
    "rainfall_mm": "Rainfall",
    "wind_speed": "Wind speed",
    "ndvi": "NDVI",
    "soil_moisture": "Soil moisture",
}


def get_environmental_relationships():
    """Compare historical burned area across environmental value groups."""

    data = load_analytics_dataset()
    results = []

    for column, label in ENVIRONMENTAL_VARIABLES.items():
        subset = data[[column, "burned_area_ha"]].copy()

        subset[column] = pd.to_numeric(
            subset[column], errors="coerce"
        )

        valid = (
            np.isfinite(subset[column])
            & np.isfinite(subset["burned_area_ha"])
        )

        subset = subset.loc[valid].copy()

        available_count = len(subset)
        missing_count = len(data) - available_count

        bins = []

        if available_count > 0 and subset[column].nunique() > 1:
            # Quantile bins balance sample sizes where possible.
            # Duplicate boundaries are dropped for repeated values.
            subset["bin"] = pd.qcut(
                subset[column],
                q=6,
                duplicates="drop",
            )

            for interval, group in subset.groupby(
                "bin", observed=True, sort=True
            ):
                if pd.isna(interval):
                    continue

                bins.append({
                    "min_value": round(float(group[column].min()), 4),
                    "max_value": round(float(group[column].max()), 4),
                    "observation_count": int(len(group)),
                    "median_burned_area_ha": round(
                        float(group["burned_area_ha"].median()), 2
                    ),
                    "mean_burned_area_ha": round(
                        float(group["burned_area_ha"].mean()), 2
                    ),
                })

        results.append({
            "variable": column,
            "label": label,
            "available_records": available_count,
            "excluded_records": missing_count,
            "bin_count": len(bins),
            "bins": bins,
        })

    return {
        "dataset": "Mesogeos historical wildfire observations",
        "total_observations": len(data),
        "method": "Quantile-based descriptive grouping",
        "relationships": results,
    }


def get_monthly_wildfire_seasonality():
    """Summarize recorded wildfire observations by calendar month."""

    data = load_analytics_dataset().copy()

    # Keep only valid calendar months.
    data["month"] = pd.to_numeric(data["month"], errors="coerce")

    valid = (
        data["month"].notna()
        & data["month"].between(1, 12)
        & (data["month"] % 1 == 0)
    )

    data = data.loc[valid].copy()
    data["month"] = data["month"].astype(int)

    monthly = (
        data.groupby("month")
        .agg(
            observation_count=("burned_area_ha", "size"),
            total_burned_area_ha=("burned_area_ha", "sum"),
            mean_burned_area_ha=("burned_area_ha", "mean"),
            median_burned_area_ha=("burned_area_ha", "median"),
            largest_fire_ha=("burned_area_ha", "max"),
        )
        .reset_index()
        .sort_values("month")
    )

    month_names = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December",
    ]

    records = []

    for row in monthly.itertuples(index=False):
        records.append({
            "month": int(row.month),
            "month_name": month_names[int(row.month) - 1],
            "observation_count": int(row.observation_count),
            "total_burned_area_ha": round(float(row.total_burned_area_ha), 2),
            "mean_burned_area_ha": round(float(row.mean_burned_area_ha), 2),
            "median_burned_area_ha": round(float(row.median_burned_area_ha), 2),
            "largest_fire_ha": round(float(row.largest_fire_ha), 2),
        })

    return {
        "dataset": "Mesogeos historical wildfire observations",
        "total_observations": int(len(data)),
        "month_count": len(records),
        "monthly_seasonality": records,
    }


LAND_COVER_LABELS = {
    "lc_agriculture": "Agriculture",
    "lc_forest": "Forest",
    "lc_grassland": "Grassland",
    "lc_settlement": "Settlement",
    "lc_shrubland": "Shrubland",
    "lc_sparse_vegetation": "Sparse vegetation",
    "lc_water_bodies": "Water bodies",
    "lc_wetland": "Wetland",
}


def get_land_cover_analytics():
    """Summarize wildfires by their dominant land-cover fraction."""

    data = load_analytics_dataset().copy()
    columns = list(LAND_COVER_LABELS)

    landcover = data[columns].apply(
        pd.to_numeric, errors="coerce"
    )

    # A record must have a valid normalized land-cover composition.
    valid = (
        landcover.notna().all(axis=1)
        & np.isfinite(landcover).all(axis=1)
        & landcover.ge(0).all(axis=1)
        & landcover.le(1).all(axis=1)
        & np.isclose(landcover.sum(axis=1), 1, atol=0.01)
    )

    valid_data = data.loc[valid].copy()
    valid_landcover = landcover.loc[valid]

    maxima = valid_landcover.max(axis=1)

    ties = valid_landcover.eq(maxima, axis=0).sum(axis=1) > 1

    dominant = valid_landcover.idxmax(axis=1)
    dominant.loc[ties] = "tie"

    valid_data["dominant_landcover"] = dominant

    summary = (
        valid_data.groupby("dominant_landcover")
        .agg(
            observation_count=("burned_area_ha", "size"),
            total_burned_area_ha=("burned_area_ha", "sum"),
            mean_burned_area_ha=("burned_area_ha", "mean"),
            median_burned_area_ha=("burned_area_ha", "median"),
            largest_fire_ha=("burned_area_ha", "max"),
        )
        .reset_index()
        .sort_values("observation_count", ascending=False)
    )

    records = []

    for row in summary.itertuples(index=False):
        category = row.dominant_landcover

        records.append({
            "category": category,
            "label": (
                "Tied dominant categories"
                if category == "tie"
                else LAND_COVER_LABELS[category]
            ),
            "observation_count": int(row.observation_count),
            "total_burned_area_ha": round(
                float(row.total_burned_area_ha), 2
            ),
            "mean_burned_area_ha": round(
                float(row.mean_burned_area_ha), 2
            ),
            "median_burned_area_ha": round(
                float(row.median_burned_area_ha), 2
            ),
            "largest_fire_ha": round(
                float(row.largest_fire_ha), 2
            ),
        })

    return {
        "dataset": "Mesogeos historical wildfire observations",
        "total_observations": int(len(data)),
        "classified_observations": int(len(valid_data)),
        "excluded_observations": int((~valid).sum()),
        "tied_observations": int(ties.sum()),
        "classification_method": "Largest land-cover fraction",
        "land_cover_summary": records,
    }

