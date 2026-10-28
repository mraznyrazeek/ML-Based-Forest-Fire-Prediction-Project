<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { predictBurnedArea, type PredictionResult } from '@/services/predictionService'
import { validatePredictionInputs } from '@/utils/predictionValidation'
import HistoricalEvaluation from '@/components/prediction/HistoricalEvaluation.vue'

import GeographicalInputs from '@/components/prediction/GeographicalInputs.vue'
import EnvironmentalInputs from '@/components/prediction/EnvironmentalInputs.vue'
import LandCoverInputs from '@/components/prediction/LandCoverInputs.vue'

type PredictionValue = string | number | null
type PredictionMode = 'manual' | 'historical'
const activeMode = ref<PredictionMode>('manual')

// Shared prediction form state
const predictionInputs = reactive<Record<string, PredictionValue>>({
  // Observation and geographical features
  date: '',
  latitude: null,
  longitude: null,
  elevation: null,
  slope_degrees: null,
  aspect: null,
  curvature: null,
  roads_distance_km: null,

  // Weather, vegetation and population
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

  // Land-cover proportions
  lc_agriculture: 0,
  lc_forest: 0,
  lc_grassland: 0,
  lc_settlement: 0,
  lc_shrubland: 0,
  lc_sparse_vegetation: 0,
  lc_water_bodies: 0,
  lc_wetland: 0,
})

// Prediction state and request sequence guard.
const prediction = ref<PredictionResult | null>(null)
const predictionError = ref('')
const isPredicting = ref(false)
const inputsChangedAfterPrediction = ref(false)
let requestSequence = 0

// Receive updates from child components. Discard outdated results, including
// responses from a request that was in flight when the inputs changed.
function updateInputs(values: Record<string, PredictionValue>) {
  Object.assign(predictionInputs, values)
  requestSequence += 1
  if (prediction.value || isPredicting.value) {
    inputsChangedAfterPrediction.value = true
  }
  prediction.value = null
  predictionError.value = ''
  isPredicting.value = false
}

// Validation state
const showValidation = ref(false)

type InputSection = 'geography' | 'environment' | 'landcover'
const activeSection = ref<InputSection>('geography')
const sections: { id: InputSection; label: string; icon: string }[] = [
  { id: 'geography', label: 'Location', icon: 'pi pi-map-marker' },
  { id: 'environment', label: 'Environment', icon: 'pi pi-cloud' },
  { id: 'landcover', label: 'Land Cover', icon: 'pi pi-chart-pie' },
]
const errorCount = computed(() => validation.value.errors.length)

// Automatically recalculate validation when inputs change
const validation = computed(() => validatePredictionInputs(predictionInputs))

// Check the complete prediction record
function checkPredictionInputs() {
  showValidation.value = true
}

async function submitPrediction() {
  showValidation.value = true
  if (!validation.value.valid || isPredicting.value) return

  const currentRequest = ++requestSequence
  isPredicting.value = true
  predictionError.value = ''
  prediction.value = null
  inputsChangedAfterPrediction.value = false

  try {
    // Snapshot inputs so the payload remains stable during the request.
    const result = await predictBurnedArea({ ...predictionInputs })
    if (currentRequest === requestSequence) prediction.value = result
  } catch (error: unknown) {
    if (currentRequest === requestSequence) {
      predictionError.value =
        error instanceof Error ? error.message : 'Prediction failed. Please try again.'
    }
  } finally {
    if (currentRequest === requestSequence) isPredicting.value = false
  }
}
</script>

