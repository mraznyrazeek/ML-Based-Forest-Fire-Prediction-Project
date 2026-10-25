
<script setup lang="ts">
const modelMetrics = [
  {
    label: 'R² Score (Log Scale)',
    value: '0.2475',
    description: 'Explained variance on the log-transformed test target.',
  },
  {
    label: 'R² Score (Original Scale)',
    value: '0.0363',
    description: 'Explained variance in actual burned area (hectares).',
  },
  {
    label: 'Mean Absolute Error',
    value: '≈ 350 ha',
    description: 'Average absolute prediction error on the test dataset.',
  },
]

const datasetMetrics = [
  {
    label: 'Research Records',
    value: '11,303',
    description: 'Unique records after data cleaning and deduplication.',
  },
  {
    label: 'Training Samples',
    value: '9,042',
    description: 'Historical records used for model training.',
  },
  {
    label: 'Testing Samples',
    value: '2,261',
    description: 'Held-out records used for model evaluation.',
  },
  {
    label: 'Model Features',
    value: '44',
    description: 'Final engineered features provided to XGBoost.',
  },
]


const workflowSteps = [
  {
    number: '01',
    title: 'Wildfire Data',
    description:
      'Environmental and geographical information describing an existing wildfire.',
  },
  {
    number: '02',
    title: 'Feature Processing',
    description:
      'Missing-value handling and feature engineering produce 44 model inputs.',
  },
  {
    number: '03',
    title: 'XGBoost Prediction',
    description:
      'The optimized machine learning model estimates burned area in hectares.',
  },
  {
    number: '04',
    title: 'Research Interpretation',
    description:
      'The estimated area is reviewed alongside model limitations and uncertainty.',
  },
]


</script>

<template>
  <section class="space-y-8">
    <!-- Page heading -->
    <header>
      <p class="text-sm font-semibold uppercase tracking-widest text-orange-600">
        Research Dashboard
      </p>

      <h1 class="mt-2 text-3xl font-bold text-slate-900">
        Forest Fire Burned Area Prediction
      </h1>

      <p class="mt-3 max-w-3xl text-slate-600">
        Explore the evaluation results of our machine learning model
        developed to estimate the eventual burned area of existing wildfires.
      </p>
    </header>

    <!-- Model performance -->
    <section aria-labelledby="performance-heading">
      <div class="mb-5">
        <h2 id="performance-heading" class="text-xl font-bold text-slate-900">
          Model Performance
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          Optimized XGBoost model — held-out test dataset
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
        <article
          v-for="metric in modelMetrics"
          :key="metric.label"
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p class="text-sm font-medium text-slate-500">
            {{ metric.label }}
          </p>

          <p class="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            {{ metric.value }}
          </p>

          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            {{ metric.description }}
          </p>
        </article>
      </div>
    </section>


<!-- Dataset summary -->
<section aria-labelledby="dataset-heading">
  <div class="mb-5">
    <h2 id="dataset-heading" class="text-xl font-bold text-slate-900">
      Dataset Summary
    </h2>

    <p class="mt-1 text-sm text-slate-500">
      Historical wildfire research data — processed dataset
    </p>
  </div>

  <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
    <article
      v-for="metric in datasetMetrics"
      :key="metric.label"
      class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <p class="text-sm font-medium text-slate-500">
        {{ metric.label }}
      </p>

      <p class="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        {{ metric.value }}
      </p>

      <p class="mt-3 text-sm leading-relaxed text-slate-600">
        {{ metric.description }}
      </p>
    </article>
  </div>

  <p class="mt-3 text-xs text-slate-500">
    Source: Processed Mesogeos wildfire research dataset.
    The original extract contained 11,305 records before deduplication.
  </p>
</section>


<!-- Prediction workflow -->
<section aria-labelledby="workflow-heading">
  <div class="mb-5">
    <h2 id="workflow-heading" class="text-xl font-bold text-slate-900">
      Prediction Engine & Research Workflow
    </h2>

    <p class="mt-1 text-sm text-slate-500">
      How the XGBoost burned area estimation pipeline operates
    </p>
  </div>

  <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
    <article
      v-for="step in workflowSteps"
      :key="step.number"
      class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <span class="text-sm font-bold tracking-wider text-orange-600">
        {{ step.number }}
      </span>

      <h3 class="mt-3 text-base font-semibold text-slate-900">
        {{ step.title }}
      </h3>

      <p class="mt-2 text-sm leading-relaxed text-slate-600">
        {{ step.description }}
      </p>
    </article>
  </div>

  <p class="mt-4 text-xs text-slate-500">
    Research prototype: the prediction workflow describes the backend model
    pipeline. Interactive frontend prediction integration is under development.
  </p>
</section>


    <!-- Interpretation -->
    <section class="rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <h2 class="text-lg font-semibold text-amber-950">
        Research Interpretation
      </h2>

      <p class="mt-2 text-sm leading-relaxed text-amber-900">
        The model demonstrates measurable predictive capability on
        log-transformed burned area, but its performance is considerably
        weaker when evaluated in actual hectares. Extreme wildfire
        events may be substantially underestimated. Predictions should
        therefore be interpreted as experimental research estimates,
        not operational fire-management guidance.
      </p>
    </section>
  </section>
</template>
