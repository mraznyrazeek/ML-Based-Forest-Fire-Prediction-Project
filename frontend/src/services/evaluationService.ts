
export interface HistoricalEvaluationFeatures {
  latitude: number
  longitude: number
  year: number
  month: number
  temperature_c: number
  relative_humidity: number
}

export interface HistoricalEvaluationResult {
  record_id: number
  actual_burned_area_ha: number
  predicted_burned_area_ha: number
  absolute_error_ha: number
  absolute_percentage_error: number | null
  model: string
  dataset: string
  total_test_records: number
  features: HistoricalEvaluationFeatures
}

interface HistoricalEvaluationResponse {
  status: string
  evaluation?: HistoricalEvaluationResult
  message?: string
}

export async function getHistoricalEvaluation(
  recordId: number,
): Promise<HistoricalEvaluationResult> {
  if (
    !Number.isInteger(recordId) ||
    recordId < 0
  ) {
    throw new Error('Please enter a valid historical record ID.')
  }

  const response = await fetch(`/api/evaluation/${recordId}`)

  let data: HistoricalEvaluationResponse

  try {
    data = (await response.json()) as HistoricalEvaluationResponse
  } catch {
    throw new Error('The evaluation server returned an invalid response.')
  }

  if (!response.ok || data.status !== 'success' || !data.evaluation) {
    throw new Error(
      data.message || `Historical evaluation failed (HTTP ${response.status}).`,
    )
  }

  const result = data.evaluation

  if (
    typeof result.actual_burned_area_ha !== 'number' ||
    !Number.isFinite(result.actual_burned_area_ha) ||
    typeof result.predicted_burned_area_ha !== 'number' ||
    !Number.isFinite(result.predicted_burned_area_ha) ||
    typeof result.absolute_error_ha !== 'number' ||
    !Number.isFinite(result.absolute_error_ha) ||
    !Number.isInteger(result.total_test_records)
  ) {
    throw new Error('The evaluation server returned invalid numerical results.')
  }

  return result
}
