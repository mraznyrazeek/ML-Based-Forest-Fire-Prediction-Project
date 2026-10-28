<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'

import {
  getAnnualWildfireTrends,
  getEnvironmentalRelationships,
  getMonthlyWildfireSeasonality,
  type AnnualWildfireTrend,
  type EnvironmentalRelationship,
  type EnvironmentalVariable,
  type MonthlyWildfireSeasonality,
} from '@/services/analyticsService'
import { useTheme } from '@/composables/useTheme'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend)

const { theme } = useTheme()

const annualTrends = ref<AnnualWildfireTrend[]>([])
const loading = ref(false)
const error = ref('')
const relationships = ref<EnvironmentalRelationship[]>([])
const relationshipsLoading = ref(false)
const relationshipsError = ref('')
const selectedVariable = ref<EnvironmentalVariable>('temperature_c')
const monthlyRecords = ref<MonthlyWildfireSeasonality[]>([])
const monthlyLoading = ref(false)
const monthlyError = ref('')
let active = true

const isDark = computed(() => theme.value === 'dark')

const palette = computed(() => ({
  text: isDark.value ? '#edf4fc' : '#102238',
  muted: isDark.value ? '#9dafc6' : '#62758d',
  grid: isDark.value ? 'rgba(157, 175, 198, 0.13)' : 'rgba(98, 117, 141, 0.13)',
  teal: isDark.value ? '#2dd4bf' : '#008f87',
  orange: isDark.value ? '#fb923c' : '#f36b21',
  blue: isDark.value ? '#60a5fa' : '#328fe8',
}))

const totalObservations = computed(() =>
  annualTrends.value.reduce((sum, row) => sum + row.observation_count, 0),
)

const totalRecordedArea = computed(() =>
  annualTrends.value.reduce((sum, row) => sum + row.total_burned_area_ha, 0),
)

const peakYear = computed(() => {
  if (!annualTrends.value.length) return null

  return annualTrends.value.reduce((highest, row) =>
    row.observation_count > highest.observation_count ? row : highest,
  )
})

const largestFire = computed(() =>
  annualTrends.value.reduce((maximum, row) => Math.max(maximum, row.largest_fire_ha), 0),
)

const yearLabels = computed(() => annualTrends.value.map((row) => String(row.year)))

const observationData = computed<ChartData<'bar'>>(() => ({
  labels: yearLabels.value,
  datasets: [
    {
      label: 'Historical observations',
      data: annualTrends.value.map((row) => row.observation_count),
      backgroundColor: palette.value.teal,
      borderRadius: 5,
      maxBarThickness: 32,
    },
  ],
}))

const burnedAreaData = computed<ChartData<'bar'>>(() => ({
  labels: yearLabels.value,
  datasets: [
    {
      label: 'Total recorded burned area (ha)',
      data: annualTrends.value.map((row) => row.total_burned_area_ha),
      backgroundColor: palette.value.orange,
      borderRadius: 5,
      maxBarThickness: 32,
    },
  ],
}))

const areaComparisonData = computed<ChartData<'line'>>(() => ({
  labels: yearLabels.value,
  datasets: [
    {
      label: 'Mean burned area',
      data: annualTrends.value.map((row) => row.mean_burned_area_ha),
      borderColor: palette.value.orange,
      backgroundColor: palette.value.orange,
      borderWidth: 2.5,
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 6,
    },
    {
      label: 'Median burned area',
      data: annualTrends.value.map((row) => row.median_burned_area_ha),
      borderColor: palette.value.teal,
      backgroundColor: palette.value.teal,
      borderWidth: 2.5,
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 6,
    },
  ],
}))

const barOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${formatNumber(context.parsed.y ?? 0)}`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: palette.value.muted,
        maxRotation: 45,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: palette.value.grid,
      },
      ticks: {
        color: palette.value.muted,
      },
    },
  },
}))

const lineOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: palette.value.text,
        usePointStyle: true,
        padding: 18,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${formatNumber(context.parsed.y ?? 0)} ha`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: palette.value.muted,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: palette.value.grid,
      },
      ticks: {
        color: palette.value.muted,
      },
    },
  },
}))

// Environmental summaries use API-provided quantile bins, not browser-side estimates.
const selectedRelationship = computed(
  () => relationships.value.find((item) => item.variable === selectedVariable.value) ?? null,
)

