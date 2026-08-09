import xarray as xr
from pathlib import Path

file_path = Path("dataset/mesogeos_dataset/2006/sample_0.nc")

ds = xr.open_dataset(file_path)

# Get the ignition point
ignition = ds["ignition_points"].isel(time=0)
rows, cols = ((ignition > 0).values).nonzero()

row = rows[0]
col = cols[0]

# Original values
temperature_k = float(ds["t2m"].isel(time=0, y=row, x=col).values)
dew_point_k = float(ds["d2m"].isel(time=0, y=row, x=col).values)
humidity_ratio = float(ds["rh"].isel(time=0, y=row, x=col).values)
rainfall_m = float(ds["tp"].isel(time=0, y=row, x=col).values)
slope_rad = float(ds["slope"].isel(y=row, x=col).values)

# Converted values
temperature_c = temperature_k - 273.15
dew_point_c = dew_point_k - 273.15
humidity_percent = humidity_ratio * 100
rainfall_mm = rainfall_m * 1000
slope_deg = slope_rad * 180 / 3.141592653589793

print("=== UNIT CONVERSIONS ===")

print(f"Temperature:     {temperature_k:.4f} K  -> {temperature_c:.2f} °C")
print(f"Dew point:       {dew_point_k:.4f} K  -> {dew_point_c:.2f} °C")
print(f"Humidity:        {humidity_ratio:.4f}    -> {humidity_percent:.2f} %")
print(f"Rainfall:        {rainfall_m:.6f} m  -> {rainfall_mm:.2f} mm")
print(f"Slope:           {slope_rad:.4f} rad -> {slope_deg:.2f}°")

ds.close()