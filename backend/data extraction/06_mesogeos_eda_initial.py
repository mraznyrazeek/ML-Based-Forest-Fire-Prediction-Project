import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

# Load dataset
file_path = Path("dataset/mesogeos_wildfire_dataset.csv")
df = pd.read_csv(file_path)

# Burned area distribution
plt.figure(figsize=(10, 6))

plt.hist(
    df["burned_area_ha"],
    bins=50
)

plt.xlabel("Burned Area (hectares)")
plt.ylabel("Number of Fires")
plt.title("Distribution of Wildfire Burned Area")

plt.tight_layout()
plt.show()

# Log-transformed burned area
plt.figure(figsize=(10, 6))

plt.hist(
    __import__("numpy").log1p(df["burned_area_ha"]),
    bins=50
)

plt.xlabel("log(1 + Burned Area)")
plt.ylabel("Number of Fires")
plt.title("Log-Transformed Burned Area Distribution")

plt.tight_layout()
plt.show()

# Missing values
missing = df.isnull().sum()

missing = missing[missing > 0].sort_values(
    ascending=False
)

plt.figure(figsize=(10, 6))

plt.bar(
    missing.index,
    missing.values
)

plt.xticks(
    rotation=45,
    ha="right"
)

plt.xlabel("Feature")
plt.ylabel("Missing Values")
plt.title("Missing Values by Feature")

plt.tight_layout()
plt.show()