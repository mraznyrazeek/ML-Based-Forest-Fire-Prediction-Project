<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ScientificMetricCard from '@/components/dashboard/ScientificMetricCard.vue'
import { getModelPerformance, type ModelPerformanceResponse } from '@/services/modelInsightsService'

const performance = ref<ModelPerformanceResponse | null>(null)
const performanceLoading = ref(true)
const performanceError = ref('')

async function loadOverviewPerformance() {
  performanceLoading.value = true
  performanceError.value = ''

  try {
    performance.value = await getModelPerformance()
  } catch (cause) {
    performanceError.value =
      cause instanceof Error ? cause.message : 'Unable to load model performance.'
  } finally {
    performanceLoading.value = false
  }
}

onMounted(() => {
  void loadOverviewPerformance()
})

// const modelMetrics = [
//   {
//     label: 'R² Score (Log Scale)',
//     value: '0.2475',
//     description: 'Explained variance on the log-transformed test target.',
//     icon: 'pi pi-chart-bar',
//     tone: 'teal' as const,
//   },
//   {
//     label: 'R² Score (Original Scale)',
//     value: '0.0363',
//     description: 'Explained variance in actual burned area (hectares).',
//     icon: 'pi pi-chart-line',
//     tone: 'blue' as const,
//   },
//   {
//     label: 'Mean Absolute Error',
//     value: '≈ 350 ha',
//     description: 'Average absolute prediction error on the test dataset.',
//     icon: 'pi pi-bullseye',
//     tone: 'orange' as const,
//   },
// ]

const modelMetrics = computed(() => {
  const metrics = performance.value?.metrics

  return [
    {
      label: 'R² Score (Original Scale)',
      value: metrics ? metrics.r2.toFixed(4) : '—',
      description: 'Explained variance in actual burned area (hectares).',
      icon: 'pi pi-chart-line',
      tone: 'teal' as const,
    },
    {
      label: 'Mean Absolute Error',
      value: metrics ? `${metrics.mae_ha.toFixed(2)} ha` : '—',
      description: 'Average absolute prediction error on the held-out test set.',
      icon: 'pi pi-bullseye',
      tone: 'orange' as const,
    },
    {
      label: 'Root Mean Squared Error',
      value: metrics ? `${metrics.rmse_ha.toFixed(2)} ha` : '—',
      description: 'Prediction error metric that gives greater weight to large errors.',
      icon: 'pi pi-chart-bar',
      tone: 'blue' as const,
    },
  ]
})

const datasetMetrics = [
  {
    label: 'Model-Ready Records',
    value: '11,303',
    description: 'Observations included in the final training and testing datasets.',
    icon: 'pi pi-database',
    tone: 'teal' as const,
  },
  {
    label: 'Training Samples',
    value: '9,042',
    description: 'Historical records used for model training.',
    icon: 'pi pi-graduation-cap',
    tone: 'purple' as const,
  },
  {
    label: 'Testing Samples',
    value: '2,261',
    description: 'Held-out records used for model evaluation.',
    icon: 'pi pi-chart-line',
    tone: 'blue' as const,
  },
  {
    label: 'Model Features',
    value: '44',
    description: 'Final engineered features provided to XGBoost.',
    icon: 'pi pi-sitemap',
    tone: 'orange' as const,
  },
]

const workflowSteps = [
  {
    number: '01',
    title: 'Wildfire Data',
    description: 'Environmental and geographical information describing an existing wildfire.',
    icon: 'pi pi-map',
    tone: 'teal',
  },
  {
    number: '02',
    title: 'Feature Processing',
    description: 'Missing-value handling and feature engineering produce 44 model inputs.',
    icon: 'pi pi-sliders-h',
    tone: 'blue',
  },
  {
    number: '03',
    title: 'XGBoost Prediction',
    description: 'The optimized machine learning model estimates burned area in hectares.',
    icon: 'pi pi-chart-line',
    tone: 'purple',
  },
  {
    number: '04',
    title: 'Research Interpretation',
    description: 'The estimated area is reviewed alongside model limitations and uncertainty.',
    icon: 'pi pi-file',
    tone: 'orange',
  },
]