const excludedPercent = computed(() => {
  const row = selectedRelationship.value
  if (!row) return 0
  const total = row.available_records + row.excluded_records
  return total ? (row.excluded_records / total) * 100 : 0
})

function formatRange(min: number, max: number): string {
  const decimals =
    selectedVariable.value === 'ndvi' || selectedVariable.value === 'soil_moisture' ? 3 : 2
  return `${min.toFixed(decimals)}–${max.toFixed(decimals)}`
}

const relationshipData = computed<ChartData<'bar'>>(() => {
  const bins = selectedRelationship.value?.bins ?? []
  return {
    labels: bins.map((bin) => formatRange(bin.min_value, bin.max_value)),
    datasets: [
      {
        label: 'Median burned area',
        data: bins.map((bin) => bin.median_burned_area_ha),
        backgroundColor: palette.value.teal,
        borderRadius: 5,
        maxBarThickness: 52,
      },
      {
        label: 'Mean burned area',
        data: bins.map((bin) => bin.mean_burned_area_ha),
        backgroundColor: palette.value.orange,
        borderRadius: 5,
        maxBarThickness: 52,
      },
    ],
  }
})

const relationshipOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: palette.value.text, usePointStyle: true, padding: 16 },
    },
    tooltip: {
      callbacks: {
        title: (items) => {
          const index = items[0]?.dataIndex
          if (index === undefined) return ''
          const bin = selectedRelationship.value?.bins[index]
          return bin
            ? `${selectedRelationship.value?.label}: ${formatRange(bin.min_value, bin.max_value)}`
            : ''
        },
        label: (context) => `${context.dataset.label}: ${formatNumber(context.parsed.y ?? 0)} ha`,
        afterBody: (items) => {
          const index = items[0]?.dataIndex
          const bin = index === undefined ? undefined : selectedRelationship.value?.bins[index]
          return bin ? [`Observations: ${formatNumber(bin.observation_count)}`] : []
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: palette.value.muted, maxRotation: 30, minRotation: 0 },
    },
    y: {
      beginAtZero: true,
      grid: { color: palette.value.grid },
      ticks: { color: palette.value.muted },
      title: { display: true, text: 'Recorded burned area (ha)', color: palette.value.muted },
    },
  },
}))

async function loadRelationships() {
  relationshipsLoading.value = true
  relationshipsError.value = ''
  try {
    const response = await getEnvironmentalRelationships()
    if (!active) return
    relationships.value = response.relationships
  } catch (cause) {
    if (!active) return
    relationshipsError.value =
      cause instanceof Error ? cause.message : 'Unable to load environmental relationships.'
  } finally {
    if (active) relationshipsLoading.value = false
  }
}

// Monthly statistics are pooled across all available years, rather than annualized rates.
const monthLabels = computed(() => monthlyRecords.value.map((row) => row.month_name.slice(0, 3)))

const peakMonth = computed(() =>
  monthlyRecords.value.length
    ? monthlyRecords.value.reduce((peak, row) =>
        row.observation_count > peak.observation_count ? row : peak,
      )
    : null,
)

const peakAreaMonth = computed(() =>
  monthlyRecords.value.length
    ? monthlyRecords.value.reduce((peak, row) =>
        row.total_burned_area_ha > peak.total_burned_area_ha ? row : peak,
      )
    : null,
)

const summerObservationsPercent = computed(() => {
  const total = monthlyRecords.value.reduce((sum, row) => sum + row.observation_count, 0)
  const julyAugust = monthlyRecords.value
    .filter((row) => row.month === 7 || row.month === 8)
    .reduce((sum, row) => sum + row.observation_count, 0)
  return total ? (julyAugust / total) * 100 : 0
})

const monthlyObservationsData = computed<ChartData<'bar'>>(() => ({
  labels: monthLabels.value,
  datasets: [
    {
      label: 'Recorded observations',
      data: monthlyRecords.value.map((row) => row.observation_count),
      backgroundColor: monthlyRecords.value.map((row) =>
        row.month === 7 || row.month === 8 ? palette.value.orange : palette.value.teal,
      ),
      borderRadius: 5,
      maxBarThickness: 35,
    },
  ],
}))