<template>
  <div class="space-y-5">
    <!-- Compact research header -->
    <header
      class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-5 py-5 shadow-sm sm:px-7"
    >
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--wi-orange)]">
            Machine Learning Research
          </p>
          <h1 class="mt-1 text-2xl font-extrabold text-[var(--wi-text)] sm:text-3xl">
            Burned Area <span class="text-[var(--wi-orange)]">Prediction</span>
          </h1>
          <p class="mt-1 max-w-3xl text-sm text-[var(--wi-muted)]">
            Estimate eventual burned area of an existing wildfire using the experimental XGBoost
            model.
          </p>
        </div>
        <span
          class="rounded-full border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-1 text-xs font-semibold text-[var(--wi-teal)]"
          >XGBoost · Mesogeos</span
        >
      </div>
    </header>

    <!-- Top-level workflow selection. Keep the manual form mounted with v-show. -->
    <nav
      class="grid grid-cols-2 gap-2 rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-1.5 shadow-sm"
      aria-label="Prediction workflow"
    >
      <button
        id="workflow-tab-manual"
        type="button"
        :aria-pressed="activeMode === 'manual'"
        class="flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition-colors"
        :class="
          activeMode === 'manual'
            ? 'bg-[var(--wi-surface-alt)] text-[var(--wi-teal)] shadow-sm'
            : 'text-[var(--wi-muted)] hover:bg-[var(--wi-surface-alt)]'
        "
        @click="activeMode = 'manual'"
      >
        <i class="pi pi-sliders-h" aria-hidden="true"></i>
        Manual Prediction
      </button>
      <button
        id="workflow-tab-historical"
        type="button"
        :aria-pressed="activeMode === 'historical'"
        class="flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition-colors"
        :class="
          activeMode === 'historical'
            ? 'bg-[var(--wi-surface-alt)] text-[var(--wi-orange)] shadow-sm'
            : 'text-[var(--wi-muted)] hover:bg-[var(--wi-surface-alt)]'
        "
        @click="activeMode = 'historical'"
      >
        <i class="pi pi-chart-bar" aria-hidden="true"></i>
        Historical Evaluation
      </button>
    </nav>

    <!-- Historical evaluation: component requests genuine held-out data from Flask. -->
    <div
      v-if="activeMode === 'historical'"
      class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-5 shadow-sm sm:p-7"
    >
      <HistoricalEvaluation />
    </div>

    <!-- Prediction interface. v-show retains form inputs and prediction on mode switches. -->
    <section v-show="activeMode === 'manual'" class="grid items-start gap-6 lg:grid-cols-3">
      <!-- Main input panel -->
      <div
        class="wi-prediction-form rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-6 shadow-sm sm:p-7 lg:col-span-2"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-lg font-bold text-[var(--wi-text)]">Wildfire Input Parameters</h2>
            <p class="mt-1 text-xs text-[var(--wi-muted)]">
              Three sections · values are retained as you switch
            </p>
          </div>
          <span
            class="rounded-lg px-3 py-1.5 text-xs font-semibold"
            :class="
              validation.valid
                ? 'bg-[var(--wi-surface-alt)] text-[var(--wi-teal)]'
                : 'bg-[var(--wi-surface-alt)] text-[var(--wi-muted)]'
            "
          >
            <i
              :class="validation.valid ? 'pi pi-check-circle' : 'pi pi-info-circle'"
              class="mr-1"
              aria-hidden="true"
            ></i>
            {{ validation.valid ? 'Inputs complete' : `${errorCount} checks remaining` }}
          </span>
        </div>

        <!-- Tab navigation; v-show preserves each child's local form values -->
        <div
          class="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-[var(--wi-surface-alt)] p-1.5"
          role="tablist"
          aria-label="Prediction input sections"
        >
          <button
            v-for="section in sections"
            :key="section.id"
            :id="`prediction-tab-${section.id}`"
            type="button"
            role="tab"
            :aria-selected="activeSection === section.id"
            :aria-controls="`prediction-panel-${section.id}`"
            class="flex min-w-0 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs font-semibold transition-colors sm:text-sm"
            :class="
              activeSection === section.id
                ? 'bg-[var(--wi-surface)] text-[var(--wi-teal)] shadow-sm'
                : 'text-[var(--wi-muted)] hover:bg-[var(--wi-surface)]'
            "
            @click="activeSection = section.id"
          >
            <i :class="section.icon" aria-hidden="true"></i>
            <span>{{ section.label }}</span>
          </button>
        </div>

        <div
          id="prediction-panel-geography"
          v-show="activeSection === 'geography'"
          role="tabpanel"
          aria-labelledby="prediction-tab-geography"
          class="mt-5"
        >
          <GeographicalInputs @change="updateInputs" />
        </div>
        <div
          id="prediction-panel-environment"
          v-show="activeSection === 'environment'"
          role="tabpanel"
          aria-labelledby="prediction-tab-environment"
          class="mt-5"
        >
          <EnvironmentalInputs @change="updateInputs" />
          <p
            class="mt-3 rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-3 text-xs leading-5 text-[var(--wi-muted)]"
          >
            Missing optional measurements are handled by the model's saved preprocessing. A missing
            value is not the same as zero.
          </p>
        </div>
        <div
          id="prediction-panel-landcover"
          v-show="activeSection === 'landcover'"
          role="tabpanel"
          aria-labelledby="prediction-tab-landcover"
          class="mt-5"
        >
          <LandCoverInputs @change="updateInputs" />
        </div>

        <!-- Keep validation/actions visible without a fourth full-size panel -->
        <div
          class="sticky bottom-0 z-10 mt-5 rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)]/95 p-3 shadow-md backdrop-blur-sm sm:p-4"
        >
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="rounded-lg border border-[var(--wi-border)] px-3 py-2.5 text-xs font-semibold text-[var(--wi-teal)] hover:bg-[var(--wi-surface-alt)] sm:text-sm"
              @click="checkPredictionInputs"
            >
              <i class="pi pi-check-circle mr-1" aria-hidden="true"></i> Validate
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--wi-teal)] px-4 py-2.5 text-xs font-semibold text-[#071827] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
              :disabled="!validation.valid || isPredicting"
              @click="submitPrediction"
            >
              <i
                :class="isPredicting ? 'pi pi-spin pi-spinner' : 'pi pi-chart-line'"
                aria-hidden="true"
              ></i>
              {{ isPredicting ? 'Predicting...' : 'Predict Burned Area' }}
            </button>
            <span class="text-xs text-[var(--wi-muted)]">{{
              validation.valid ? 'Ready to predict' : `${errorCount} input checks remaining`
            }}</span>
          </div>

          <div
            v-if="showValidation"
            role="status"
            class="mt-3 rounded-lg px-3 py-2.5 text-xs"
            :class="
              validation.valid
                ? 'bg-[var(--wi-surface-alt)] text-[var(--wi-teal)]'
                : 'bg-[var(--wi-surface-alt)] text-[var(--wi-orange)]'
            "
          >
            <div class="flex items-center gap-2 font-semibold">
              <i
                :class="validation.valid ? 'pi pi-check-circle' : 'pi pi-exclamation-circle'"
                aria-hidden="true"
              ></i>
              {{
                validation.valid
                  ? 'Validation passed — ready for prediction'
                  : `Validation found ${errorCount} issue(s)`
              }}
            </div>
            <details v-if="!validation.valid" class="mt-2" open>
              <summary class="cursor-pointer font-semibold">Show validation requirements</summary>
              <ul class="mt-2 max-h-32 list-disc space-y-1 overflow-y-auto pl-5">
                <li v-for="error in validation.errors" :key="error">{{ error }}</li>
              </ul>
            </details>
          </div>
          <div
            v-if="predictionError"
            role="alert"
            class="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-[var(--wi-text)]"
          >
            {{ predictionError }}
          </div>
        </div>
      </div>

      <!-- Right sidebar -->
      <aside class="space-y-5">
        <!-- Prediction output panel -->
        <div
          class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-6 shadow-sm"
        >
          <div
            class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-blue)]"
          >
            <i class="pi pi-chart-bar text-xl" aria-hidden="true"></i>
          </div>

          <h2 class="text-lg font-bold text-[var(--wi-text)]">Prediction Output</h2>

          <p class="mt-2 text-xs leading-5 text-[var(--wi-muted)]">
            Estimates the eventual burned area of an existing wildfire using the Flask API and
            optimized XGBoost research model.
          </p>

          <div
            class="mt-4 rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-4"
            aria-live="polite"
          >
            <p class="text-xs font-medium text-[var(--wi-muted)]">Estimated Burned Area</p>

            <p v-if="prediction" class="mt-2 text-3xl font-extrabold text-[var(--wi-text)]">
              {{
                prediction.predicted_burned_area_ha.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })
              }}
              <span class="text-base font-semibold text-[var(--wi-muted)]">ha</span>
            </p>
            <p v-else class="mt-2 text-2xl font-bold text-[var(--wi-text)]">
              {{ isPredicting ? 'Calculating...' : 'Not calculated' }}
            </p>

            <p v-if="prediction" class="mt-2 text-xs text-[var(--wi-muted)]">
              {{ prediction.model }} · Experimental estimate
            </p>
            <p v-else class="mt-2 text-xs text-[var(--wi-muted)]">
              {{
                inputsChangedAfterPrediction
                  ? 'Inputs changed; request a new prediction.'
                  : 'Awaiting a prediction request.'
              }}
            </p>
          </div>

          <div class="mt-4 flex items-center gap-2 text-xs font-medium text-[var(--wi-blue)]">
            <i
              :class="prediction ? 'pi pi-check-circle' : 'pi pi-info-circle'"
              aria-hidden="true"
            ></i>
            <span>{{
              prediction
                ? 'Prediction received from Flask API'
                : 'Flask model connected for local development'
            }}</span>
          </div>
        </div>

        <!-- Research limitation -->
        <div
          class="rounded-2xl border border-[var(--wi-border)] border-l-4 border-l-[var(--wi-orange)] bg-[var(--wi-surface)] p-5 shadow-sm"
        >
          <div class="flex items-start gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-orange)]"
            >
              <i class="pi pi-exclamation-triangle" aria-hidden="true"></i>
            </div>

            <div>
              <h3 class="font-semibold text-[var(--wi-text)]">Research Limitation</h3>

              <p class="mt-2 text-sm leading-6 text-[var(--wi-muted)]">
                This system estimates the eventual burned area of an existing wildfire. It does not
                predict wildfire ignition, location or occurrence.
              </p>

              <p class="mt-3 text-sm leading-6 text-[var(--wi-muted)]">
                Model estimates are experimental and should not be used for operational emergency or
                fire-management decisions.
              </p>
            </div>
          </div>
        </div>

        <!-- Model information -->
        <div
          class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-5 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-teal)]"
            >
              <i class="pi pi-sitemap" aria-hidden="true"></i>
            </div>

            <div>
              <h3 class="font-semibold text-[var(--wi-text)]">Prediction Pipeline</h3>

              <p class="mt-1 text-xs text-[var(--wi-muted)]">Research model architecture</p>
            </div>
          </div>

          <div class="mt-3 space-y-2 text-xs text-[var(--wi-muted)]">
            <div class="flex items-center gap-3">
              <i class="pi pi-file-edit text-[var(--wi-teal)]" aria-hidden="true"></i>
              <span>Raw wildfire observations</span>
            </div>

            <div class="flex items-center gap-3">
              <i class="pi pi-cog text-[var(--wi-blue)]" aria-hidden="true"></i>
              <span>Feature preprocessing</span>
            </div>

            <div class="flex items-center gap-3">
              <i class="pi pi-chart-line text-[var(--wi-orange)]" aria-hidden="true"></i>
              <span>XGBoost burned area estimation</span>
            </div>
          </div>
        </div>
      </aside>
    </section>

    <!-- Page footer -->
    <footer class="border-t border-[var(--wi-border)] pt-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-xs text-[var(--wi-muted)]">Wildfire Intelligence — Burned Area Prediction</p>

        <span class="text-xs font-medium text-[var(--wi-teal)]">
          <i class="pi pi-database mr-1" aria-hidden="true"></i>

          Mesogeos Research Dataset
        </span>
      </div>
    </footer>
  </div>
</template>
