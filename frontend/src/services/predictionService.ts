
import type { PredictionInputs } from '@/utils/predictionValidation'

export interface PredictionResult {
  predicted_burned_area_ha: number
  prediction_log: number
  model: string
}

interface PredictionApiResponse {
  status: string
  prediction?: PredictionResult
  message?: string
}

export async function predictBurnedArea(
  inputs: PredictionInputs,
): Promise<PredictionResult> {
  const response = await fetch('/api/predict/raw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  })

  let data: PredictionApiResponse

  try {
    data = (await response.json()) as PredictionApiResponse
  } catch {
    throw new Error('The prediction server returned an invalid response.')
  }

  if (!response.ok || data.status !== 'success') {
    throw new Error(
      data.message || `Prediction failed (HTTP ${response.status}).`,
    )
  }

  if (
    !data.prediction ||
    typeof data.prediction.predicted_burned_area_ha !== 'number' ||
    !Number.isFinite(data.prediction.predicted_burned_area_ha) ||
    data.prediction.predicted_burned_area_ha < 0 ||
    typeof data.prediction.prediction_log !== 'number' ||
    !Number.isFinite(data.prediction.prediction_log) ||
    typeof data.prediction.model !== 'string'
  ) {
    throw new Error('The prediction server returned invalid prediction data.')
  }

  return data.prediction
}
