import pandas as pd
from pathlib import Path


# ============================================================
# LOAD DATASET
# ============================================================

file_path = Path("dataset/mesogeos_wildfire_dataset.csv")

df = pd.read_csv(file_path)

print("=" * 60)
print("MESOGEOS DATASET VALIDATION")
print("=" * 60)


# ============================================================
# BASIC INFORMATION
# ============================================================

print("\n--- BASIC INFORMATION ---")

print(f"Rows:    {len(df):,}")
print(f"Columns: {len(df.columns):,}")

print("\nData types:")
print(df.dtypes)


# ============================================================
# MISSING VALUES
# ============================================================

print("\n--- MISSING VALUES ---")

missing = df.isnull().sum()

missing = missing[missing > 0]

if len(missing) == 0:
    print("No missing values found.")
else:
    print(missing)


# ============================================================
# DUPLICATES
# ============================================================

print("\n--- DUPLICATES ---")

duplicates = df.duplicated().sum()

print(f"Duplicate rows: {duplicates:,}")


# ============================================================
# TARGET INFORMATION
# ============================================================

print("\n--- BURNED AREA ---")

print(df["burned_area_ha"].describe())


# ============================================================
# TARGET PERCENTILES
# ============================================================

print("\n--- BURNED AREA PERCENTILES ---")

percentiles = df["burned_area_ha"].quantile(
    [0.50, 0.75, 0.90, 0.95, 0.99, 0.995, 1.00]
)

print(percentiles)


# ============================================================
# YEAR DISTRIBUTION
# ============================================================

print("\n--- RECORDS BY YEAR ---")

print(
    df["year"]
    .value_counts()
    .sort_index()
)


# ============================================================
# MONTH DISTRIBUTION
# ============================================================

print("\n--- RECORDS BY MONTH ---")

print(
    df["month"]
    .value_counts()
    .sort_index()
)


# ============================================================
# NUMERICAL SUMMARY
# ============================================================

print("\n--- NUMERICAL SUMMARY ---")

print(
    df.describe()
    .T
    .to_string()
)


# ============================================================
# CHECK INFINITE VALUES
# ============================================================

print("\n--- INFINITE VALUES ---")

numeric_df = df.select_dtypes(include="number")

infinite_values = numeric_df.isin(
    [float("inf"), float("-inf")]
).sum()

infinite_values = infinite_values[
    infinite_values > 0
]

if len(infinite_values) == 0:
    print("No infinite values found.")
else:
    print(infinite_values)


# ============================================================
# CHECK IMPORTANT FEATURE RANGES
# ============================================================

print("\n--- IMPORTANT FEATURE RANGES ---")

features_to_check = [
    "temperature_c",
    "dew_point_c",
    "relative_humidity",
    "wind_speed",
    "rainfall_mm",
    "ndvi",
    "lai",
    "soil_moisture",
    "elevation",
    "slope_degrees",
    "population",
    "roads_distance_km",
    "burned_area_ha",
]

for feature in features_to_check:

    if feature in df.columns:

        print(
            f"{feature:25} "
            f"min={df[feature].min():.4f} "
            f"max={df[feature].max():.4f}"
        )


print("\n" + "=" * 60)
print("VALIDATION COMPLETE")
print("=" * 60)