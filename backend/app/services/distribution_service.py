"""Descriptive burned-area distribution over Mesogeos sampled wildfire observations."""
import math
import numpy as np
import pandas as pd
from .analytics_service import load_analytics_dataset

# Fixed, non-overlapping size bands. Each band includes its lower limit and
# excludes its upper limit; the last band has no upper limit.
EDGES = [0, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, np.inf]


def get_burned_area_distribution():
    data = load_analytics_dataset()
    values = pd.to_numeric(data['burned_area_ha'], errors='coerce')
    values = values.loc[np.isfinite(values) & (values >= 0)].astype(float)
    if values.empty:
        raise ValueError('No valid burned-area observations available.')
    n = len(values)
    total = float(values.sum())
    quantiles = {f'p{p}': round(float(np.percentile(values, p)), 2)
                 for p in (25, 50, 75, 90, 95, 99)}

    # Exactly ceil(1% of rows), ranked by burned area, even when values tie.
    top_n = max(1, math.ceil(n * 0.01))
    top_sum = float(values.nlargest(top_n).sum())
    top_share = round(100 * top_sum / total, 2) if total else 0.0

    hist = pd.cut(values, bins=EDGES, right=False, include_lowest=True)
    buckets = []
    for i, interval in enumerate(hist.cat.categories):
        mask = hist == interval
        subset = values.loc[mask]
        lower = EDGES[i]
        upper = EDGES[i+1]
        label = f'{lower:,.0f}–{upper:,.0f}' if np.isfinite(upper) else f'≥{lower:,.0f}'
        buckets.append({
            'label': label,
            'min_ha': float(lower),
            'max_ha': float(upper) if np.isfinite(upper) else None,
            'observation_count': int(mask.sum()),
            'recorded_area_ha': round(float(subset.sum()), 2),
            'observation_share_percent': round(100 * int(mask.sum()) / n, 2),
        })

    return {
        'dataset': 'Mesogeos historical wildfire observations',
        'total_observations': n,
        'total_recorded_burned_area_ha': round(total, 2),
        'mean_burned_area_ha': round(float(values.mean()), 2),
        'max_burned_area_ha': round(float(values.max()), 2),
        'zero_area_observations': int((values == 0).sum()),
        'percentiles_ha': quantiles,
        'top_one_percent_count': top_n,
        'top_one_percent_area_ha': round(top_sum, 2),
        'top_one_percent_area_share_percent': top_share,
        'bands': buckets,
        'methodology': 'Fixed non-overlapping size bands [min, max); final band unbounded; exactly ceil(1% of records) for top-share ranking.',
    }