const monthlyAreaData = computed<ChartData<'bar'>>(() => ({
  labels: monthLabels.value,
  datasets: [
    {
      label: 'Recorded burned area (ha)',
      data: monthlyRecords.value.map((row) => row.total_burned_area_ha),
      backgroundColor: palette.value.orange,
      borderRadius: 5,
      maxBarThickness: 35,
    },
  ],
}))

const monthlyMedianData = computed<ChartData<'line'>>(() => ({
  labels: monthLabels.value,
  datasets: [
    {
      label: 'Median recorded burned area',
      data: monthlyRecords.value.map((row) => row.median_burned_area_ha),
      borderColor: palette.value.teal,
      backgroundColor: palette.value.teal,
      borderWidth: 2.5,
      tension: 0.25,
      pointRadius: 4,
      pointHoverRadius: 7,
    },
  ],
}))

async function loadMonthlySeasonality() {
  monthlyLoading.value = true
  monthlyError.value = ''
  try {
    const response = await getMonthlyWildfireSeasonality()
    if (!active) return
    monthlyRecords.value = response.monthly_seasonality.slice().sort((a, b) => a.month - b.month)
  } catch (cause) {
    if (!active) return
    monthlyError.value =
      cause instanceof Error ? cause.message : 'Unable to load monthly seasonality.'
  } finally {
    if (active) monthlyLoading.value = false
  }
}

function formatNumber(value: number): string {
  return value.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  })
}

async function loadAnalytics() {
  loading.value = true
  error.value = ''

  try {
    const response = await getAnnualWildfireTrends()

    if (!active) return

    annualTrends.value = response.annual_trends.slice().sort((a, b) => a.year - b.year)
  } catch (cause) {
    if (!active) return

    error.value = cause instanceof Error ? cause.message : 'Unable to load environmental analytics.'
  } finally {
    if (active) loading.value = false
  }
}

function refreshAnalytics() {
  void loadAnalytics()
  void loadRelationships()
  void loadMonthlySeasonality()
}

onMounted(() => {
  active = true
  void loadAnalytics()
  void loadRelationships()
  void loadMonthlySeasonality()
})

onBeforeUnmount(() => {
  active = false
})
</script>

