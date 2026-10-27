from functools import lru_cache
from pathlib import Path

import numpy as np
import pandas as pd

from .country_service import identify_country

PROJECT_ROOT = Path(__file__).resolve().parents[3]
DATASET_PATH = PROJECT_ROOT / "dataset" / "mesogeos_wildfire_dataset.csv"
MAX_RECORDS = 2000


@lru_cache(maxsize=1)
def load_wildfire_locations():
    """Load valid historical observations and cache country assignments."""
    if not DATASET_PATH.is_file():
        raise FileNotFoundError(f"Wildfire dataset not found: {DATASET_PATH}")

    columns = [
        "date", "latitude", "longitude", "burned_area_ha",
        "temperature_c", "relative_humidity",
    ]
    data = pd.read_csv(DATASET_PATH, usecols=columns)
    data["date"] = pd.to_datetime(data["date"], errors="coerce")

    for column in ["latitude", "longitude", "burned_area_ha", "temperature_c", "relative_humidity"]:
        data[column] = pd.to_numeric(data[column], errors="coerce")

    valid = (
        data["date"].notna()
        & data["latitude"].between(-90, 90)
        & data["longitude"].between(-180, 180)
        & np.isfinite(data["burned_area_ha"])
        & (data["burned_area_ha"] >= 0)
    )
    data = data.loc[valid].copy()
    data["record_id"] = data.index.astype(int)
    data["year"] = data["date"].dt.year.astype(int)
    data["date"] = data["date"].dt.strftime("%Y-%m-%d")

    # Expensive point-in-polygon work is done only on first load.
    data["country"] = [
        identify_country(float(lat), float(lon)) or "Unassigned"
        for lat, lon in zip(data["latitude"], data["longitude"])
    ]
    return data


def get_wildfire_locations(year=None, min_area=None, limit=MAX_RECORDS, country=None):
    """Filter full valid dataset, then return its latest matching observations."""
    data = load_wildfire_locations()

    if year is not None:
        year = int(year)
        data = data[data["year"] == year]

    if min_area is not None:
        min_area = float(min_area)
        if not np.isfinite(min_area) or min_area < 0:
            raise ValueError("Minimum burned area must be nonnegative.")
        data = data[data["burned_area_ha"] >= min_area]

    if country is not None:
        country = str(country).strip()
        if not country:
            raise ValueError("Country cannot be empty.")
        data = data[data["country"].str.casefold() == country.casefold()]

    limit = int(limit)
    if limit < 1 or limit > MAX_RECORDS:
        raise ValueError(f"Limit must be between 1 and {MAX_RECORDS}.")

    total_matching = len(data)
    data = data.sort_values(["date", "record_id"], ascending=[False, True]).head(limit)

    records = []
    for row in data.itertuples(index=False):
        records.append({
            "record_id": int(row.record_id),
            "date": row.date,
            "year": int(row.year),
            "country": row.country,
            "latitude": float(row.latitude),
            "longitude": float(row.longitude),
            "burned_area_ha": round(float(row.burned_area_ha), 2),
            "temperature_c": round(float(row.temperature_c), 2) if pd.notna(row.temperature_c) else None,
            "relative_humidity": round(float(row.relative_humidity), 2) if pd.notna(row.relative_humidity) else None,
        })

    return {
        "dataset": "Mesogeos historical wildfire observations",
        "total_matching_records": total_matching,
        "returned_records": len(records),
        "limit": limit,
        "records": records,
    }
