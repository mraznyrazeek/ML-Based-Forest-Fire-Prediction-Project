
<script setup lang="ts">
import { reactive } from 'vue'
import InputNumber from 'primevue/inputnumber'

type EnvironmentalKey =
  | 'temperature_c'
  | 'dew_point_c'
  | 'relative_humidity'
  | 'wind_speed'
  | 'wind_direction'
  | 'rainfall_mm'
  | 'surface_pressure'
  | 'solar_radiation'
  | 'ndvi'
  | 'lai'
  | 'soil_moisture'
  | 'population'

type EnvironmentalValues = Record<EnvironmentalKey, number | null>

const values = reactive<EnvironmentalValues>({
  temperature_c: null,
  dew_point_c: null,
  relative_humidity: null,
  wind_speed: null,
  wind_direction: null,
  rainfall_mm: null,
  surface_pressure: null,
  solar_radiation: null,
  ndvi: null,
  lai: null,
  soil_moisture: null,
  population: null,
})

const emit = defineEmits<{
  change: [value: EnvironmentalValues]
}>()

const fields: {
  key: EnvironmentalKey
  label: string
  description: string
  min?: number
  max?: number
}[] = [
  {
    key: 'temperature_c',
    label: 'Temperature (°C)',
    description: 'Air temperature in Celsius.',
  },
  {
    key: 'dew_point_c',
    label: 'Dew Point (°C)',
    description: 'Dew point temperature in Celsius.',
  },
  {
    key: 'relative_humidity',
    label: 'Relative Humidity',
    description: 'Humidity value using the processed dataset convention.',
  },
  {
    key: 'wind_speed',
    label: 'Wind Speed',
    description: 'Wind speed using the original dataset measurement convention.',
  },
  {
    key: 'wind_direction',
    label: 'Wind Direction (°)',
    description: 'Direction in degrees, converted to sine and cosine by Flask.',
    min: 0,
    max: 360,
  },
  {
    key: 'rainfall_mm',
    label: 'Rainfall (mm)',
    description: 'Rainfall measurement in millimetres.',
    min: 0,
  },
  {
    key: 'surface_pressure',
    label: 'Surface Pressure',
    description: 'Surface pressure using the source dataset convention.',
  },
  {
    key: 'solar_radiation',
    label: 'Solar Radiation',
    description: 'Solar radiation using the source dataset convention.',
  },
  {
    key: 'ndvi',
    label: 'NDVI',
    description: 'Normalized Difference Vegetation Index.',
    min: -1,
    max: 1,
  },
  {
    key: 'lai',
    label: 'Leaf Area Index (LAI)',
    description: 'Vegetation leaf area index from the dataset.',
    min: 0,
  },
  {
    key: 'soil_moisture',
    label: 'Soil Moisture',
    description: 'Soil moisture measurement from the research dataset.',
  },
  {
    key: 'population',
    label: 'Population',
    description: 'Population feature from the research dataset.',
    min: 0,
  },
]

function updateValue(key: EnvironmentalKey, value: number | null) {
  values[key] = value
  emit('change', { ...values })
}
</script>

<template>
  <section class="space-y-6">
    <div>
      <h3 class="text-lg font-bold text-[var(--wi-text)]">
        Weather & Environmental Data
      </h3>

      <p class="mt-2 text-sm leading-6 text-[var(--wi-muted)]">
        Enter environmental measurements associated with the existing wildfire.
        Missing values may be imputed by the research preprocessing pipeline,
        but observed measurements are preferred when available.
      </p>
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <div v-for="field in fields" :key="field.key">
        <label
          :for="field.key"
          class="mb-2 block text-sm font-medium text-[var(--wi-text)]"
        >
          {{ field.label }}
        </label>

        <InputNumber
          :inputId="field.key"
          :modelValue="values[field.key]"
          @update:modelValue="updateValue(field.key, $event)"
          :min="field.min"
          :max="field.max"
          :minFractionDigits="0"
          :maxFractionDigits="6"
          :useGrouping="false"
          fluid
        />

        <p class="mt-2 text-xs leading-5 text-[var(--wi-muted)]">
          {{ field.description }}
        </p>
      </div>
    </div>

    <div class="rounded-xl border border-blue-100 bg-blue-50 p-4">
      <p class="text-sm leading-6 text-blue-900">
        <i class="pi pi-info-circle mr-1 text-blue-600" aria-hidden="true"></i>
        Some weather and vegetation measurements may be unavailable for
        historical observations. The backend uses its saved median imputer
        for supported missing fields and preserves missing-value indicators
        where required by the trained model.
      </p>
    </div>
  </section>
</template>
