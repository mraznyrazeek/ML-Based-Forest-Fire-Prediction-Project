
export interface ModelPerformanceMetrics {
  mae_ha: number
  rmse_ha: number
  median_absolute_error_ha: number
  r2: number
  mean_signed_error_ha: number
}

export interface ModelPredictionRange {
  actual_min_ha: number
  actual_max_ha: number
  predicted_min_ha: number
  predicted_max_ha: number
}

export interface PredictionDirection {
  overpredictions: number
  underpredictions: number
  exact_predictions: number
}

export interface ModelErrorGroup {
  size_group: string
  observation_count: number
  median_actual_ha: number
  median_predicted_ha: number
  mean_absolute_error_ha: number
  mean_signed_error_ha: number
}

export interface ModelPerformanceResponse {
  status: 'success'
  model: string
  dataset: string
  test_observations: number
  feature_count: number
  metrics: ModelPerformanceMetrics
  prediction_range: ModelPredictionRange
  prediction_direction: PredictionDirection
  error_by_size: ModelErrorGroup[]
}

export async function getModelPerformance(): Promise<ModelPerformanceResponse> {
  let response: Response

  try {
    response = await fetch('/api/model-insights/performance')
  } catch {
    throw new Error(
      'Unable to connect to the Model Insights API. Check that Flask is running.',
    )
  }

  let data: Partial<ModelPerformanceResponse> & { message?: string }

  try {
    data = (await response.json()) as typeof data
  } catch {
    throw new Error('The Model Insights API returned invalid JSON.')
  }

  if (!response.ok || data.status !== 'success') {
    throw new Error(
      data.message ??
        `Unable to load model performance (HTTP ${response.status}).`,
    )
  }

  if (
    !Number.isInteger(data.test_observations) ||
    !Number.isInteger(data.feature_count) ||
    !data.metrics ||
    !Number.isFinite(data.metrics.mae_ha) ||
    !Number.isFinite(data.metrics.rmse_ha) ||
    !Number.isFinite(data.metrics.median_absolute_error_ha) ||
    !Number.isFinite(data.metrics.r2) ||
    !Number.isFinite(data.metrics.mean_signed_error_ha) ||
    !data.prediction_range ||
    !data.prediction_direction ||
    !Array.isArray(data.error_by_size)
  ) {
    throw new Error('The Model Insights API response is incomplete.')
  }

  return data as ModelPerformanceResponse
}


export interface ModelFeatureImportance {
  feature: string
  importance: number
  importance_percent: number
}

export interface FeatureImportanceResponse {
  status: 'success'
  model: string
  importance_method: string
  feature_count: number
  nonzero_features: number
  zero_importance_features: number
  features: ModelFeatureImportance[]
}

export async function getModelFeatureImportance(): Promise<FeatureImportanceResponse> {
  let response: Response

  try {
    response = await fetch('/api/model-insights/feature-importance')
  } catch {
    throw new Error(
      'Unable to connect to the Feature Importance API. Check that Flask is running.',
    )
  }

  let data: Partial<FeatureImportanceResponse> & { message?: string }

  try {
    data = (await response.json()) as typeof data
  } catch {
    throw new Error('The Feature Importance API returned invalid JSON.')
  }

  if (!response.ok || data.status !== 'success') {
    throw new Error(
      data.message ??
        `Unable to load feature importance (HTTP ${response.status}).`,
    )
  }

  if (
    !Number.isInteger(data.feature_count) ||
    !Number.isInteger(data.nonzero_features) ||
    !Number.isInteger(data.zero_importance_features) ||
    typeof data.importance_method !== 'string' ||
    !Array.isArray(data.features) ||
    !data.features.every(
      (item) =>
        typeof item.feature === 'string' &&
        Number.isFinite(item.importance) &&
        Number.isFinite(item.importance_percent),
    )
  ) {
    throw new Error('The Feature Importance API response is incomplete.')
  }

  return data as FeatureImportanceResponse
}


export interface ModelScatterObservation {
  record_id: number
  actual_ha: number
  predicted_ha: number
}

export interface ModelScatterResponse {
  status: 'success'
  model: string
  dataset: string
  observation_count: number
  observations: ModelScatterObservation[]
}

export async function getModelScatterData(): Promise<ModelScatterResponse> {
  let response: Response

  try {
    response = await fetch('/api/model-insights/scatter')
  } catch {
    throw new Error(
      'Unable to connect to the Scatter API. Check that Flask is running.',
    )
  }

  if (!response.ok) {
    throw new Error(`Scatter API request failed (HTTP ${response.status}).`)
  }

  const data: ModelScatterResponse = await response.json()

  if (
    data.status !== 'success' ||
    !Array.isArray(data.observations) ||
    data.observation_count !== data.observations.length
  ) {
    throw new Error('The Scatter API returned invalid data.')
  }

  return data
}


export interface BaselineModelMetrics {
  mae_ha: number
  rmse_ha: number
  median_absolute_error_ha: number
  r2: number
}

export interface ModelBaselineResponse {
  status: 'success'
  model: string
  baseline: string
  training_observations: number
  test_observations: number
  baseline_prediction_ha: number
  baseline_metrics: BaselineModelMetrics
  xgboost_metrics: BaselineModelMetrics
  mae_improvement_percent: number
}

export async function getModelBaselineComparison(): Promise<ModelBaselineResponse> {
  let response: Response

  try {
    response = await fetch('/api/model-insights/baseline')
  } catch {
    throw new Error(
      'Unable to connect to the Baseline Comparison API. Check that Flask is running.',
    )
  }

  if (!response.ok) {
    throw new Error(
      `Baseline Comparison API failed (HTTP ${response.status}).`,
    )
  }

  const data: ModelBaselineResponse = await response.json()

  if (
    data.status !== 'success' ||
    !Number.isFinite(data.baseline_prediction_ha) ||
    !Number.isInteger(data.training_observations) ||
    !Number.isInteger(data.test_observations) ||
    !Number.isFinite(data.mae_improvement_percent) ||
    !data.baseline_metrics ||
    !data.xgboost_metrics ||
    ![data.baseline_metrics, data.xgboost_metrics].every(
      (metrics) =>
        Number.isFinite(metrics.mae_ha) &&
        Number.isFinite(metrics.rmse_ha) &&
        Number.isFinite(metrics.median_absolute_error_ha) &&
        Number.isFinite(metrics.r2),
    )
  ) {
    throw new Error('The Baseline Comparison API returned invalid data.')
  }

  return data
}

