import xarray as xr
from pathlib import Path

file_path = Path("dataset/mesogeos_dataset/2006/sample_0.nc")

ds = xr.open_dataset(file_path)

variables_to_check = [
    "t2m",
    "d2m",
    "rh",
    "wind_speed",
    "wind_direction",
    "tp",
    "sp",
    "ssrd",
    "ndvi",
    "lai",
    "smi",
    "dem",
    "slope",
    "aspect",
    "curvature",
    "roads_distance",
    "population",
    "ignition_points",
    "burned_areas",
]

print("=== MESOGEOS VARIABLE METADATA ===\n")

for variable in variables_to_check:

    da = ds[variable]

    print(f"{variable}")
    print(f"  Units: {da.attrs.get('units', 'Not specified')}")
    print(f"  Long name: {da.attrs.get('long_name', 'Not specified')}")
    print(f"  Description: {da.attrs.get('description', 'Not specified')}")
    print()

ds.close()