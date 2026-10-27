export interface WildfireMapRecord {
  record_id: number
  date: string
  year: number
  country: string
  latitude: number
  longitude: number
  burned_area_ha: number
  temperature_c: number | null
  relative_humidity: number | null
}

export interface WildfireMapResponse {
  status: string
  dataset: string
  total_matching_records: number
  returned_records: number
  limit: number
  records: WildfireMapRecord[]
}

export interface WildfireMapFilters {
  year?: number
  country?: string
  minArea?: number
  limit?: number
}

export async function getWildfireMapRecords(filters: WildfireMapFilters = {}): Promise<WildfireMapResponse> {
  const params = new URLSearchParams()
  if (filters.year !== undefined) params.set('year', String(filters.year))
  if (filters.country) params.set('country', filters.country)
  if (filters.minArea !== undefined) params.set('min_area', String(filters.minArea))
  params.set('limit', String(filters.limit ?? 2000))

  let response: Response
  try {
    response = await fetch(`/api/wildfires/map?${params.toString()}`)
  } catch {
    throw new Error('Unable to reach the wildfire map API. Check that Flask is running.')
  }

  let data: Partial<WildfireMapResponse> & { message?: string }
  try {
    data = (await response.json()) as Partial<WildfireMapResponse> & { message?: string }
  } catch {
    throw new Error('The wildfire map server returned an invalid response.')
  }
  if (!response.ok || data.status !== 'success') {
    throw new Error(data.message ?? `Unable to load wildfire records (HTTP ${response.status}).`)
  }
  if (!Array.isArray(data.records) || !Number.isInteger(data.total_matching_records)
    || !Number.isInteger(data.returned_records)) {
    throw new Error('The wildfire map response is incomplete.')
  }
  return data as WildfireMapResponse
}