<template>
  <div class="space-y-4">
    <!-- Page header -->
    <header
      class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-5 py-4"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-orange)]"
        >
          <i class="pi pi-chart-bar text-lg" aria-hidden="true"></i>
        </div>

        <div>
          <p class="text-[10px] font-bold uppercase tracking-[0.17em] text-[var(--wi-orange)]">
            Mesogeos · Environmental Research
          </p>

          <h1 class="text-xl font-extrabold text-[var(--wi-text)]">Environmental Analytics</h1>

          <p class="mt-1 text-xs text-[var(--wi-muted)]">
            Historical wildfire trends and recorded burned-area analysis.
          </p>
        </div>
      </div>

      <button
        type="button"
        :disabled="loading || monthlyLoading || relationshipsLoading"
        class="rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-xs font-semibold text-[var(--wi-text)] hover:opacity-80 disabled:opacity-50"
        @click="refreshAnalytics"
      >
        <i
          :class="loading ? 'pi pi-spin pi-spinner' : 'pi pi-refresh'"
          class="mr-1"
          aria-hidden="true"
        ></i>
        Refresh
      </button>
    </header>

    <div
      v-if="loading"
      role="status"
      class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-4 py-3 text-sm text-[var(--wi-muted)]"
    >
      <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>
      Loading environmental analytics...
    </div>

    <div
      v-if="error"
      role="alert"
      class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
    >
      {{ error }}
    </div>

    <template v-if="annualTrends.length">
      <!-- KPI cards -->
      <section
        class="grid grid-cols-2 gap-3 lg:grid-cols-4"
        aria-label="Environmental analytics indicators"
      >
        <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4">
          <p class="text-xs font-semibold text-[var(--wi-muted)]">Historical observations</p>
          <p class="mt-2 text-2xl font-extrabold text-[var(--wi-text)]">
            {{ formatNumber(totalObservations) }}
          </p>
          <p class="mt-1 text-[11px] text-[var(--wi-muted)]">
            {{ annualTrends.length }} years of records
          </p>
        </div>

        <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4">
          <p class="text-xs font-semibold text-[var(--wi-muted)]">Total recorded burned area</p>
          <p class="mt-2 text-2xl font-extrabold text-[var(--wi-orange)]">
            {{ formatNumber(totalRecordedArea) }}
          </p>
          <p class="mt-1 text-[11px] text-[var(--wi-muted)]">Hectares · dataset sum</p>
        </div>

        <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4">
          <p class="text-xs font-semibold text-[var(--wi-muted)]">Peak observation year</p>
          <p class="mt-2 text-2xl font-extrabold text-[var(--wi-teal)]">
            {{ peakYear?.year ?? '—' }}
          </p>
          <p class="mt-1 text-[11px] text-[var(--wi-muted)]">
            {{ formatNumber(peakYear?.observation_count ?? 0) }} records
          </p>
        </div>

        <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4">
          <p class="text-xs font-semibold text-[var(--wi-muted)]">Largest recorded wildfire</p>
          <p class="mt-2 text-2xl font-extrabold text-[var(--wi-blue)]">
            {{ formatNumber(largestFire) }}
          </p>
          <p class="mt-1 text-[11px] text-[var(--wi-muted)]">Hectares · single observation</p>
        </div>
      </section>

      <!-- Two main charts -->
      <section class="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article
          class="min-w-0 rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4"
        >
          <div class="mb-4">
            <h2 class="text-sm font-bold text-[var(--wi-text)]">Annual Wildfire Observations</h2>
            <p class="mt-1 text-xs text-[var(--wi-muted)]">
              Number of observations recorded in the dataset each year
            </p>
          </div>

          <div class="h-[290px]">
            <Bar :data="observationData" :options="barOptions" :key="`observations-${theme}`" />
          </div>
        </article>

        <article
          class="min-w-0 rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4"
        >
          <div class="mb-4">
            <h2 class="text-sm font-bold text-[var(--wi-text)]">Annual Recorded Burned Area</h2>
            <p class="mt-1 text-xs text-[var(--wi-muted)]">
              Sum of recorded burned areas · hectares
            </p>
          </div>

          <div class="h-[290px]">
            <Bar :data="burnedAreaData" :options="barOptions" :key="`burned-area-${theme}`" />
          </div>
        </article>
      </section>

      <!-- Mean vs median -->
      <section class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4">
        <div class="mb-4">
          <h2 class="text-sm font-bold text-[var(--wi-text)]">Mean vs Median Burned Area</h2>
          <p class="mt-1 text-xs text-[var(--wi-muted)]">
            Comparing average and typical recorded wildfire sizes by year
          </p>
        </div>

        <div class="h-[300px]">
          <Line :data="areaComparisonData" :options="lineOptions" :key="`comparison-${theme}`" />
        </div>

        <p
          class="mt-3 border-t border-[var(--wi-border)] pt-3 text-xs leading-5 text-[var(--wi-muted)]"
        >
          When the mean exceeds the median substantially, large observations are influencing the
          annual average. The median is less sensitive to extreme burned-area values.
        </p>
      </section>

      <!-- Monthly seasonality: pooled across the full historical dataset -->
      <section
        class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4"
        aria-label="Monthly wildfire seasonality"
      >
        <div class="mb-4">
          <p class="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--wi-orange)]">
            Historical seasonal patterns
          </p>
          <h2 class="mt-1 text-sm font-bold text-[var(--wi-text)]">Monthly Wildfire Seasonality</h2>
          <p class="mt-1 text-xs text-[var(--wi-muted)]">
            Calendar-month summaries pooled across the Mesogeos observation period (2006–2022)
          </p>
        </div>

        <div v-if="monthlyLoading" role="status" class="py-6 text-sm text-[var(--wi-muted)]">
          <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>
          Loading monthly seasonality...
        </div>

        <div
          v-if="monthlyError"
          role="alert"
          class="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-3 text-sm text-red-500"
        >
          {{ monthlyError }}
          <button type="button" class="ml-3 font-bold underline" @click="loadMonthlySeasonality">
            Retry
          </button>
        </div>

        <template v-if="monthlyRecords.length && !monthlyLoading">
          <div class="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div class="rounded-xl bg-[var(--wi-surface-alt)] px-3 py-3">
              <p class="text-[11px] text-[var(--wi-muted)]">Peak observation month</p>
              <strong class="mt-1 block text-lg text-[var(--wi-teal)]">
                {{ peakMonth?.month_name ?? '—' }}
              </strong>
              <p class="text-[11px] text-[var(--wi-muted)]">
                {{ formatNumber(peakMonth?.observation_count ?? 0) }} observations
              </p>
            </div>
            <div class="rounded-xl bg-[var(--wi-surface-alt)] px-3 py-3">
              <p class="text-[11px] text-[var(--wi-muted)]">Peak recorded burned-area month</p>
              <strong class="mt-1 block text-lg text-[var(--wi-orange)]">
                {{ peakAreaMonth?.month_name ?? '—' }}
              </strong>
              <p class="text-[11px] text-[var(--wi-muted)]">
                {{ formatNumber(peakAreaMonth?.total_burned_area_ha ?? 0) }} ha
              </p>
            </div>
            <div class="rounded-xl bg-[var(--wi-surface-alt)] px-3 py-3">
              <p class="text-[11px] text-[var(--wi-muted)]">July–August share of observations</p>
              <strong class="mt-1 block text-lg text-[var(--wi-blue)]">
                {{ summerObservationsPercent.toFixed(1) }}%
              </strong>
              <p class="text-[11px] text-[var(--wi-muted)]">Share of sampled records</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <article class="min-w-0 rounded-xl border border-[var(--wi-border)] p-3">
              <h3 class="text-sm font-bold text-[var(--wi-text)]">Monthly Wildfire Observations</h3>
              <p class="mt-1 text-xs text-[var(--wi-muted)]">Observation count by calendar month</p>
              <div class="mt-4 h-[270px]">
                <Bar
                  :key="`month-count-${theme}`"
                  :data="monthlyObservationsData"
                  :options="barOptions"
                />
              </div>
            </article>
            <article class="min-w-0 rounded-xl border border-[var(--wi-border)] p-3">
              <h3 class="text-sm font-bold text-[var(--wi-text)]">Monthly Recorded Burned Area</h3>
              <p class="mt-1 text-xs text-[var(--wi-muted)]">Sum of burned areas (ha) by month</p>
              <div class="mt-4 h-[270px]">
                <Bar :key="`month-area-${theme}`" :data="monthlyAreaData" :options="barOptions" />
              </div>
            </article>
          </div>

          <article class="mt-4 rounded-xl border border-[var(--wi-border)] p-3">
            <h3 class="text-sm font-bold text-[var(--wi-text)]">Median Wildfire Size by Month</h3>
            <p class="mt-1 text-xs text-[var(--wi-muted)]">
              Typical recorded burned area per observation (ha), not the monthly total
            </p>
            <div class="mt-4 h-[260px]">
              <Line
                :key="`month-median-${theme}`"
                :data="monthlyMedianData"
                :options="lineOptions"
              />
            </div>
          </article>

          <p class="mt-3 text-xs leading-5 text-[var(--wi-muted)]">
            Research note: Each month's statistics pool observations across all available years.
            Counts and area sums describe records in this dataset, not a complete regional census or
            annualized rates. Higher observation counts do not necessarily imply larger fires.
          </p>
        </template>
        <p v-else-if="!monthlyLoading && !monthlyError" class="py-6 text-sm text-[var(--wi-muted)]">
          No monthly observations available.
        </p>
      </section>

      <!-- Environmental relationship explorer -->
      <section
        class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4"
        aria-label="Environmental relationships"
      >
        <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--wi-orange)]">
              Descriptive environmental analysis
            </p>
            <h2 class="mt-1 text-sm font-bold text-[var(--wi-text)]">
              Environmental Conditions vs Burned Area
            </h2>
            <p class="mt-1 text-xs text-[var(--wi-muted)]">
              Quantile-based groups · compare median and mean recorded burned area
            </p>
          </div>
          <div class="w-full sm:w-64">
            <label
              for="environment-variable"
              class="mb-1 block text-xs font-semibold text-[var(--wi-muted)]"
            >
              Environmental variable
            </label>
            <select
              id="environment-variable"
              v-model="selectedVariable"
              class="w-full rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-sm text-[var(--wi-text)] focus:outline-2 focus:outline-offset-1 focus:outline-[var(--wi-teal)]"
              :disabled="relationshipsLoading || !relationships.length"
            >
              <option v-for="item in relationships" :key="item.variable" :value="item.variable">
                {{ item.label }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="relationshipsLoading" role="status" class="py-6 text-sm text-[var(--wi-muted)]">
          <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>
          Loading environmental comparisons...
        </div>
        <div
          v-if="relationshipsError"
          role="alert"
          class="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-3 text-sm text-red-500"
        >
          {{ relationshipsError }}
          <button type="button" class="ml-3 font-bold underline" @click="loadRelationships">
            Retry
          </button>
        </div>

        <template v-if="selectedRelationship && !relationshipsLoading">
          <div class="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div class="rounded-xl bg-[var(--wi-surface-alt)] px-3 py-3">
              <p class="text-[11px] text-[var(--wi-muted)]">Available observations</p>
              <strong class="mt-1 block text-lg text-[var(--wi-text)]">
                {{ formatNumber(selectedRelationship.available_records) }}
              </strong>
            </div>
            <div class="rounded-xl bg-[var(--wi-surface-alt)] px-3 py-3">
              <p class="text-[11px] text-[var(--wi-muted)]">Excluded / missing</p>
              <strong class="mt-1 block text-lg text-[var(--wi-orange)]">
                {{ formatNumber(selectedRelationship.excluded_records) }}
                <span class="text-xs font-medium text-[var(--wi-muted)]"
                  >({{ excludedPercent.toFixed(1) }}%)</span
                >
              </strong>
            </div>
            <div class="col-span-2 rounded-xl bg-[var(--wi-surface-alt)] px-3 py-3 sm:col-span-1">
              <p class="text-[11px] text-[var(--wi-muted)]">Quantile groups</p>
              <strong class="mt-1 block text-lg text-[var(--wi-teal)]">
                {{ selectedRelationship.bin_count }}
              </strong>
            </div>
          </div>

          <div v-if="selectedRelationship.bins.length" class="h-[340px]">
            <Bar
              :key="`relationships-${theme}-${selectedVariable}`"
              :data="relationshipData"
              :options="relationshipOptions"
            />
          </div>
          <p v-else class="py-8 text-center text-sm text-[var(--wi-muted)]">
            Insufficient observations to create comparison groups.
          </p>

          <div class="mt-3 overflow-x-auto rounded-lg border border-[var(--wi-border)]">
            <table class="w-full min-w-[570px] text-left text-xs">
              <thead class="bg-[var(--wi-surface-alt)] text-[var(--wi-muted)]">
                <tr>
                  <th scope="col" class="px-3 py-2">{{ selectedRelationship.label }} range</th>
                  <th scope="col" class="px-3 py-2 text-right">Observations</th>
                  <th scope="col" class="px-3 py-2 text-right">Median (ha)</th>
                  <th scope="col" class="px-3 py-2 text-right">Mean (ha)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--wi-border)] text-[var(--wi-text)]">
                <tr v-for="(bin, index) in selectedRelationship.bins" :key="index">
                  <td class="px-3 py-2 font-semibold">
                    {{ formatRange(bin.min_value, bin.max_value) }}
                  </td>
                  <td class="px-3 py-2 text-right">{{ formatNumber(bin.observation_count) }}</td>
                  <td class="px-3 py-2 text-right">
                    {{ formatNumber(bin.median_burned_area_ha) }}
                  </td>
                  <td class="px-3 py-2 text-right">{{ formatNumber(bin.mean_burned_area_ha) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-3 text-xs leading-5 text-[var(--wi-muted)]">
            Groups are computed from non-missing values of the selected variable. The chart displays
            median and mean burned areas (hectares), not variable magnitude. Hover for sample
            counts. These are observational associations, not causal effects; the groups can differ
            in season, geography and other conditions. Wind-speed units are not specified in the
            source metadata.
          </p>
        </template>
      </section>

      <p class="px-1 text-[11px] leading-5 text-[var(--wi-muted)]">
        Research note: These visualizations summarize recorded Mesogeos observations between 2006
        and 2022. They do not represent a complete census of regional wildfire activity, establish
        environmental causation, or show model-predicted burned areas.
      </p>
    </template>
  </div>
</template>
