<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import {
  getHistoricalEvaluation,
  type HistoricalEvaluationResult,
} from '@/services/evaluationService'

const recordId = ref<number | null>(0)
const evaluation = ref<HistoricalEvaluationResult | null>(null)
const loading = ref(false)
const error = ref('')
const totalRecords = ref(2261)
const barsVisible = ref(false)

let requestVersion = 0

const actualWidth = computed(() => {
  if (!evaluation.value) return 0

  const maximum = Math.max(
    evaluation.value.actual_burned_area_ha,
    evaluation.value.predicted_burned_area_ha,
    1,
  )

  return (evaluation.value.actual_burned_area_ha / maximum) * 100
})

const predictedWidth = computed(() => {
  if (!evaluation.value) return 0

  const maximum = Math.max(
    evaluation.value.actual_burned_area_ha,
    evaluation.value.predicted_burned_area_ha,
    1,
  )

  return (evaluation.value.predicted_burned_area_ha / maximum) * 100
})

function formatArea(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

async function loadRecord() {
  const id = recordId.value
  const version = ++requestVersion

  //evaluation.value = null
  error.value = ''

  if (id === null || !Number.isInteger(id) || id < 0 || id >= totalRecords.value) {
    loading.value = false
    error.value = `Enter a record ID between 0 and ${totalRecords.value - 1}.`
    return
  }

  loading.value = true

  try {
    const result = await getHistoricalEvaluation(id)

    if (version !== requestVersion) return

    // evaluation.value = result
    // totalRecords.value = result.total_test_records
    barsVisible.value = false

    evaluation.value = result
    totalRecords.value = result.total_test_records

    await nextTick()

    if (version !== requestVersion) return

    requestAnimationFrame(() => {
      if (version === requestVersion) {
        barsVisible.value = true
      }
    })
  } catch (cause) {
    if (version !== requestVersion) return

    error.value =
      cause instanceof Error ? cause.message : 'Unable to load the historical evaluation.'
  } finally {
    if (version === requestVersion) {
      loading.value = false
    }
  }
}

function changeRecord(nextId: number) {
  recordId.value = nextId
  void loadRecord()
}

onMounted(() => {
  void loadRecord()
})
</script>

<template>
  <section class="space-y-5 text-[var(--wi-text)]">
    <!-- Heading -->
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 class="text-xl font-bold text-[var(--wi-text)]">Historical Wildfire Evaluation</h2>

        <p class="mt-1 text-sm text-[var(--wi-muted)]">
          Compare actual and predicted burned area using held-out Mesogeos records.
        </p>
      </div>

      <span
        class="rounded-full border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-1 text-xs font-semibold text-[var(--wi-orange)]"
      >
        <i class="pi pi-chart-bar mr-1" aria-hidden="true"></i>
        Research Evaluation
      </span>
    </div>

    <!-- Record selection -->
    <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-4">
      <label for="historical-record-id" class="text-sm font-semibold text-[var(--wi-text)]">
        Historical Record ID
      </label>

      <div class="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface)] px-3 py-2 text-sm font-medium text-[var(--wi-text)] transition-colors hover:bg-[var(--wi-surface-alt)] disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="loading || recordId === null || recordId <= 0"
          aria-label="Previous historical record"
          @click="changeRecord((recordId ?? 0) - 1)"
        >
          <i class="pi pi-chevron-left" aria-hidden="true"></i>
        </button>

        <input
          id="historical-record-id"
          v-model.number="recordId"
          type="number"
          min="0"
          :max="totalRecords - 1"
          step="1"
          class="w-28 rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface)] px-3 py-2 text-sm text-[var(--wi-text)] outline-none transition-colors focus:border-[var(--wi-teal)]"
          @change="loadRecord"
        />

        <button
          type="button"
          class="rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface)] px-3 py-2 text-sm font-medium text-[var(--wi-text)] transition-colors hover:bg-[var(--wi-surface-alt)] disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="loading || recordId === null || recordId >= totalRecords - 1"
          aria-label="Next historical record"
          @click="changeRecord((recordId ?? 0) + 1)"
        >
          <i class="pi pi-chevron-right" aria-hidden="true"></i>
        </button>

        <span class="text-xs text-[var(--wi-muted)]">
          IDs 0–{{ totalRecords - 1 }} · {{ totalRecords.toLocaleString() }} test records
        </span>
      </div>
    </div>

    <!-- Loading state -->
    <!-- <div
      v-if="loading"
      class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-5 text-sm text-[var(--wi-blue)]"
      role="status"
    >
      <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>
      Loading historical evaluation...
    </div> -->

    <span
      v-if="loading"
      role="status"
      class="inline-flex items-center gap-2 text-xs font-medium text-[var(--wi-teal)]"
    >
      <i class="pi pi-spin pi-spinner" aria-hidden="true"></i>
      Updating record...
    </span>

    <!-- Error state -->
    <div
      v-if="error"
      class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-4 text-sm text-[var(--wi-orange)]"
      role="alert"
    >
      <i class="pi pi-exclamation-circle mr-2" aria-hidden="true"></i>
      {{ error }}
    </div>

    <template v-if="evaluation">
      <!-- Actual and predicted burned area -->
      <div class="grid gap-4 sm:grid-cols-2">
        <div
          class="relative overflow-hidden rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-5"
        >
          <div class="absolute inset-y-0 left-0 w-1 bg-[var(--wi-orange)]"></div>

          <p class="text-xs font-semibold uppercase tracking-wider text-[var(--wi-orange)]">
            Actual Burned Area
          </p>

          <p class="mt-3 text-3xl font-bold text-[var(--wi-text)]">
            {{ formatArea(evaluation.actual_burned_area_ha) }}
            <span class="text-base font-medium text-[var(--wi-muted)]"> ha </span>
          </p>

          <p class="mt-2 text-xs text-[var(--wi-muted)]">Recorded historical observation</p>
        </div>

        <div
          class="relative overflow-hidden rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-5"
        >
          <div class="absolute inset-y-0 left-0 w-1 bg-[var(--wi-teal)]"></div>

          <p class="text-xs font-semibold uppercase tracking-wider text-[var(--wi-teal)]">
            XGBoost Prediction
          </p>

          <p class="mt-3 text-3xl font-bold text-[var(--wi-text)]">
            {{ formatArea(evaluation.predicted_burned_area_ha) }}
            <span class="text-base font-medium text-[var(--wi-muted)]"> ha </span>
          </p>

          <p class="mt-2 text-xs text-[var(--wi-muted)]">Optimized research model</p>
        </div>
      </div>

      <!-- Scientific comparison bars -->
      <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-5">
        <h3 class="font-bold text-[var(--wi-text)]">Actual vs Predicted</h3>

        <p class="mt-1 text-xs text-[var(--wi-muted)]">
          Relative comparison of burned area in hectares
        </p>

        <div class="mt-5 space-y-4">
          <!-- Actual -->
          <div>
            <div class="mb-2 flex justify-between gap-3 text-xs">
              <span class="font-semibold text-[var(--wi-orange)]"> Actual </span>

              <span class="text-[var(--wi-text)]">
                {{ formatArea(evaluation.actual_burned_area_ha) }} ha
              </span>
            </div>

            <div class="h-3 overflow-hidden rounded-full bg-[var(--wi-surface-alt)]">
              <div
                class="h-full rounded-full bg-[var(--wi-orange)] transition-[width] duration-700 ease-out motion-reduce:transition-none"
                :style="{ width: barsVisible ? `${actualWidth}%` : '0%' }"
              ></div>
            </div>
          </div>

          <!-- Predicted -->
          <div>
            <div class="mb-2 flex justify-between gap-3 text-xs">
              <span class="font-semibold text-[var(--wi-teal)]"> Predicted </span>

              <span class="text-[var(--wi-text)]">
                {{ formatArea(evaluation.predicted_burned_area_ha) }} ha
              </span>
            </div>

            <div class="h-3 overflow-hidden rounded-full bg-[var(--wi-surface-alt)]">
              <div
                class="h-full rounded-full bg-[var(--wi-teal)] transition-[width] duration-900 ease-out motion-reduce:transition-none"
                :style="{ width: barsVisible ? `${predictedWidth}%` : '0%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error metrics -->
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-4">
          <p class="text-xs text-[var(--wi-muted)]">Absolute Error</p>

          <p class="mt-2 text-xl font-bold text-[var(--wi-text)]">
            {{ formatArea(evaluation.absolute_error_ha) }} ha
          </p>
        </div>

        <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-4">
          <p class="text-xs text-[var(--wi-muted)]">Absolute Percentage Error</p>

          <p class="mt-2 text-xl font-bold text-[var(--wi-text)]">
            {{
              evaluation.absolute_percentage_error === null
                ? 'N/A'
                : `${formatArea(evaluation.absolute_percentage_error)}%`
            }}
          </p>
        </div>
      </div>

      <!-- Historical record context -->
      <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-4">
        <div class="flex items-center gap-2">
          <i class="pi pi-info-circle text-[var(--wi-blue)]" aria-hidden="true"></i>

          <h3 class="text-sm font-bold text-[var(--wi-text)]">Historical Record Details</h3>
        </div>

        <div class="mt-3 grid gap-3 text-xs sm:grid-cols-3">
          <div>
            <span class="text-[var(--wi-muted)]"> Location </span>

            <p class="mt-1 font-semibold text-[var(--wi-text)]">
              {{ evaluation.features.latitude.toFixed(4) }},
              {{ evaluation.features.longitude.toFixed(4) }}
            </p>
          </div>

          <div>
            <span class="text-[var(--wi-muted)]"> Observation Period </span>

            <p class="mt-1 font-semibold text-[var(--wi-text)]">
              {{ evaluation.features.year }} /
              {{ evaluation.features.month }}
            </p>
          </div>

          <div>
            <span class="text-[var(--wi-muted)]"> Temperature </span>

            <p class="mt-1 font-semibold text-[var(--wi-text)]">
              {{
                evaluation.features.temperature_c == null
                  ? 'Unavailable'
                  : `${evaluation.features.temperature_c.toFixed(2)} °C`
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Scientific disclaimer -->
      <p class="text-xs leading-5 text-[var(--wi-muted)]">
        Source: {{ evaluation.dataset }}. These are held-out evaluation records, not new wildfire
        forecasts. Performance varies across events, and large wildfires may be substantially
        underestimated.
      </p>
    </template>
  </section>
</template>
