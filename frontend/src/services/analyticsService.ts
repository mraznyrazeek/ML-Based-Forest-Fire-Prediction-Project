
export interface AnnualWildfireTrend {
  year: number
  observation_count: number
  total_burned_area_ha: number
  mean_burned_area_ha: number
  median_burned_area_ha: number
  largest_fire_ha: number
}

export interface AnnualWildfireTrendsResponse {
  status: 'success'
  dataset: string
  total_observations: number
  year_count: number
  annual_trends: AnnualWildfireTrend[]
}

export async function getAnnualWildfireTrends(): Promise<AnnualWildfireTrendsResponse> {
  let response: Response

  try {
    response = await fetch('/api/analytics/annual-trends')
  } catch {
    throw new Error(
      'Unable to connect to the Environmental Analytics API. Check that Flask is running.',
    )
  }

  let data: Partial<AnnualWildfireTrendsResponse> & {
    message?: string
  }

  try {
    data = (await response.json()) as typeof data
  } catch {
    throw new Error(
      'The Environmental Analytics API returned an invalid JSON response.',
    )
  }

  if (!response.ok || data.status !== 'success') {
    throw new Error(
      data.message ??
        `Unable to load annual wildfire statistics (HTTP ${response.status}).`,
    )
  }

  if (
    !Array.isArray(data.annual_trends) ||
    !Number.isInteger(data.total_observations) ||
    !Number.isInteger(data.year_count)
  ) {
    throw new Error(
      'The Environmental Analytics API response is incomplete.',
    )
  }

  return data as AnnualWildfireTrendsResponse
}


export interface EnvironmentalRelationshipBin {
  min_value: number
  max_value: number
  observation_count: number
  median_burned_area_ha: number
  mean_burned_area_ha: number
}

export type EnvironmentalVariable =
  | 'temperature_c'
  | 'relative_humidity'
  | 'rainfall_mm'
  | 'wind_speed'
  | 'ndvi'
  | 'soil_moisture'

export interface EnvironmentalRelationship {
  variable: EnvironmentalVariable
  label: string
  available_records: number
  excluded_records: number
  bin_count: number
  bins: EnvironmentalRelationshipBin[]
}

export interface EnvironmentalRelationshipsResponse {
  status: 'success'
  dataset: string
  total_observations: number
  method: string
  relationships: EnvironmentalRelationship[]
}

export async function getEnvironmentalRelationships(): Promise<EnvironmentalRelationshipsResponse> {
  let response: Response

  try {
    response = await fetch('/api/analytics/environmental-relationships')
  } catch {
    throw new Error(
      'Unable to connect to the Environmental Relationships API. Check that Flask is running.',
    )
  }

  let data: Partial<EnvironmentalRelationshipsResponse> & {
    message?: string
  }

  try {
    data = (await response.json()) as typeof data
  } catch {
    throw new Error(
      'The Environmental Relationships API returned an invalid JSON response.',
    )
  }

  if (!response.ok || data.status !== 'success') {
    throw new Error(
      data.message ??
        `Unable to load environmental relationships (HTTP ${response.status}).`,
    )
  }

  if (
    !Array.isArray(data.relationships) ||
    !Number.isInteger(data.total_observations) ||
    typeof data.method !== 'string' ||
    !data.relationships.every(
      (item) =>
        Array.isArray(item.bins) &&
        Number.isInteger(item.available_records) &&
        Number.isInteger(item.excluded_records) &&
        Number.isInteger(item.bin_count),
    )
  ) {
    throw new Error(
      'The Environmental Relationships API response is incomplete.',
    )
  }

  return data as EnvironmentalRelationshipsResponse
}


export interface MonthlyWildfireSeasonality {
  month: number
  month_name: string
  observation_count: number
  total_burned_area_ha: number
  mean_burned_area_ha: number
  median_burned_area_ha: number
  largest_fire_ha: number
}

export interface MonthlySeasonalityResponse {
  status: 'success'
  dataset: string
  total_observations: number
  month_count: number
  monthly_seasonality: MonthlyWildfireSeasonality[]
}

