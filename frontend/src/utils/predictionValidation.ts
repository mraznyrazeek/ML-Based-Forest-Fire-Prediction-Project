
export type PredictionValue = string | number | null

export type PredictionInputs = Record<string, PredictionValue>

export type ValidationResult = {
  valid: boolean
  errors: string[]
}

const requiredNumericFields = [
  'latitude',
  'longitude',
  'elevation',
  'slope_degrees',
  'aspect',
  'curvature',
  'roads_distance_km',
] as const

const optionalNumericFields = [
  'temperature_c',
  'dew_point_c',
  'relative_humidity',
  'wind_speed',
  'wind_direction',
  'rainfall_mm',
  'surface_pressure',
  'solar_radiation',
  'ndvi',
  'lai',
  'soil_moisture',
  'population',
] as const

const landCoverFields = [
  'lc_agriculture',
  'lc_forest',
  'lc_grassland',
  'lc_settlement',
  'lc_shrubland',
  'lc_sparse_vegetation',
  'lc_water_bodies',
  'lc_wetland',
] as const

function isValidDate(value: unknown): boolean {
  if (typeof value !== 'string') return false

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return false

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])

  if (year < 1 || year > 9999) return false

  const date = new Date(0)
  date.setUTCFullYear(year, month - 1, day)
  date.setUTCHours(0, 0, 0, 0)

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

function isFiniteNumber(value: PredictionValue | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function validatePredictionInputs(
  inputs: PredictionInputs,
): ValidationResult {
  const errors: string[] = []

  // Validate observation date
  if (!isValidDate(inputs.date)) {
    errors.push('A valid observation date is required (YYYY-MM-DD).')
  }

  // Required geographical fields
  for (const field of requiredNumericFields) {
    if (!isFiniteNumber(inputs[field])) {
      errors.push(`${field} must contain a valid number.`)
    }
  }

  // Coordinate limits
  const latitude = inputs.latitude
  const longitude = inputs.longitude

  if (isFiniteNumber(latitude) && (latitude < -90 || latitude > 90)) {
    errors.push('Latitude must be between -90 and 90.')
  }

  if (isFiniteNumber(longitude) && (longitude < -180 || longitude > 180)) {
    errors.push('Longitude must be between -180 and 180.')
  }

  // Nonnegative road distance
  const roadDistance = inputs.roads_distance_km

  if (isFiniteNumber(roadDistance) && roadDistance < 0) {
    errors.push('Road distance cannot be negative.')
  }

  // Optional measurements must be finite when provided
  for (const field of optionalNumericFields) {
    const value = inputs[field]

    if (value !== null && !isFiniteNumber(value)) {
      errors.push(`${field} must be a valid number or left blank.`)
    }
  }

  // Checks for known input ranges
  const windDirection = inputs.wind_direction
  const rainfall = inputs.rainfall_mm
  const ndvi = inputs.ndvi
  const lai = inputs.lai
  const population = inputs.population

  if (
    isFiniteNumber(windDirection) &&
    (windDirection < 0 || windDirection > 360)
  ) {
    errors.push('Wind direction must be between 0 and 360 degrees.')
  }

  if (isFiniteNumber(rainfall) && rainfall < 0) {
    errors.push('Rainfall cannot be negative.')
  }

  if (isFiniteNumber(ndvi) && (ndvi < -1 || ndvi > 1)) {
    errors.push('NDVI must be between -1 and 1.')
  }

  if (isFiniteNumber(lai) && lai < 0) {
    errors.push('Leaf Area Index cannot be negative.')
  }

  if (isFiniteNumber(population) && population < 0) {
    errors.push('Population cannot be negative.')
  }

  // Validate land-cover proportions
  let landCoverTotal = 0
  let landCoverValid = true

  for (const field of landCoverFields) {
    const value = inputs[field]

    if (!isFiniteNumber(value) || value < 0 || value > 1) {
      errors.push(`${field} must be a proportion between 0 and 1.`)
      landCoverValid = false
    } else {
      landCoverTotal += value
    }
  }

  if (landCoverValid && Math.abs(landCoverTotal - 1) > 0.001) {
    errors.push('Land-cover proportions must total 100%.')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
