
import math

import numpy as np
import pandas as pd

from .map_service import load_wildfire_locations

DEFAULT_PAGE_SIZE = 25
MAX_PAGE_SIZE = 100

SORT_COLUMNS = {
    "date": "date",
    "burned_area": "burned_area_ha",
    "temperature": "temperature_c",
    "country": "country",
}


def get_historical_wildfires(
    page=1,
    page_size=DEFAULT_PAGE_SIZE,
    year=None,
    country=None,
    min_area=None,
    sort_by="date",
    sort_order="desc",
):
    """Return filtered, sorted, paginated wildfire observations."""

    page = int(page)
    page_size = int(page_size)

    if page < 1:
        raise ValueError("Page must be at least 1.")

    if page_size < 1 or page_size > MAX_PAGE_SIZE:
        raise ValueError(
            f"Page size must be between 1 and {MAX_PAGE_SIZE}."
        )

    if sort_by not in SORT_COLUMNS:
        raise ValueError("Invalid sorting field.")

    if sort_order not in ("asc", "desc"):
        raise ValueError("Sort order must be asc or desc.")

    # Reuse the validated and cached wildfire dataset.
    data = load_wildfire_locations()

    # Year filtering
    if year is not None:
        year = int(year)
        data = data[data["year"] == year]

    # Country filtering
    if country is not None:
        country = str(country).strip()

        if not country:
            raise ValueError("Country cannot be empty.")

        data = data[
            data["country"].str.casefold() == country.casefold()
        ]

    # Minimum burned-area filtering
    if min_area is not None:
        min_area = float(min_area)

        if not np.isfinite(min_area) or min_area < 0:
            raise ValueError(
                "Minimum burned area must be nonnegative."
            )

        data = data[data["burned_area_ha"] >= min_area]

    total_records = len(data)
    total_pages = math.ceil(total_records / page_size)

    # Stable sorting ensures consistent pagination.
    data = data.sort_values(
        [SORT_COLUMNS[sort_by], "record_id"],
        ascending=[sort_order == "asc", True],
        na_position="last",
        kind="stable",
    )

    start = (page - 1) * page_size
    paginated = data.iloc[start : start + page_size]

    records = []

    for row in paginated.itertuples(index=False):
        records.append(
            {
                "record_id": int(row.record_id),
                "date": row.date,
                "year": int(row.year),
                "country": row.country,
                "latitude": float(row.latitude),
                "longitude": float(row.longitude),
                "burned_area_ha": round(
                    float(row.burned_area_ha), 2
                ),
                "temperature_c": (
                    round(float(row.temperature_c), 2)
                    if pd.notna(row.temperature_c)
                    else None
                ),
                "relative_humidity": (
                    round(float(row.relative_humidity), 2)
                    if pd.notna(row.relative_humidity)
                    else None
                ),
            }
        )

    return {
        "dataset": "Mesogeos historical wildfire observations",
        "total_records": total_records,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,
        "returned_records": len(records),
        "sort_by": sort_by,
        "sort_order": sort_order,
        "records": records,
    }
