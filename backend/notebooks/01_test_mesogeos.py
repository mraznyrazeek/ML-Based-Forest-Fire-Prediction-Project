import xarray as xr
from pathlib import Path
import numpy as np
import pandas as pd


# --------------------------------------------------
# Open one Mesogeos sample
# --------------------------------------------------

file_path = Path("dataset/mesogeos_dataset/2006/sample_0.nc")

ds = xr.open_dataset(file_path)


# --------------------------------------------------
# Find ignition point
# --------------------------------------------------

ignition = ds["ignition_points"].isel(time=0).values

rows, cols = np.where(
    np.isfinite(ignition) & (ignition > 0)
)

if len(rows) != 1:
    raise ValueError(
        f"Expected exactly 1 ignition point, found {len(rows)}"
    )

row = rows[0]
col = cols[0]


# --------------------------------------------------
# Basic fire information
# --------------------------------------------------

latitude = float(ds.y.values[row])
longitude = float(ds.x.values[col])

burned_area = float(ignition[row, col])

date = pd.Timestamp(ds.time.values[0])


# --------------------------------------------------
# Extract features
# --------------------------------------------------

features = {

    # Fire information
    "date": date,
    "latitude": latitude,
    "longitude": longitude,

    # -----------------------------
    # Meteorological
    # -----------------------------

    "temperature_k": float(
        ds["t2m"].isel(time=0, y=row, x=col).values
    ),

    "dew_point_k": float(
        ds["d2m"].isel(time=0, y=row, x=col).values
    ),

    "relative_humidity": float(
        ds["rh"].isel(time=0, y=row, x=col).values
    ),

    "wind_speed": float(
        ds["wind_speed"].isel(time=0, y=row, x=col).values
    ),

    "wind_direction": float(
        ds["wind_direction"].isel(time=0, y=row, x=col).values
    ),

    "rainfall": float(
        ds["tp"].isel(time=0, y=row, x=col).values
    ),

    "surface_pressure": float(
        ds["sp"].isel(time=0, y=row, x=col).values
    ),

    "solar_radiation": float(
        ds["ssrd"].isel(time=0, y=row, x=col).values
    ),

    # -----------------------------
    # Vegetation
    # -----------------------------

    "ndvi": float(
        ds["ndvi"].isel(time=0, y=row, x=col).values
    ),

    "lai": float(
        ds["lai"].isel(time=0, y=row, x=col).values
    ),

    "soil_moisture": float(
        ds["smi"].isel(time=0, y=row, x=col).values
    ),

    # -----------------------------
    # Terrain
    # -----------------------------

    "elevation": float(
        ds["dem"].isel(y=row, x=col).values
    ),

    "slope": float(
        ds["slope"].isel(y=row, x=col).values
    ),

    "aspect": float(
        ds["aspect"].isel(y=row, x=col).values
    ),

    "curvature": float(
        ds["curvature"].isel(y=row, x=col).values
    ),

    # -----------------------------
    # Human / accessibility
    # -----------------------------

    "roads_distance": float(
        ds["roads_distance"].isel(y=row, x=col).values
    ),

    "population": float(
        ds["population"].isel(y=row, x=col).values
    ),

    # -----------------------------
    # Land cover
    # -----------------------------

    "lc_agriculture": float(
        ds["lc_agriculture"].isel(y=row, x=col).values
    ),

    "lc_forest": float(
        ds["lc_forest"].isel(y=row, x=col).values
    ),

    "lc_grassland": float(
        ds["lc_grassland"].isel(y=row, x=col).values
    ),

    "lc_settlement": float(
        ds["lc_settlement"].isel(y=row, x=col).values
    ),

    "lc_shrubland": float(
        ds["lc_shrubland"].isel(y=row, x=col).values
    ),

    "lc_sparse_vegetation": float(
        ds["lc_sparse_vegetation"].isel(y=row, x=col).values
    ),

    "lc_water_bodies": float(
        ds["lc_water_bodies"].isel(y=row, x=col).values
    ),

    "lc_wetland": float(
        ds["lc_wetland"].isel(y=row, x=col).values
    ),

    # -----------------------------
    # Target
    # -----------------------------

    "burned_area_ha": burned_area
}


# --------------------------------------------------
# Create DataFrame
# --------------------------------------------------

df = pd.DataFrame([features])


# --------------------------------------------------
# Display result
# --------------------------------------------------

print("\n=== TABULAR FIRE RECORD ===\n")

print(df.to_string(index=False))

print("\n=== COLUMNS ===")

for column in df.columns:
    print(column)


# --------------------------------------------------
# Close dataset
# --------------------------------------------------

ds.close()