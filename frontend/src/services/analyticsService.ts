
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


