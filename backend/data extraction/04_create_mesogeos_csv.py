import xarray as xr
from pathlib import Path
import numpy as np
import pandas as pd


DATASET_DIR = Path("dataset/mesogeos_dataset")
OUTPUT_FILE = Path("dataset/mesogeos_wildfire_dataset.csv")

# ============================================================
# EXTRACT ONE FIRE SAMPLE
# ============================================================

def extract_fire_sample(file_path):

    try:
        ds = xr.open_dataset(file_path)

        # Find ignition point
        ignition = ds["ignition_points"].isel(time=0).values

        rows, cols = np.where(
            np.isfinite(ignition) & (ignition > 0)
        )

        # We expect exactly one ignition point
        if len(rows) != 1:
            ds.close()
            return None

        row = rows[0]
        col = cols[0]

        # Basic information
        date = pd.Timestamp(ds.time.values[0])

        latitude = float(ds.y.values[row])
        longitude = float(ds.x.values[col])

        burned_area = float(ignition[row, col])

        # Extract values
        temperature_k = float(
            ds["t2m"].isel(time=0, y=row, x=col).values
        )

        dew_point_k = float(
            ds["d2m"].isel(time=0, y=row, x=col).values
        )

        humidity = float(
            ds["rh"].isel(time=0, y=row, x=col).values
        )

        rainfall_m = float(
            ds["tp"].isel(time=0, y=row, x=col).values
        )

        slope_rad = float(
            ds["slope"].isel(y=row, x=col).values
        )

        # Build record
        record = {

            # Fire information
            "date": date,
            "latitude": latitude,
            "longitude": longitude,

            # Meteorological
            "temperature_c": temperature_k - 273.15,
            "dew_point_c": dew_point_k - 273.15,
            "relative_humidity": humidity * 100,

            "wind_speed": float(
                ds["wind_speed"]
                .isel(time=0, y=row, x=col)
                .values
            ),

            "wind_direction": float(
                ds["wind_direction"]
                .isel(time=0, y=row, x=col)
                .values
            ),

            "rainfall_mm": rainfall_m * 1000,

            "surface_pressure": float(
                ds["sp"]
                .isel(time=0, y=row, x=col)
                .values
            ),

            "solar_radiation": float(
                ds["ssrd"]
                .isel(time=0, y=row, x=col)
                .values
            ),

            # Vegetation
            "ndvi": float(
                ds["ndvi"]
                .isel(time=0, y=row, x=col)
                .values
            ),

            "lai": float(
                ds["lai"]
                .isel(time=0, y=row, x=col)
                .values
            ),

            "soil_moisture": float(
                ds["smi"]
                .isel(time=0, y=row, x=col)
                .values
            ),

            # Terrain
            "elevation": float(
                ds["dem"]
                .isel(y=row, x=col)
                .values
            ),

            "slope_degrees": slope_rad * 180 / np.pi,

            "aspect": float(
                ds["aspect"]
                .isel(y=row, x=col)
                .values
            ),

            "curvature": float(
                ds["curvature"]
                .isel(y=row, x=col)
                .values
            ),

            # Human/environment
            "roads_distance_km": float(
                ds["roads_distance"]
                .isel(y=row, x=col)
                .values
            ),

            "population": float(
                ds["population"]
                .isel(y=row, x=col)
                .values
            ),

            # Land cover
            "lc_agriculture": float(
                ds["lc_agriculture"]
                .isel(y=row, x=col)
                .values
            ),

            "lc_forest": float(
                ds["lc_forest"]
                .isel(y=row, x=col)
                .values
            ),

            "lc_grassland": float(
                ds["lc_grassland"]
                .isel(y=row, x=col)
                .values
            ),

            "lc_settlement": float(
                ds["lc_settlement"]
                .isel(y=row, x=col)
                .values
            ),

            "lc_shrubland": float(
                ds["lc_shrubland"]
                .isel(y=row, x=col)
                .values
            ),

            "lc_sparse_vegetation": float(
                ds["lc_sparse_vegetation"]
                .isel(y=row, x=col)
                .values
            ),

            "lc_water_bodies": float(
                ds["lc_water_bodies"]
                .isel(y=row, x=col)
                .values
            ),

            "lc_wetland": float(
                ds["lc_wetland"]
                .isel(y=row, x=col)
                .values
            ),

            # Target
            "burned_area_ha": burned_area,
        }

        ds.close()

        return record

    except Exception as e:

        print(f"ERROR: {file_path}")
        print(f"       {e}")

        return None

# FIND ALL NETCDF FILES
print("Searching for Mesogeos files...")

files = sorted(DATASET_DIR.rglob("*.nc"))

print(f"Found {len(files):,} NetCDF files.")

# PROCESS FILES
records = []

for i, file_path in enumerate(files, start=1):

    record = extract_fire_sample(file_path)

    if record is not None:
        records.append(record)

    # Progress message every 500 files
    if i % 500 == 0 or i == len(files):

        print(
            f"Processed {i:,}/{len(files):,} files "
            f"| Valid records: {len(records):,}"
        )

# CREATE DATAFRAME
df = pd.DataFrame(records)


# ADD DATE FEATURES
if not df.empty:

    df["year"] = df["date"].dt.year

    df["month"] = df["date"].dt.month

    df["day_of_year"] = df["date"].dt.dayofyear


# SAVE CSV
df.to_csv(
    OUTPUT_FILE,
    index=False
)


# SUMMARY
print("\n========================================")
print("DATASET CREATION COMPLETE")
print("========================================")

print(f"Rows:    {len(df):,}")
print(f"Columns: {len(df.columns):,}")

print(f"\nSaved to:")
print(OUTPUT_FILE)

print("\nFirst 5 records:")
print(df.head())

print("\nBurned area statistics:")
print(df["burned_area_ha"].describe())