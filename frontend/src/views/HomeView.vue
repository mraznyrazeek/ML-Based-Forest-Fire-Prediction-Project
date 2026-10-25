
<script setup lang="ts">
import ScientificMetricCard from '@/components/dashboard/ScientificMetricCard.vue'

const modelMetrics = [
  {
    label: 'R² Score (Log Scale)',
    value: '0.2475',
    description: 'Explained variance on the log-transformed test target.',
    icon: 'pi pi-chart-bar',
    tone: 'teal' as const,
  },
  {
    label: 'R² Score (Original Scale)',
    value: '0.0363',
    description: 'Explained variance in actual burned area (hectares).',
    icon: 'pi pi-chart-line',
    tone: 'blue' as const,
  },
  {
    label: 'Mean Absolute Error',
    value: '≈ 350 ha',
    description: 'Average absolute prediction error on the test dataset.',
    icon: 'pi pi-bullseye',
    tone: 'orange' as const,
  },
]

const datasetMetrics = [
  {
    label: 'Research Records',
    value: '11,303',
    description: 'Unique records after data cleaning and deduplication.',
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
    description:
      'Environmental and geographical information describing an existing wildfire.',
    icon: 'pi pi-map',
    tone: 'teal',
  },
  {
    number: '02',
    title: 'Feature Processing',
    description:
      'Missing-value handling and feature engineering produce 44 model inputs.',
    icon: 'pi pi-sliders-h',
    tone: 'blue',
  },
  {
    number: '03',
    title: 'XGBoost Prediction',
    description:
      'The optimized machine learning model estimates burned area in hectares.',
    icon: 'pi pi-chart-line',
    tone: 'purple',
  },
  {
    number: '04',
    title: 'Research Interpretation',
    description:
      'The estimated area is reviewed alongside model limitations and uncertainty.',
    icon: 'pi pi-file',
    tone: 'orange',
  },
]
</script>

<template>
  <div class="space-y-9">
    <!-- Dashboard heading -->
    <header class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-7 py-8 shadow-sm sm:px-9">
      <div
        class="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-teal-100/60 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-32 right-24 h-56 w-56 rounded-full bg-orange-100/50 blur-3xl"
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
          <span class="text-[var(--wi-orange)]">Prediction</span>
        </h1>

        <p class="mt-4 max-w-2xl text-sm leading-7 text-[var(--wi-muted)] sm:text-base">
          Explore the evaluation results of our machine learning model
          developed to estimate the eventual burned area of existing
          wildfires using environmental and geographical data.
        </p>

        <div class="mt-5 flex flex-wrap gap-2">
          <span class="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
            <i class="pi pi-database mr-1" aria-hidden="true"></i>
            Historical Research Data
          </span>
          <span class="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <i class="pi pi-chart-line mr-1" aria-hidden="true"></i>
            XGBoost Model
          </span>
          <span class="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
            <i class="pi pi-info-circle mr-1" aria-hidden="true"></i>
            Research Prototype
          </span>
        </div>
      </div>
    </header>

    <!-- Model performance -->
    <section aria-labelledby="performance-heading">
      <div class="mb-5 flex items-start gap-3">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
          <i class="pi pi-chart-bar text-lg" aria-hidden="true"></i>
        </div>

        <div>
          <h2
            id="performance-heading"
            class="text-xl font-bold text-[var(--wi-text)]"
          >
            Model Performance
          </h2>
          <p class="mt-1 text-sm text-[var(--wi-muted)]">
            Optimized XGBoost model — held-out test dataset
          </p>
        </div>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
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

    <!-- Dataset summary -->
    <section aria-labelledby="dataset-heading">
      <div class="mb-5 flex items-start gap-3">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
          <i class="pi pi-database text-lg" aria-hidden="true"></i>
        </div>

        <div>
          <h2
            id="dataset-heading"
            class="text-xl font-bold text-[var(--wi-text)]"
          >
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
          Source: Processed Mesogeos wildfire research dataset.
          The original extract contained 11,305 records before deduplication.
        </span>
      </p>
    </section>

    <!-- Prediction workflow -->
    <section aria-labelledby="workflow-heading">
      <div class="mb-5 flex items-start gap-3">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
          <i class="pi pi-sitemap text-lg" aria-hidden="true"></i>
        </div>

        <div>
          <h2
            id="workflow-heading"
            class="text-xl font-bold text-[var(--wi-text)]"
          >
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
          class="relative rounded-2xl border border-[var(--wi-border)] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="mb-5 flex items-center justify-between">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl"
              :class="{
                'bg-teal-100 text-teal-700': step.tone === 'teal',
                'bg-blue-100 text-blue-700': step.tone === 'blue',
                'bg-violet-100 text-violet-700': step.tone === 'purple',
                'bg-orange-100 text-orange-700': step.tone === 'orange',
              }"
            >
              <i :class="step.icon" class="text-xl" aria-hidden="true"></i>
            </div>

            <span
              class="text-sm font-bold tracking-wider"
              :class="{
                'text-teal-600': step.tone === 'teal',
                'text-blue-600': step.tone === 'blue',
                'text-violet-600': step.tone === 'purple',
                'text-orange-600': step.tone === 'orange',
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
          Research prototype: this workflow describes the backend model
          pipeline. Interactive frontend prediction integration is under development.
        </span>
      </p>
    </section>

    <!-- Research interpretation -->
    <section
      aria-labelledby="interpretation-heading"
      class="relative overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6 shadow-sm sm:p-7"
    >
      <div class="relative flex items-start gap-4">
        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
          <i class="pi pi-exclamation-triangle text-xl" aria-hidden="true"></i>
        </div>

        <div>
          <h2
            id="interpretation-heading"
            class="text-lg font-bold text-orange-950"
          >
            Research Interpretation
          </h2>

          <p class="mt-2 text-sm leading-7 text-orange-900">
            The model demonstrates measurable predictive capability on
            log-transformed burned area, but its performance is considerably
            weaker when evaluated in actual hectares. Extreme wildfire
            events may be substantially underestimated.
          </p>

          <p class="mt-3 text-sm font-medium leading-7 text-orange-950">
            Predictions are experimental research estimates and should
            not be used as operational fire-management guidance.
          </p>
        </div>
      </div>
    </section>

    <!-- Research footer -->
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
