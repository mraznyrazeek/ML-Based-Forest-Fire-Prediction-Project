<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import {
  getModelPerformance,
  getModelFeatureImportance,
  type ModelPerformanceResponse,
  type FeatureImportanceResponse,
} from '@/services/modelInsightsService'
import { useTheme } from '@/composables/useTheme'

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip)

const { theme } = useTheme()
const performance = ref<ModelPerformanceResponse | null>(null)
const loading = ref(true)
const error = ref('')
const featureImportance = ref<FeatureImportanceResponse | null>(null)
const importanceLoading = ref(true)
const importanceError = ref('')
const visibleFeatureCount = ref<10 | 15 | 44>(10)
let mounted = true

const darkMode = computed(() => theme.value === 'dark')
const chartColors = computed(() => ({
  text: darkMode.value ? '#edf4fc' : '#102238',
  muted: darkMode.value ? '#9dafc6' : '#62758d',
  grid: darkMode.value ? 'rgba(157,175,198,.14)' : 'rgba(98,117,141,.14)',
  teal: darkMode.value ? '#2dd4bf' : '#008f87',
  orange: darkMode.value ? '#fb923c' : '#f36b21',
  blue: darkMode.value ? '#60a5fa' : '#328fe8',
}))

function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

const directionTotal = computed(() => {
  const direction = performance.value?.prediction_direction
  return direction
    ? direction.overpredictions + direction.underpredictions + direction.exact_predictions
    : 0
})

const overpredictionPercent = computed(() =>
  directionTotal.value && performance.value
    ? (performance.value.prediction_direction.overpredictions / directionTotal.value) * 100
    : 0,
)
const underpredictionPercent = computed(() =>
  directionTotal.value && performance.value
    ? (performance.value.prediction_direction.underpredictions / directionTotal.value) * 100
    : 0,
)

const sizeLabels = computed(
  () => performance.value?.error_by_size.map((row) => row.size_group) ?? [],
)

const absoluteErrorData = computed<ChartData<'bar'>>(() => ({
  labels: sizeLabels.value,
  datasets: [
    {
      label: 'Mean absolute error (ha)',
      data: performance.value?.error_by_size.map((row) => row.mean_absolute_error_ha) ?? [],
      backgroundColor: chartColors.value.orange,
      borderRadius: 5,
      maxBarThickness: 48,
    },
  ],
}))

const actualPredictedData = computed<ChartData<'bar'>>(() => ({
  labels: sizeLabels.value,
  datasets: [
    {
      label: 'Median actual area (ha)',
      data: performance.value?.error_by_size.map((row) => row.median_actual_ha) ?? [],
      backgroundColor: chartColors.value.teal,
      borderRadius: 5,
      maxBarThickness: 32,
    },
    {
      label: 'Median predicted area (ha)',
      data: performance.value?.error_by_size.map((row) => row.median_predicted_ha) ?? [],
      backgroundColor: chartColors.value.blue,
      borderRadius: 5,
      maxBarThickness: 32,
    },
  ],
}))

const baseChartOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: { color: chartColors.value.text, usePointStyle: true, padding: 14 },
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${formatNumber(context.parsed.y ?? 0)} ha`,
        afterBody: (items) => {
          const index = items[0]?.dataIndex
          const row = index === undefined ? undefined : performance.value?.error_by_size[index]
          return row ? [`Test observations: ${formatNumber(row.observation_count, 0)}`] : []
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: chartColors.value.muted, maxRotation: 25 },
    },
    y: {
      beginAtZero: true,
      grid: { color: chartColors.value.grid },
      ticks: { color: chartColors.value.muted },
    },
  },
}))

// Importance is model-derived normalized gain, not causal or permutation importance.
const displayedFeatures = computed(() =>
  (featureImportance.value?.features ?? []).slice(0, visibleFeatureCount.value),
)

const featureImportanceData = computed<ChartData<'bar'>>(() => ({
  labels: displayedFeatures.value.map((row) => row.feature),
  datasets: [
    {
      label: 'Normalized gain importance (%)',
      data: displayedFeatures.value.map((row) => row.importance_percent),
      backgroundColor: displayedFeatures.value.map((_, index) =>
        index < 3 ? chartColors.value.teal : chartColors.value.blue,
      ),
      borderRadius: 4,
      maxBarThickness: 19,
    },
  ],
}))

const featureImportanceOptions = computed<ChartOptions<'bar'>>(() => ({
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'nearest', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `Normalized gain: ${formatNumber(context.parsed.x ?? 0, 3)}%`,
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: { color: chartColors.value.grid },
      ticks: { color: chartColors.value.muted },
      title: {
        display: true,
        text: 'Normalized gain importance (%)',
        color: chartColors.value.muted,
      },
    },
    y: {
      grid: { display: false },
      ticks: { color: chartColors.value.muted, autoSkip: false, font: { size: 10 } },
    },
  },
}))

async function loadFeatureImportance() {
  importanceLoading.value = true
  importanceError.value = ''
  try {
    const response = await getModelFeatureImportance()
    if (mounted) featureImportance.value = response
  } catch (cause) {
    if (mounted) {
      importanceError.value =
        cause instanceof Error ? cause.message : 'Unable to load feature importance.'
    }
  } finally {
    if (mounted) importanceLoading.value = false
  }
}

function refreshInsights() {
  void loadPerformance()
  void loadFeatureImportance()
}

async function loadPerformance() {
  loading.value = true
  error.value = ''
  try {
    const response = await getModelPerformance()
    if (mounted) performance.value = response
  } catch (cause) {
    if (mounted) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load model performance.'
    }
  } finally {
    if (mounted) loading.value = false
  }
}

onMounted(() => {
  mounted = true
  void loadPerformance()
  void loadFeatureImportance()
})
onUnmounted(() => {
  mounted = false
})
</script>

<template>
  <div class="space-y-4">
    <header class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-5 py-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-teal)]"
          >
            <i class="pi pi-chart-line text-xl" aria-hidden="true"></i>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.17em] text-[var(--wi-teal)]">
              XGBoost · Model Evaluation
            </p>
            <h1 class="text-xl font-extrabold text-[var(--wi-text)]">Model Insights</h1>
            <p class="mt-1 text-xs text-[var(--wi-muted)]">
              Performance on held-out Mesogeos wildfire observations.
            </p>
          </div>
        </div>
        <button
          type="button"
          class="rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-xs font-semibold text-[var(--wi-text)] hover:opacity-80 disabled:opacity-50"
          :disabled="loading || importanceLoading"
          @click="refreshInsights"
        >
          <i
            :class="loading ? 'pi pi-spin pi-spinner' : 'pi pi-refresh'"
            class="mr-1"
            aria-hidden="true"
          ></i>
          Refresh
        </button>
      </div>
    </header>

    <div
      v-if="loading"
      role="status"
      class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4 text-sm text-[var(--wi-muted)]"
    >
      <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>Loading model evaluation...
    </div>
    <div
      v-else-if="error"
      role="alert"
      class="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500"
    >
      {{ error }}
      <button type="button" class="ml-2 underline" @click="loadPerformance">Retry</button>
    </div>

    <template v-else-if="performance">
      <section
        class="grid grid-cols-2 gap-3 lg:grid-cols-4"
        aria-label="Model performance indicators"
      >
        <div
          v-for="card in [
            {
              label: 'Mean Absolute Error',
              value: formatNumber(performance.metrics.mae_ha) + ' ha',
              color: 'var(--wi-teal)',
            },
            {
              label: 'Root Mean Squared Error',
              value: formatNumber(performance.metrics.rmse_ha) + ' ha',
              color: 'var(--wi-orange)',
            },
            {
              label: 'Median Absolute Error',
              value: formatNumber(performance.metrics.median_absolute_error_ha) + ' ha',
              color: 'var(--wi-blue)',
            },
            {
              label: 'R² Score',
              value: formatNumber(performance.metrics.r2, 4),
              color: 'var(--wi-text)',
            },
          ]"
          :key="card.label"
          class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4"
        >
          <p class="text-xs font-semibold text-[var(--wi-muted)]">{{ card.label }}</p>
          <p class="mt-2 text-xl font-extrabold" :style="{ color: card.color }">{{ card.value }}</p>
        </div>
      </section>

      <section class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4">
        <p class="text-sm font-semibold text-[var(--wi-text)]">Evaluation dataset</p>
        <p class="mt-1 text-xs text-[var(--wi-muted)]">
          {{ formatNumber(performance.test_observations, 0) }} held-out observations ·
          {{ performance.feature_count }} model features · Optimized XGBoost
        </p>
        <p class="mt-3 text-xs leading-5 text-[var(--wi-muted)]">
          All error metrics are calculated in hectares. R² is evaluated on the original burned-area
          scale, not the logarithmic training-target scale. The model shows limited explanatory
          performance and should not be treated as operationally validated.
        </p>
      </section>

      <section
        class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4"
        aria-label="Prediction bias"
      >
        <div class="mb-3">
          <p class="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--wi-teal)]">
            Held-out model diagnostics
          </p>
          <h2 class="mt-1 text-sm font-bold text-[var(--wi-text)]">Prediction Direction & Bias</h2>
          <p class="mt-1 text-xs text-[var(--wi-muted)]">
            Signed error = predicted minus actual burned area
          </p>
        </div>
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div class="rounded-xl bg-[var(--wi-surface-alt)] p-3">
            <p class="text-[11px] text-[var(--wi-muted)]">Overpredictions</p>
            <strong class="mt-1 block text-lg text-[var(--wi-blue)]">{{
              formatNumber(performance.prediction_direction.overpredictions, 0)
            }}</strong>
            <p class="text-[11px] text-[var(--wi-muted)]">
              {{ overpredictionPercent.toFixed(1) }}% of test records
            </p>
          </div>
          <div class="rounded-xl bg-[var(--wi-surface-alt)] p-3">
            <p class="text-[11px] text-[var(--wi-muted)]">Underpredictions</p>
            <strong class="mt-1 block text-lg text-[var(--wi-orange)]">{{
              formatNumber(performance.prediction_direction.underpredictions, 0)
            }}</strong>
            <p class="text-[11px] text-[var(--wi-muted)]">
              {{ underpredictionPercent.toFixed(1) }}% of test records
            </p>
          </div>
          <div class="rounded-xl bg-[var(--wi-surface-alt)] p-3">
            <p class="text-[11px] text-[var(--wi-muted)]">Mean signed error</p>
            <strong class="mt-1 block text-lg text-[var(--wi-text)]"
              >{{ formatNumber(performance.metrics.mean_signed_error_ha) }} ha</strong
            >
            <p class="text-[11px] text-[var(--wi-muted)]">Negative indicates net underestimation</p>
          </div>
        </div>
        <div
          class="mt-3 flex h-2 overflow-hidden rounded-full bg-[var(--wi-surface-alt)]"
          role="img"
          :aria-label="`${overpredictionPercent.toFixed(1)}% overpredicted; ${underpredictionPercent.toFixed(1)}% underpredicted`"
        >
          <div
            :style="{ width: `${overpredictionPercent}%`, backgroundColor: 'var(--wi-blue)' }"
          ></div>
          <div
            :style="{ width: `${underpredictionPercent}%`, backgroundColor: 'var(--wi-orange)' }"
          ></div>
        </div>
      </section>

      <section class="grid grid-cols-1 gap-4 xl:grid-cols-2" aria-label="Prediction error charts">
        <article
          class="min-w-0 rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4"
        >
          <h2 class="text-sm font-bold text-[var(--wi-text)]">Mean Absolute Error by Fire Size</h2>
          <p class="mt-1 text-xs text-[var(--wi-muted)]">
            Error in hectares · grouped by actual observed size
          </p>
          <div class="mt-4 h-[300px]">
            <Bar :key="`error-${theme}`" :data="absoluteErrorData" :options="baseChartOptions" />
          </div>
        </article>
        <article
          class="min-w-0 rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4"
        >
          <h2 class="text-sm font-bold text-[var(--wi-text)]">Actual vs Predicted Burned Area</h2>
          <p class="mt-1 text-xs text-[var(--wi-muted)]">
            Median values within each actual-size group · hectares
          </p>
          <div class="mt-4 h-[300px]">
            <Bar
              :key="`comparison-${theme}`"
              :data="actualPredictedData"
              :options="baseChartOptions"
            />
          </div>
        </article>
      </section>

      <section class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4">
        <h2 class="text-sm font-bold text-[var(--wi-text)]">Error Breakdown by Actual Fire Size</h2>
        <div class="mt-3 overflow-x-auto rounded-lg border border-[var(--wi-border)]">
          <table class="w-full min-w-[650px] text-left text-xs">
            <thead class="bg-[var(--wi-surface-alt)] text-[var(--wi-muted)]">
              <tr>
                <th scope="col" class="px-3 py-2">Actual fire size</th>
                <th scope="col" class="px-3 py-2 text-right">Records</th>
                <th scope="col" class="px-3 py-2 text-right">Median actual (ha)</th>
                <th scope="col" class="px-3 py-2 text-right">Median predicted (ha)</th>
                <th scope="col" class="px-3 py-2 text-right">MAE (ha)</th>
                <th scope="col" class="px-3 py-2 text-right">Bias (ha)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--wi-border)] text-[var(--wi-text)]">
              <tr v-for="row in performance.error_by_size" :key="row.size_group">
                <td class="px-3 py-2 font-semibold">{{ row.size_group }}</td>
                <td class="px-3 py-2 text-right">{{ formatNumber(row.observation_count, 0) }}</td>
                <td class="px-3 py-2 text-right">{{ formatNumber(row.median_actual_ha) }}</td>
                <td class="px-3 py-2 text-right">{{ formatNumber(row.median_predicted_ha) }}</td>
                <td class="px-3 py-2 text-right">{{ formatNumber(row.mean_absolute_error_ha) }}</td>
                <td class="px-3 py-2 text-right">{{ formatNumber(row.mean_signed_error_ha) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-3 text-xs leading-5 text-[var(--wi-muted)]">
          Interpretation: The model tends to overestimate many smaller fires while severely
          underestimating some large fires. Error groups are defined by actual observed size, which
          is not known for a new prediction. The actual/predicted chart compares group medians, not
          paired individual observations. This evaluation describes the held-out test set and does
          not establish operational reliability.
        </p>
      </section>

      <!-- Feature importance is sourced from the saved XGBoost booster (gain). -->
      <section
        class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4"
        aria-label="XGBoost feature importance"
      >
        <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--wi-teal)]">
              Model interpretation · gain-based ranking
            </p>
            <h2 class="mt-1 text-sm font-bold text-[var(--wi-text)]">Feature Importance</h2>
            <p class="mt-1 text-xs text-[var(--wi-muted)]">
              Normalized split gain across the trained XGBoost model
            </p>
          </div>
          <div class="w-full sm:w-44">
            <label
              for="feature-count"
              class="mb-1 block text-xs font-semibold text-[var(--wi-muted)]"
            >
              Show features
            </label>
            <select
              id="feature-count"
              v-model.number="visibleFeatureCount"
              :disabled="importanceLoading || !featureImportance"
              class="w-full rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-sm text-[var(--wi-text)] focus:outline-2 focus:outline-offset-1 focus:outline-[var(--wi-teal)]"
            >
              <option :value="10">Top 10</option>
              <option :value="15">Top 15</option>
              <option :value="44">All 44</option>
            </select>
          </div>
        </div>

        <div v-if="importanceLoading" role="status" class="py-6 text-sm text-[var(--wi-muted)]">
          <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>
          Loading model feature importance...
        </div>
        <div
          v-else-if="importanceError"
          role="alert"
          class="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-3 text-sm text-red-500"
        >
          {{ importanceError }}
          <button type="button" class="ml-3 font-semibold underline" @click="loadFeatureImportance">
            Retry
          </button>
        </div>
        <template v-else-if="featureImportance">
          <div class="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div class="rounded-xl bg-[var(--wi-surface-alt)] p-3">
              <p class="text-[11px] text-[var(--wi-muted)]">Total model features</p>
              <strong class="mt-1 block text-lg text-[var(--wi-text)]">
                {{ featureImportance.feature_count }}
              </strong>
            </div>
            <div class="rounded-xl bg-[var(--wi-surface-alt)] p-3">
              <p class="text-[11px] text-[var(--wi-muted)]">Features with nonzero gain</p>
              <strong class="mt-1 block text-lg text-[var(--wi-teal)]">
                {{ featureImportance.nonzero_features }}
              </strong>
            </div>
            <div class="col-span-2 rounded-xl bg-[var(--wi-surface-alt)] p-3 sm:col-span-1">
              <p class="text-[11px] text-[var(--wi-muted)]">Zero-importance features</p>
              <strong class="mt-1 block text-lg text-[var(--wi-orange)]">
                {{ featureImportance.zero_importance_features }}
              </strong>
            </div>
          </div>

          <div
            v-if="displayedFeatures.length"
            :style="{ height: `${Math.max(320, displayedFeatures.length * 30 + 70)}px` }"
          >
            <Bar
              :key="`feature-importance-${theme}-${visibleFeatureCount}`"
              :data="featureImportanceData"
              :options="featureImportanceOptions"
            />
          </div>
          <p v-else class="py-6 text-xs text-[var(--wi-muted)]">
            No feature-importance data available.
          </p>

          <div class="mt-4 overflow-x-auto rounded-lg border border-[var(--wi-border)]">
            <table class="w-full min-w-[450px] text-left text-xs">
              <thead class="bg-[var(--wi-surface-alt)] text-[var(--wi-muted)]">
                <tr>
                  <th scope="col" class="px-3 py-2">Rank</th>
                  <th scope="col" class="px-3 py-2">Model feature</th>
                  <th scope="col" class="px-3 py-2 text-right">Normalized gain (%)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--wi-border)] text-[var(--wi-text)]">
                <tr v-for="(row, index) in displayedFeatures" :key="row.feature">
                  <td class="px-3 py-2 text-[var(--wi-muted)]">{{ index + 1 }}</td>
                  <td class="px-3 py-2 font-semibold">{{ row.feature }}</td>
                  <td class="px-3 py-2 text-right">
                    {{ formatNumber(row.importance_percent, 3) }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-3 text-xs leading-5 text-[var(--wi-muted)]">
            Gain is the average training-objective improvement from tree splits using a feature.
            Values are normalized to sum to approximately 100% across all 44 features, not to 100%
            among only the displayed features. Importance does not indicate direction, causation, or
            independent predictive value; correlated features and missingness indicators can affect
            the ranking. The model's low held-out R² (0.0368) limits conclusions about predictive
            usefulness.
          </p>
        </template>
      </section>
    </template>
  </div>
</template>
