<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { validatePredictionInputs } from '@/utils/predictionValidation'

import GeographicalInputs from '@/components/prediction/GeographicalInputs.vue'
import EnvironmentalInputs from '@/components/prediction/EnvironmentalInputs.vue'
import LandCoverInputs from '@/components/prediction/LandCoverInputs.vue'

type PredictionValue = string | number | null

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

// Receive updates from child components
function updateInputs(values: Record<string, PredictionValue>) {
  Object.assign(predictionInputs, values)
}

// Validation state
const showValidation = ref(false)

// Automatically recalculate validation when inputs change
const validation = computed(() => validatePredictionInputs(predictionInputs))

// Check the complete prediction record
function checkPredictionInputs() {
  showValidation.value = true
}
</script>

<template>
  <div class="space-y-8">
    <!-- Prediction page header -->
    <header
      class="relative overflow-hidden rounded-3xl border border-[var(--wi-border)] bg-white p-7 shadow-sm sm:p-9"
    >
      <!-- Scientific theme decoration -->
      <div
        class="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-teal-100/50 blur-3xl"
      ></div>

      <div
        class="pointer-events-none absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-orange-100/50 blur-3xl"
      ></div>

      <div class="relative">
        <div class="mb-4 flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-[var(--wi-teal)]"></span>

          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[var(--wi-orange)]">
            Machine Learning Research
          </p>
        </div>

        <h1 class="text-3xl font-extrabold tracking-tight text-[var(--wi-text)] sm:text-4xl">
          Burned Area
          <span class="text-[var(--wi-orange)]"> Prediction </span>
        </h1>

        <p class="mt-4 max-w-3xl text-sm leading-7 text-[var(--wi-muted)] sm:text-base">
          Estimate the eventual burned area of an existing wildfire using the optimized XGBoost
          research model and validated environmental and geographical inputs.
        </p>

        <!-- Model information badges -->
        <div class="mt-5 flex flex-wrap gap-2">
          <span
            class="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700"
          >
            <i class="pi pi-chart-line mr-1" aria-hidden="true"></i>
            XGBoost Regression
          </span>

          <span
            class="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
          >
            <i class="pi pi-database mr-1" aria-hidden="true"></i>
            Mesogeos Research Data
          </span>

          <span
            class="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
          >
            <i class="pi pi-info-circle mr-1" aria-hidden="true"></i>
            Experimental Research
          </span>
        </div>
      </div>
    </header>

    <!-- Prediction interface -->
    <section class="grid items-start gap-6 lg:grid-cols-3">
      <!-- Main input panel -->
      <div
        class="rounded-2xl border border-[var(--wi-border)] bg-white p-6 shadow-sm sm:p-7 lg:col-span-2"
      >
        <!-- Input panel heading -->
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700"
          >
            <i class="pi pi-sliders-h text-lg" aria-hidden="true"></i>
          </div>

          <div>
            <h2 class="text-xl font-bold text-[var(--wi-text)]">Wildfire Input Parameters</h2>

            <p class="mt-1 text-sm text-[var(--wi-muted)]">
              Environmental, geographical and land-cover inputs
            </p>
          </div>
        </div>

        <!-- Information banner -->
        <div class="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <i class="pi pi-info-circle mt-0.5 text-blue-600" aria-hidden="true"></i>

          <p class="text-sm leading-6 text-blue-900">
            This form follows the Mesogeos research feature schema. Enter the observation date,
            geographical measurements, available environmental data and land-cover proportions. The
            backend will generate the engineered features required by the trained XGBoost model.
          </p>
        </div>

        <!-- Observation and geographical inputs -->
        <div class="mt-8 border-t border-[var(--wi-border)] pt-8">
          <GeographicalInputs @change="updateInputs" />
        </div>

        <!-- Weather and environmental inputs -->
        <div class="mt-8 border-t border-[var(--wi-border)] pt-8">
          <EnvironmentalInputs @change="updateInputs" />
        </div>

        <!-- Land-cover inputs -->
        <div class="mt-8 border-t border-[var(--wi-border)] pt-8">
          <LandCoverInputs @change="updateInputs" />
        </div>

        <!-- Prediction input validation -->
        <div class="mt-8 border-t border-[var(--wi-border)] pt-8">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 class="text-lg font-bold text-[var(--wi-text)]">Input Validation</h3>

              <p class="mt-1 text-sm text-[var(--wi-muted)]">
                Check the wildfire observation data before prediction.
              </p>
            </div>

            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--wi-teal)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              @click="checkPredictionInputs"
            >
              <i class="pi pi-check-circle" aria-hidden="true"></i>

              Validate Prediction Inputs
            </button>
          </div>

          <!-- Validation result -->
          <div
            v-if="showValidation"
            class="mt-5 rounded-xl border p-5"
            :class="
              validation.valid ? 'border-teal-200 bg-teal-50' : 'border-orange-200 bg-orange-50'
            "
            role="status"
          >
            <div class="flex items-start gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                :class="
                  validation.valid ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'
                "
              >
                <i
                  :class="validation.valid ? 'pi pi-check-circle' : 'pi pi-exclamation-circle'"
                  aria-hidden="true"
                ></i>
              </div>

              <div class="min-w-0 flex-1">
                <h3
                  class="font-semibold"
                  :class="validation.valid ? 'text-teal-900' : 'text-orange-950'"
                >
                  {{ validation.valid ? 'Input Validation Passed' : 'Input Validation Failed' }}
                </h3>

                <p v-if="validation.valid" class="mt-2 text-sm leading-6 text-teal-800">
                  All required fields and land-cover proportions passed the current structural
                  validation checks. Backend integration is still pending.
                </p>

                <div v-else class="mt-3">
                  <p class="mb-3 text-sm text-orange-900">
                    Please review the following input requirements:
                  </p>

                  <ul class="list-disc space-y-1 pl-5 text-sm leading-6 text-orange-900">
                    <li v-for="error in validation.errors" :key="error">
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right sidebar -->
      <aside class="space-y-5">
        <!-- Prediction output panel -->
        <div
          class="rounded-2xl border border-blue-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-sm"
        >
          <div
            class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
          >
            <i class="pi pi-chart-bar text-xl" aria-hidden="true"></i>
          </div>

          <h2 class="text-lg font-bold text-[var(--wi-text)]">Prediction Output</h2>

          <p class="mt-3 text-sm leading-6 text-[var(--wi-muted)]">
            Once the complete input form is connected to the Flask prediction API, the estimated
            burned area will appear here in hectares.
          </p>

          <!-- Prediction result placeholder -->
          <div class="mt-5 rounded-xl border border-blue-100 bg-white p-5">
            <p class="text-xs font-medium text-[var(--wi-muted)]">Estimated Burned Area</p>

            <p class="mt-2 text-2xl font-bold text-[var(--wi-text)]">Not calculated</p>

            <p class="mt-2 text-xs text-[var(--wi-muted)]">Awaiting validated wildfire inputs</p>
          </div>

          <!-- Integration status -->
          <div class="mt-4 flex items-center gap-2 text-xs font-medium text-blue-700">
            <i class="pi pi-info-circle" aria-hidden="true"></i>

            <span> Frontend prediction integration pending </span>
          </div>
        </div>

        <!-- Research limitation -->
        <div
          class="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-5 shadow-sm"
        >
          <div class="flex items-start gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700"
            >
              <i class="pi pi-exclamation-triangle" aria-hidden="true"></i>
            </div>

            <div>
              <h3 class="font-semibold text-orange-950">Research Limitation</h3>

              <p class="mt-2 text-sm leading-6 text-orange-900">
                This system estimates the eventual burned area of an existing wildfire. It does not
                predict wildfire ignition, location or occurrence.
              </p>

              <p class="mt-3 text-sm leading-6 text-orange-900">
                Model estimates are experimental and should not be used for operational emergency or
                fire-management decisions.
              </p>
            </div>
          </div>
        </div>

        <!-- Model information -->
        <div class="rounded-2xl border border-[var(--wi-border)] bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700"
            >
              <i class="pi pi-sitemap" aria-hidden="true"></i>
            </div>

            <div>
              <h3 class="font-semibold text-[var(--wi-text)]">Prediction Pipeline</h3>

              <p class="mt-1 text-xs text-[var(--wi-muted)]">Research model architecture</p>
            </div>
          </div>

          <div class="mt-5 space-y-3 text-sm text-[var(--wi-muted)]">
            <div class="flex items-center gap-3">
              <i class="pi pi-file-edit text-teal-600" aria-hidden="true"></i>
              <span>Raw wildfire observations</span>
            </div>

            <div class="flex items-center gap-3">
              <i class="pi pi-cog text-blue-600" aria-hidden="true"></i>
              <span>Feature preprocessing</span>
            </div>

            <div class="flex items-center gap-3">
              <i class="pi pi-chart-line text-orange-600" aria-hidden="true"></i>
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
