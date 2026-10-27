
import json
import math
from functools import lru_cache
from pathlib import Path

from shapely.geometry import Point, shape
from shapely.prepared import prep

PROJECT_ROOT = Path(__file__).resolve().parents[3]

COUNTRIES_PATH = (
    PROJECT_ROOT
    / "dataset"
    / "geospatial"
    / "countries.geojson"
)


@lru_cache(maxsize=1)
def load_country_boundaries():
    """Load Natural Earth country boundaries once."""

    if not COUNTRIES_PATH.is_file():
        raise FileNotFoundError(
            f"Country boundaries not found: {COUNTRIES_PATH}"
        )

    with COUNTRIES_PATH.open(
        encoding="utf-8"
    ) as file:
        geojson = json.load(file)

    countries = []

    for feature in geojson["features"]:
        properties = feature.get("properties", {})

        name = properties.get("ADMIN")

        geometry_data = feature.get("geometry")

        if not name or not geometry_data:
            continue

        geometry = shape(geometry_data)

        if geometry.is_empty:
            continue

        countries.append({
            "name": str(name),
            "geometry": prep(geometry),
        })

    if not countries:
        raise ValueError("No valid country boundaries were loaded.")

    return countries


@lru_cache(maxsize=20000)
def identify_country(latitude: float, longitude: float):
    """
    Identify the country containing a geographical point.

    GeoJSON coordinates use longitude first, latitude second.
    Returns None when no country polygon contains the point.
    """

    latitude = float(latitude)
    longitude = float(longitude)

    if (
        not math.isfinite(latitude)
        or not math.isfinite(longitude)
        or not -90 <= latitude <= 90
        or not -180 <= longitude <= 180
    ):
        raise ValueError("Invalid geographical coordinates.")

    point = Point(longitude, latitude)

    for country in load_country_boundaries():
        if country["geometry"].covers(point):
            return country["name"]

    return None
