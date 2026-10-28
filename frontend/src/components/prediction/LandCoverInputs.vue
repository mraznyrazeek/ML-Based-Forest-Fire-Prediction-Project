<script setup lang="ts">
import { computed, reactive } from 'vue'
import InputNumber from 'primevue/inputnumber'
import ProgressBar from 'primevue/progressbar'

const categories = [
  { key: 'lc_agriculture', label: 'Agriculture' },
  { key: 'lc_forest', label: 'Forest' },
  { key: 'lc_grassland', label: 'Grassland' },
  { key: 'lc_settlement', label: 'Settlement' },
  { key: 'lc_shrubland', label: 'Shrubland' },
  { key: 'lc_sparse_vegetation', label: 'Sparse Vegetation' },
  { key: 'lc_water_bodies', label: 'Water Bodies' },
  { key: 'lc_wetland', label: 'Wetland' },
] as const

type LandCoverKey = (typeof categories)[number]['key']
type LandCoverValues = Record<LandCoverKey, number | null>

const values = reactive<LandCoverValues>({
  lc_agriculture: 0,
  lc_forest: 0,
  lc_grassland: 0,
  lc_settlement: 0,
  lc_shrubland: 0,
  lc_sparse_vegetation: 0,
  lc_water_bodies: 0,
  lc_wetland: 0,
})

const emit = defineEmits<{
  change: [value: LandCoverValues, valid: boolean]
}>()

const total = computed(() =>
  categories.reduce((sum, category) => sum + (values[category.key] ?? 0), 0),
)

const allProvided = computed(() => categories.every((category) => values[category.key] !== null))

const inRange = computed(() =>
  categories.every((category) => {
    const value = values[category.key]

    return value !== null && Number.isFinite(value) && value >= 0 && value <= 1
  }),
)

const isValid = computed(
  () => allProvided.value && inRange.value && Math.abs(total.value - 1) <= 0.001,
)

const percentage = computed(() => Math.max(0, Math.min(total.value * 100, 100)))

function updateValue(key: LandCoverKey, value: number | null) {
  values[key] = value

  emit('change', { ...values }, isValid.value)
}
</script>

<template>
  <section class="space-y-6">
    <!-- Heading -->
    <div>
      <h3 class="text-lg font-bold text-[var(--wi-text)]">Land Cover Composition</h3>

      <p class="mt-2 text-sm leading-6 text-[var(--wi-muted)]">
        Enter the proportion of each land-cover category in the wildfire observation area. Values
        must range from 0 to 1, and all eight proportions must sum to 1.
      </p>
    </div>

    <!-- Land cover input fields -->
    <div class="grid gap-5 sm:grid-cols-2">
      <div v-for="category in categories" :key="category.key">
        <label :for="category.key" class="mb-2 block text-sm font-medium text-[var(--wi-text)]">
          {{ category.label }}
        </label>

        <InputNumber
          :inputId="category.key"
          :modelValue="values[category.key]"
          @update:modelValue="updateValue(category.key, $event)"
          :min="0"
          :max="1"
          :minFractionDigits="0"
          :maxFractionDigits="6"
          :useGrouping="false"
          fluid
        />
      </div>
    </div>

    <!-- Theme-aware land cover summary -->
    <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-5">
      <div class="mb-3 flex items-center justify-between gap-3">
        <span class="text-sm font-semibold text-[var(--wi-text)]"> Total Land Cover </span>

        <span
          class="text-lg font-bold"
          :class="isValid ? 'text-[var(--wi-teal)]' : 'text-[var(--wi-orange)]'"
        >
          {{ (total * 100).toFixed(2) }}%
        </span>
      </div>

      <!-- PrimeVue progress indicator -->
      <ProgressBar
        class="wi-landcover-progress"
        :class="isValid ? 'wi-landcover-progress--valid' : 'wi-landcover-progress--invalid'"
        :value="percentage"
        :showValue="false"
      />

      <!-- Validation message -->
      <p
        class="mt-3 flex items-start gap-2 text-sm leading-6"
        :class="isValid ? 'text-[var(--wi-teal)]' : 'text-[var(--wi-orange)]'"
        role="status"
      >
        <i
          :class="isValid ? 'pi pi-check-circle' : 'pi pi-info-circle'"
          class="mt-1 shrink-0"
          aria-hidden="true"
        ></i>

        <span v-if="isValid"> Valid land-cover composition. </span>

        <span v-else> Enter all eight proportions so their total equals 100%. </span>
      </p>
    </div>
  </section>
</template>