const researchModules = [
  {
    title: 'Burned Area Prediction',
    description: 'Estimate wildfire burned area using the optimized XGBoost model.',
    path: '/prediction',
    icon: 'pi pi-chart-line',
    color: 'var(--wi-orange)',
  },
  {
    title: 'Wildfire Map',
    description: 'Explore wildfire observations through an interactive geographical map.',
    path: '/map',
    icon: 'pi pi-map',
    color: 'var(--wi-teal)',
  },
  {
    title: 'Historical Wildfires',
    description: 'Explore historical wildfire records and their characteristics.',
    path: '/history',
    icon: 'pi pi-calendar',
    color: 'var(--wi-blue)',
  },
  {
    title: 'Environmental Analytics',
    description: 'Investigate seasonal patterns, environmental factors and burned-area trends.',
    path: '/analytics',
    icon: 'pi pi-chart-bar',
    color: 'var(--wi-teal)',
  },
  {
    title: 'Model Insights',
    description: 'Review performance, feature importance and scientific model evaluation.',
    path: '/model-insights',
    icon: 'pi pi-cog',
    color: 'var(--wi-orange)',
  },

  {
    title: 'Scientific Research',
    description:
      'Explore the scientific findings, model experiments, prediction limitations and research conclusions.',
    path: '/research',
    icon: 'pi pi-book',
    color: 'var(--wi-blue)',
  },
]
</script>

