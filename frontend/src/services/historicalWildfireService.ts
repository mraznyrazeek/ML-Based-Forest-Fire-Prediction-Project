
export interface HistoricalWildfireRecord {
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

export type HistoricalWildfireSortField =
  | 'date'
  | 'burned_area'
  | 'temperature'
  | 'country'

export type HistoricalWildfireSortOrder = 'asc' | 'desc'

export interface HistoricalWildfireFilters {
  page?: number
  pageSize?: number
  year?: number
  country?: string
  minArea?: number
  sortBy?: HistoricalWildfireSortField
  sortOrder?: HistoricalWildfireSortOrder
}

export interface HistoricalWildfireResponse {
  status: 'success'
  dataset: string
  total_records: number
  page: number
  page_size: number
  total_pages: number
  returned_records: number
  sort_by: HistoricalWildfireSortField
  sort_order: HistoricalWildfireSortOrder
  records: HistoricalWildfireRecord[]
}

export async function getHistoricalWildfires(
  filters: HistoricalWildfireFilters = {},
): Promise<HistoricalWildfireResponse> {
  const params = new URLSearchParams()

  params.set('page', String(filters.page ?? 1))
  params.set('page_size', String(filters.pageSize ?? 25))
  params.set('sort_by', filters.sortBy ?? 'date')
  params.set('sort_order', filters.sortOrder ?? 'desc')

  if (filters.year !== undefined) {
    params.set('year', String(filters.year))
  }

  if (filters.country) {
    params.set('country', filters.country)
  }

  if (filters.minArea !== undefined) {
    params.set('min_area', String(filters.minArea))
  }

  let response: Response

  try {
    response = await fetch(
      `/api/wildfires/history?${params.toString()}`,
    )
  } catch {
    throw new Error(
      'Unable to reach the historical wildfire API. Check that Flask is running.',
    )
  }

  let data: Partial<HistoricalWildfireResponse> & {
    status?: string
    message?: string
  }

  try {
    data = (await response.json()) as typeof data
  } catch {
    throw new Error(
      'The historical wildfire server returned an invalid response.',
    )
  }

  if (!response.ok || data.status !== 'success') {
    throw new Error(
      data.message ??
        `Unable to load historical wildfire records (HTTP ${response.status}).`,
    )
  }

  if (
    !Array.isArray(data.records) ||
    !Number.isInteger(data.total_records) ||
    !Number.isInteger(data.page) ||
    !Number.isInteger(data.page_size) ||
    !Number.isInteger(data.total_pages) ||
    !Number.isInteger(data.returned_records)
  ) {
    throw new Error(
      'The historical wildfire API response is incomplete.',
    )
  }

  return data as HistoricalWildfireResponse
}


export interface HistoricalWildfireDetails {
  record_id: number
  date: string
  year: number
  country: string
  latitude: number
  longitude: number
  burned_area_ha: number
  dataset: string
  measurements: Record<string, string | number | null>
}

export interface HistoricalWildfireDetailsResponse {
  status: 'success'
  record: HistoricalWildfireDetails
}

export async function getHistoricalWildfireDetails(
  recordId: number,
): Promise<HistoricalWildfireDetails> {
  if (!Number.isInteger(recordId) || recordId < 0) {
    throw new Error('A valid historical wildfire record ID is required.')
  }

  let response: Response

  try {
    response = await fetch(`/api/wildfires/history/${recordId}`)
  } catch {
    throw new Error(
      'Unable to reach the historical wildfire details API. Check that Flask is running.',
    )
  }

  let data: Partial<HistoricalWildfireDetailsResponse> & {
    message?: string
  }

  try {
    data = (await response.json()) as typeof data
  } catch {
    throw new Error(
      'The historical wildfire details API returned an invalid response.',
    )
  }

  if (!response.ok || data.status !== 'success') {
    throw new Error(
      data.message ??
        `Unable to load wildfire details (HTTP ${response.status}).`,
    )
  }

  if (
    !data.record ||
    data.record.record_id !== recordId ||
    typeof data.record.measurements !== 'object' ||
    data.record.measurements === null ||
    Array.isArray(data.record.measurements)
  ) {
    throw new Error('The historical wildfire details response is incomplete.')
  }

  return data.record
}

