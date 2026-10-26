
<script setup lang="ts">
import { reactive } from 'vue'
import InputNumber from 'primevue/inputnumber'

type GeographicalValues = {
  date: string
  latitude: number | null
  longitude: number | null
  elevation: number | null
  slope_degrees: number | null
  aspect: number | null
  curvature: number | null
  roads_distance_km: number | null
}

const values = reactive<GeographicalValues>({
  date: '',
  latitude: null,
  longitude: null,
  elevation: null,
  slope_degrees: null,
  aspect: null,
  curvature: null,
  roads_distance_km: null,
})

const emit = defineEmits<{
  change: [value: GeographicalValues]
}>()

function emitChange() {
  emit('change', { ...values })
}

const fields = [
  {
    key: 'latitude',
    label: 'Latitude',
    description: 'Geographical latitude in decimal degrees.',
    min: -90,
    max: 90,
  },
  {
    key: 'longitude',
    label: 'Longitude',
    description: 'Geographical longitude in decimal degrees.',
    min: -180,
    max: 180,
  },
  {
    key: 'elevation',
    label: 'Elevation',
    description: 'Elevation value from the research dataset.',
    min: undefined,
    max: undefined,
  },
  {
    key: 'slope_degrees',
    label: 'Slope',
    description: 'Terrain slope feature from the research dataset.',
    min: undefined,
    max: undefined,
  },
  {
    key: 'aspect',
    label: 'Aspect',
    description: 'Terrain aspect value from the research dataset.',
    min: undefined,
    max: undefined,
  },
  {
    key: 'curvature',
    label: 'Curvature',
    description: 'Terrain curvature feature from the research dataset.',
    min: undefined,
    max: undefined,
  },
  {
    key: 'roads_distance_km',
    label: 'Road Distance (km)',
    description: 'Distance to nearby roads in kilometres.',
    min: 0,
    max: undefined,
  },
] as const

type NumericKey = Exclude<keyof GeographicalValues, 'date'>

function updateNumber(key: NumericKey, value: number | null) {
  values[key] = value
  emitChange()
}
</script>

<template>
  <section class="space-y-6">
    <div>
      <h3 class="text-lg font-bold text-[var(--wi-text)]">
        Observation & Geographical Data
      </h3>

      <p class="mt-2 text-sm leading-6 text-[var(--wi-muted)]">
        Enter the wildfire observation date and geographical measurements.
        These inputs describe an existing wildfire in the research dataset.
      </p>
    </div>

    <!-- Observation date -->
    <div>
      <label
        for="observation-date"
        class="mb-2 block text-sm font-medium text-[var(--wi-text)]"
      >
        Observation Date
      </label>

      <input
        id="observation-date"
        v-model="values.date"
        type="date"
        required
        class="w-full rounded-lg border border-[var(--wi-border)]
               bg-white px-4 py-3 text-sm text-[var(--wi-text)]
               outline-none transition-colors focus:border-teal-500"
        @change="emitChange"
      />

      <p class="mt-2 text-xs text-[var(--wi-muted)]">
        Used to generate the calendar and seasonal features required by XGBoost.
      </p>
    </div>

    <!-- Geographical fields -->
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
          @update:modelValue="updateNumber(field.key, $event)"
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
        Terrain variables must follow the same definitions and preprocessing
        conventions as the original research dataset. Their source units and
        transformations will be verified before final prediction validation.
      </p>
    </div>
  </section>
</template>