export async function getMonthlyWildfireSeasonality(): Promise<MonthlySeasonalityResponse> {
  let response: Response

  try {
    response = await fetch('/api/analytics/monthly-seasonality')
  } catch {
    throw new Error(
      'Unable to connect to the Monthly Seasonality API. Check that Flask is running.',
    )
  }

  let data: Partial<MonthlySeasonalityResponse> & {
    message?: string
  }

  try {
    data = (await response.json()) as typeof data
  } catch {
    throw new Error(
      'The Monthly Seasonality API returned an invalid JSON response.',
    )
  }

  if (!response.ok || data.status !== 'success') {
    throw new Error(
      data.message ??
        `Unable to load monthly seasonality (HTTP ${response.status}).`,
    )
  }

  if (
    !Array.isArray(data.monthly_seasonality) ||
    !Number.isInteger(data.total_observations) ||
    !Number.isInteger(data.month_count) ||
    !data.monthly_seasonality.every(
      (item) =>
        Number.isInteger(item.month) &&
        item.month >= 1 &&
        item.month <= 12 &&
        typeof item.month_name === 'string' &&
        Number.isInteger(item.observation_count) &&
        Number.isFinite(item.total_burned_area_ha) &&
        Number.isFinite(item.median_burned_area_ha),
    )
  ) {
    throw new Error('The Monthly Seasonality API response is incomplete.')
  }

  return data as MonthlySeasonalityResponse
}


export interface LandCoverSummary {
  category: string
  label: string
  observation_count: number
  total_burned_area_ha: number
  mean_burned_area_ha: number
  median_burned_area_ha: number
  largest_fire_ha: number
}

export interface LandCoverAnalyticsResponse {
  status: 'success'
  dataset: string
  total_observations: number
  classified_observations: number
  excluded_observations: number
  tied_observations: number
  classification_method: string
  land_cover_summary: LandCoverSummary[]
}

export async function getLandCoverAnalytics(): Promise<LandCoverAnalyticsResponse> {
  let response: Response

  try {
    response = await fetch('/api/analytics/land-cover')
  } catch {
    throw new Error(
      'Unable to connect to the Land-Cover Analytics API. Check that Flask is running.',
    )
  }

  let data: Partial<LandCoverAnalyticsResponse> & {
    message?: string
  }

  try {
    data = (await response.json()) as typeof data
  } catch {
    throw new Error(
      'The Land-Cover Analytics API returned an invalid JSON response.',
    )
  }

  if (!response.ok || data.status !== 'success') {
    throw new Error(
      data.message ??
        `Unable to load land-cover analytics (HTTP ${response.status}).`,
    )
  }

  if (
    !Array.isArray(data.land_cover_summary) ||
    !Number.isInteger(data.total_observations) ||
    !Number.isInteger(data.classified_observations) ||
    !Number.isInteger(data.excluded_observations) ||
    !Number.isInteger(data.tied_observations) ||
    typeof data.classification_method !== 'string' ||
    !data.land_cover_summary.every(
      (item) =>
        typeof item.category === 'string' &&
        typeof item.label === 'string' &&
        Number.isInteger(item.observation_count) &&
        Number.isFinite(item.total_burned_area_ha) &&
        Number.isFinite(item.mean_burned_area_ha) &&
        Number.isFinite(item.median_burned_area_ha) &&
        Number.isFinite(item.largest_fire_ha),
    )
  ) {
    throw new Error('The Land-Cover Analytics API response is incomplete.')
  }

  return data as LandCoverAnalyticsResponse
}




export interface BurnedAreaDistributionBand {
  label: string
  min_ha: number
  max_ha: number | null
  observation_count: number
  recorded_area_ha: number
  observation_share_percent: number
}

export interface BurnedAreaDistributionResponse {
  status: 'success'
  dataset: string
  total_observations: number
  total_recorded_burned_area_ha: number
  mean_burned_area_ha: number
  max_burned_area_ha: number
  zero_area_observations: number
  percentiles_ha: { p25: number; p50: number; p75: number; p90: number; p95: number; p99: number }
  top_one_percent_count: number
  top_one_percent_area_ha: number
  top_one_percent_area_share_percent: number
  bands: BurnedAreaDistributionBand[]
  methodology: string
}

export async function getBurnedAreaDistribution(): Promise<BurnedAreaDistributionResponse> {
  let response: Response
  try {
    response = await fetch('/api/analytics/burned-area-distribution')
  } catch {
    throw new Error('Unable to connect to the Burned-Area Distribution API. Check Flask on port 5001.')
  }
  if (!response.ok) throw new Error(`Unable to load distribution (HTTP ${response.status}).`)
  let data: BurnedAreaDistributionResponse
  try {
    data = (await response.json()) as BurnedAreaDistributionResponse
  } catch {
    throw new Error('The Burned-Area Distribution API returned invalid JSON.')
  }
  if (
    data.status !== 'success' ||
    !Array.isArray(data.bands) ||
    !Number.isInteger(data.total_observations) ||
    !Number.isFinite(data.total_recorded_burned_area_ha) ||
    !Number.isFinite(data.percentiles_ha?.p99) ||
    !Number.isFinite(data.top_one_percent_area_share_percent)
  ) {
    throw new Error('The Burned-Area Distribution API response is incomplete.')
  }
  return data
}