<template>
  <div class="space-y-8 text-[var(--wi-text)]">
    <!-- Research dashboard hero -->
    <header
      class="relative overflow-hidden rounded-3xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-6 py-7 shadow-sm sm:px-8"
    >
      <!-- Subtle theme-aware accents -->
      <div
        class="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[var(--wi-teal)] opacity-[0.055] blur-3xl"
      ></div>

      <div
        class="pointer-events-none absolute -bottom-32 right-24 h-56 w-56 rounded-full bg-[var(--wi-orange)] opacity-[0.045] blur-3xl"
      ></div>

      <div class="relative max-w-3xl">
        <div class="mb-4 flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-[var(--wi-teal)]"></span>

          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[var(--wi-orange)]">
            Research Dashboard
          </p>
        </div>

        <h1 class="text-3xl font-extrabold tracking-tight text-[var(--wi-text)] sm:text-4xl">
          Forest Fire Burned Area
          <span class="text-[var(--wi-orange)]"> Prediction </span>
        </h1>

        <p class="mt-4 max-w-2xl text-sm leading-7 text-[var(--wi-muted)] sm:text-base">
          Explore the evaluation results of our machine learning model developed to estimate the
          eventual burned area of existing wildfires using environmental and geographical data.
        </p>

        <!-- Research badges -->
        <div class="mt-5 flex flex-wrap gap-2">
          <span
            class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
            :style="{
              color: 'var(--wi-teal)',
              borderColor: 'var(--wi-border)',
              backgroundColor: 'var(--wi-surface-alt)',
            }"
          >
            <i class="pi pi-database mr-2" aria-hidden="true"></i>
            Historical Research Data
          </span>

          <span
            class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
            :style="{
              color: 'var(--wi-blue)',
              borderColor: 'var(--wi-border)',
              backgroundColor: 'var(--wi-surface-alt)',
            }"
          >
            <i class="pi pi-chart-line mr-2" aria-hidden="true"></i>
            XGBoost Model
          </span>

          <span
            class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
            :style="{
              color: 'var(--wi-orange)',
              borderColor: 'var(--wi-border)',
              backgroundColor: 'var(--wi-surface-alt)',
            }"
          >
            <i class="pi pi-info-circle mr-2" aria-hidden="true"></i>
            Research Prototype
          </span>
        </div>
      </div>
    </header>

    <!-- Model Performance -->
    <section aria-labelledby="performance-heading">
      <div class="mb-5 flex items-start gap-3">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-teal)]"
        >
          <i class="pi pi-chart-bar text-lg" aria-hidden="true"></i>
        </div>

        <div>
          <h2 id="performance-heading" class="text-xl font-bold text-[var(--wi-text)]">
            Model Performance
          </h2>

          <p class="mt-1 text-sm text-[var(--wi-muted)]">
            Optimized XGBoost model — held-out test dataset
          </p>
        </div>
      </div>

      <!-- <div class="grid gap-5 md:grid-cols-3">
        <ScientificMetricCard
          v-for="metric in modelMetrics"
          :key="metric.label"
          :label="metric.label"
          :value="metric.value"
          :description="metric.description"
          :icon="metric.icon"
          :tone="metric.tone"
        />
      </div> -->

      <div v-if="performanceLoading" role="status" class="grid gap-5 md:grid-cols-3">
        <div
          v-for="index in 3"
          :key="index"
          class="h-40 animate-pulse rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] motion-reduce:animate-none"
        ></div>
      </div>

      <div
        v-else-if="performanceError"
        role="alert"
        class="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-[var(--wi-text)]"
      >
        <p>{{ performanceError }}</p>
        <button
          type="button"
          class="mt-2 font-semibold text-[var(--wi-teal)] underline"
          @click="loadOverviewPerformance"
        >
          Retry loading
        </button>
      </div>

      <div v-else class="grid gap-5 md:grid-cols-3">
        <ScientificMetricCard
          v-for="metric in modelMetrics"
          :key="metric.label"
          :label="metric.label"
          :value="metric.value"
          :description="metric.description"
          :icon="metric.icon"
          :tone="metric.tone"
        />
      </div>
    </section>

    <!-- Dataset Summary -->
    <section aria-labelledby="dataset-heading">
      <div class="mb-5 flex items-start gap-3">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-teal)]"
        >
          <i class="pi pi-database text-lg" aria-hidden="true"></i>
        </div>

        <div>
          <h2 id="dataset-heading" class="text-xl font-bold text-[var(--wi-text)]">
            Dataset Summary
          </h2>

          <p class="mt-1 text-sm text-[var(--wi-muted)]">
            Historical wildfire research data — processed dataset
          </p>
        </div>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <ScientificMetricCard
          v-for="metric in datasetMetrics"
          :key="metric.label"
          :label="metric.label"
          :value="metric.value"
          :description="metric.description"
          :icon="metric.icon"
          :tone="metric.tone"
        />
      </div>

      <p class="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[var(--wi-muted)]">
        <i class="pi pi-info-circle mt-0.5" aria-hidden="true"></i>

        <span>
          Source: Mesogeos wildfire research dataset. The final model-ready dataset contains 11,303
          observations (9,042 training and 2,261 testing), with 44 engineered features. The earlier
          extracted dataset contained 11,305 records; the reason for the two-record difference has
          not yet been verified.
        </span>
      </p>
    </section>

    <!-- Prediction Workflow -->
    <section aria-labelledby="workflow-heading">
      <div class="mb-5 flex items-start gap-3">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-blue)]"
        >
          <i class="pi pi-sitemap text-lg" aria-hidden="true"></i>
        </div>

        <div>
          <h2 id="workflow-heading" class="text-xl font-bold text-[var(--wi-text)]">
            Prediction Engine & Research Workflow
          </h2>

          <p class="mt-1 text-sm text-[var(--wi-muted)]">
            How the XGBoost burned area estimation pipeline operates
          </p>
        </div>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="step in workflowSteps"
          :key="step.number"
          class="relative rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="mb-5 flex items-center justify-between">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)]"
              :class="{
                'text-[var(--wi-teal)]': step.tone === 'teal',
                'text-[var(--wi-blue)]': step.tone === 'blue',
                'text-violet-500': step.tone === 'purple',
                'text-[var(--wi-orange)]': step.tone === 'orange',
              }"
            >
              <i :class="step.icon" class="text-xl" aria-hidden="true"></i>
            </div>

            <span
              class="text-sm font-bold tracking-wider"
              :class="{
                'text-[var(--wi-teal)]': step.tone === 'teal',
                'text-[var(--wi-blue)]': step.tone === 'blue',
                'text-violet-500': step.tone === 'purple',
                'text-[var(--wi-orange)]': step.tone === 'orange',
              }"
            >
              {{ step.number }}
            </span>
          </div>

          <h3 class="text-base font-semibold text-[var(--wi-text)]">
            {{ step.title }}
          </h3>

          <p class="mt-3 text-sm leading-relaxed text-[var(--wi-muted)]">
            {{ step.description }}
          </p>
        </article>
      </div>

      <p class="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[var(--wi-muted)]">
        <i class="pi pi-info-circle mt-0.5" aria-hidden="true"></i>

        <span>
          Research prototype: the Flask backend processes environmental features and uses an
          optimized XGBoost model to estimate burned area. Interactive predictions are available in
          the Burned Area Prediction section.
        </span>
      </p>
    </section>

    <!-- Research Module Navigation -->
    <section aria-labelledby="research-modules-heading">
      <div class="mb-5 flex items-start gap-3">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-teal)]"
        >
          <i class="pi pi-compass text-lg" aria-hidden="true"></i>
        </div>

        <div>
          <h2 id="research-modules-heading" class="text-xl font-bold text-[var(--wi-text)]">
            Explore Research Modules
          </h2>

          <p class="mt-1 text-sm text-[var(--wi-muted)]">
            Navigate through the Wildfire Intelligence research platform.
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <RouterLink
          v-for="module in researchModules"
          :key="module.path"
          :to="module.path"
          class="group flex min-h-40 flex-col justify-between rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[var(--wi-teal)] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wi-teal)] motion-reduce:transform-none"
        >
          <div>
            <div class="mb-4 flex items-center justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)]"
                :style="{ color: module.color }"
              >
                <i :class="module.icon" class="text-xl" aria-hidden="true"></i>
              </div>

              <i
                class="pi pi-arrow-up-right text-sm text-[var(--wi-muted)] transition-colors group-hover:text-[var(--wi-teal)]"
                aria-hidden="true"
              ></i>
            </div>

            <h3 class="text-base font-bold text-[var(--wi-text)]">
              {{ module.title }}
            </h3>

            <p class="mt-2 text-sm leading-6 text-[var(--wi-muted)]">
              {{ module.description }}
            </p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Research Interpretation -->
    <section
      aria-labelledby="interpretation-heading"
      class="relative overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-7"
      :style="{
        backgroundColor: 'var(--wi-surface)',
        borderColor: 'var(--wi-border)',
      }"
    >
      <div class="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[var(--wi-orange)]"></div>

      <div class="relative flex items-start gap-4">
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-orange)]"
        >
          <i class="pi pi-exclamation-triangle text-xl" aria-hidden="true"></i>
        </div>

        <div>
          <h2 id="interpretation-heading" class="text-lg font-bold text-[var(--wi-text)]">
            Research Interpretation
          </h2>

          <p class="mt-2 text-sm leading-7 text-[var(--wi-muted)]">
            The model demonstrates measurable predictive capability on log-transformed burned area,
            but its performance is considerably weaker when evaluated in actual hectares. Extreme
            wildfire events may be substantially underestimated.
          </p>

          <p class="mt-3 text-sm font-medium leading-7 text-[var(--wi-orange)]">
            Predictions are experimental research estimates and should not be used as operational
            fire-management guidance.
          </p>
        </div>
      </div>
    </section>

    <!-- Research Footer -->
    <footer class="border-t border-[var(--wi-border)] pt-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-xs text-[var(--wi-muted)]">
          Wildfire Intelligence — ML-Based Forest Fire Burned Area Prediction
        </p>

        <span class="text-xs font-medium text-[var(--wi-teal)]">
          <i class="pi pi-check-circle mr-1" aria-hidden="true"></i>
          Research Model Evaluation
        </span>
      </div>
    </footer>
  </div>
</template>
