<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref } from 'vue'
import {
  getHistoricalWildfires,
  getHistoricalWildfireDetails,
  type HistoricalWildfireRecord,
  type HistoricalWildfireDetails,
  type HistoricalWildfireSortField,
  type HistoricalWildfireSortOrder,
} from '@/services/historicalWildfireService'

const records = ref<HistoricalWildfireRecord[]>([])
const loading = ref(false)
const error = ref('')

const selectedRecord = ref<HistoricalWildfireDetails | null>(null)
const detailsLoading = ref(false)
const detailsError = ref('')
const detailsVisible = ref(false)
const modalDialog = ref<HTMLElement | null>(null)
const requestedRecordId = ref<number | null>(null)
let previouslyFocused: HTMLElement | null = null
let previousBodyOverflow = ''
let detailsRequestCounter = 0

// Field labels and units follow the original Mesogeos CSV names.
// Unverified units (such as wind_speed and solar_radiation) are not assumed.
const measurementGroups = [
  {
    title: 'Weather & atmosphere',
    icon: 'pi-cloud',
    fields: [
      { key: 'temperature_c', label: 'Temperature', unit: '°C' },
      { key: 'dew_point_c', label: 'Dew point', unit: '°C' },
      { key: 'relative_humidity', label: 'Relative humidity', unit: '%' },
      { key: 'wind_speed', label: 'Wind speed', unit: '' },
      { key: 'wind_direction', label: 'Wind direction', unit: '°' },
      { key: 'rainfall_mm', label: 'Rainfall', unit: 'mm' },
      { key: 'surface_pressure', label: 'Surface pressure', unit: '' },
      { key: 'solar_radiation', label: 'Solar radiation', unit: '' },
    ],
  },
  {
    title: 'Vegetation & soil',
    icon: 'pi-sun',
    fields: [
      { key: 'ndvi', label: 'NDVI', unit: '' },
      { key: 'lai', label: 'Leaf area index (LAI)', unit: '' },
      { key: 'soil_moisture', label: 'Soil moisture', unit: '' },
    ],
  },
  {
    title: 'Terrain',
    icon: 'pi-compass',
    fields: [
      { key: 'elevation', label: 'Elevation', unit: '' },
      { key: 'slope_degrees', label: 'Slope', unit: '°' },
      { key: 'aspect', label: 'Aspect', unit: '' },
      { key: 'curvature', label: 'Curvature', unit: '' },
    ],
  },
  {
    title: 'Human & infrastructure',
    icon: 'pi-map-marker',
    fields: [
      { key: 'roads_distance_km', label: 'Distance to roads', unit: 'km' },
      { key: 'population', label: 'Population indicator', unit: '' },
    ],
  },
  {
    title: 'Land-cover indicators',
    icon: 'pi-th-large',
    fields: [
      { key: 'lc_agriculture', label: 'Agriculture', unit: '' },
      { key: 'lc_forest', label: 'Forest', unit: '' },
      { key: 'lc_grassland', label: 'Grassland', unit: '' },
      { key: 'lc_settlement', label: 'Settlement', unit: '' },
      { key: 'lc_shrubland', label: 'Shrubland', unit: '' },
      { key: 'lc_sparse_vegetation', label: 'Sparse vegetation', unit: '' },
      { key: 'lc_water_bodies', label: 'Water bodies', unit: '' },
      { key: 'lc_wetland', label: 'Wetland', unit: '' },
    ],
  },
  {
    title: 'Original record metadata',
    icon: 'pi-database',
    fields: [
      { key: 'date', label: 'Date', unit: '' },
      { key: 'year', label: 'Year', unit: '' },
      { key: 'month', label: 'Month', unit: '' },
      { key: 'day_of_year', label: 'Day of year', unit: '' },
      { key: 'latitude', label: 'Latitude', unit: '°' },
      { key: 'longitude', label: 'Longitude', unit: '°' },
      { key: 'burned_area_ha', label: 'Recorded burned area', unit: 'ha' },
    ],
  },
]

const currentPage = ref(1)
const pageSize = 25
const totalRecords = ref(0)
const totalPages = ref(0)

const filterYear = ref('')
const filterCountry = ref('')
const filterMinArea = ref('0')

const sortBy = ref<'date' | 'burned_area' | 'temperature' | 'country'>('date')

const sortOrder = ref<'asc' | 'desc'>('desc')

const yearOptions = Array.from({ length: 17 }, (_, index) => 2022 - index)

const countryOptions = [
  'Albania',
  'Algeria',
  'Bosnia and Herzegovina',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Egypt',
  'France',
  'Greece',
  'Israel',
  'Italy',
  'Lebanon',
  'Libya',
  'Montenegro',
  'Morocco',
  'North Macedonia',
  'Portugal',
  'Romania',
  'Serbia',
  'Slovenia',
  'Spain',
  'Syria',
  'Tunisia',
  'Turkey',
  'Ukraine',
  'Unassigned',
]

// The toolbar holds draft selections; requests use only applied selections.
const appliedFilters = ref({
  year: '',
  country: '',
  minArea: '0',
  sortBy: 'date' as HistoricalWildfireSortField,
  sortOrder: 'desc' as HistoricalWildfireSortOrder,
})

let active = false
let requestCounter = 0

const displayedCount = computed(() => records.value.length)

const pageStart = computed(() =>
  displayedCount.value === 0 ? 0 : (currentPage.value - 1) * pageSize + 1,
)

const pageEnd = computed(() =>
  displayedCount.value === 0 ? 0 : pageStart.value + displayedCount.value - 1,
)

function formatNumber(value: number): string {
  return value.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  })
}

function formatDate(date: string): string {
  const [year, month, day] = date.split('-')

  if (!year || !month || !day) return date

  return `${day}/${month}/${year}`
}

function formatMeasurement(value: number | null, suffix: string): string {
  if (value === null) return 'Not available'
  return `${formatNumber(value)} ${suffix}`
}

function detailValue(value: string | number | null | undefined, unit: string): string {
  if (value === null || value === undefined || value === '') return 'Not available'
  if (typeof value === 'string') return value
  return `${formatNumber(value)}${unit ? ` ${unit}` : ''}`
}

function closeRecordDetails() {
  ++detailsRequestCounter
  selectedRecord.value = null
  detailsVisible.value = false
  detailsLoading.value = false
  detailsError.value = ''
  requestedRecordId.value = null
  document.body.style.overflow = previousBodyOverflow
  previouslyFocused?.focus()
  previouslyFocused = null
}

async function selectRecord(recordId: number) {
  const requestId = ++detailsRequestCounter
  selectedRecord.value = null
  detailsError.value = ''
  requestedRecordId.value = recordId
  if (!detailsVisible.value) {
    previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    previousBodyOverflow = document.body.style.overflow
  }
  detailsVisible.value = true
  detailsLoading.value = true
  document.body.style.overflow = 'hidden'

  await nextTick()
  modalDialog.value?.focus()

  try {
    const result = await getHistoricalWildfireDetails(recordId)
    if (!active || requestId !== detailsRequestCounter) return
    selectedRecord.value = result
  } catch (cause) {
    if (!active || requestId !== detailsRequestCounter) return
    detailsError.value =
      cause instanceof Error ? cause.message : 'Unable to load wildfire record details.'
  } finally {
    if (active && requestId === detailsRequestCounter) detailsLoading.value = false
  }
}

function burnedAreaClass(area: number): string {
  if (area >= 2000) return 'severity-extreme'
  if (area >= 500) return 'severity-high'
  if (area >= 100) return 'severity-moderate'
  return 'severity-low'
}

async function loadRecords(page = currentPage.value) {
  closeRecordDetails()
  const requestId = ++requestCounter

  loading.value = true
  error.value = ''

  try {
    const response = await getHistoricalWildfires({
      page,
      pageSize,

      // Apply selected filters
      ...(appliedFilters.value.year ? { year: Number(appliedFilters.value.year) } : {}),

      ...(appliedFilters.value.country ? { country: appliedFilters.value.country } : {}),

      ...(Number(appliedFilters.value.minArea) > 0
        ? { minArea: Number(appliedFilters.value.minArea) }
        : {}),

      // Apply sorting
      sortBy: appliedFilters.value.sortBy,
      sortOrder: appliedFilters.value.sortOrder,
    })

    if (!active || requestId !== requestCounter) return

    records.value = response.records
    currentPage.value = response.page
    totalRecords.value = response.total_records
    totalPages.value = response.total_pages
  } catch (cause) {
    if (!active || requestId !== requestCounter) return

    error.value =
      cause instanceof Error ? cause.message : 'Unable to load historical wildfire observations.'
  } finally {
    if (active && requestId === requestCounter) {
      loading.value = false
    }
  }
}

function applyFilters() {
  if (loading.value) return
  appliedFilters.value = {
    year: filterYear.value,
    country: filterCountry.value,
    minArea: filterMinArea.value,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  }
  void loadRecords(1)
}

function resetFilters() {
  if (loading.value) return
  filterYear.value = ''
  filterCountry.value = ''
  filterMinArea.value = '0'
  sortBy.value = 'date'
  sortOrder.value = 'desc'
  appliedFilters.value = {
    year: '',
    country: '',
    minArea: '0',
    sortBy: 'date',
    sortOrder: 'desc',
  }
  void loadRecords(1)
}

function nextPage() {
  if (loading.value || currentPage.value >= totalPages.value) return
  void loadRecords(currentPage.value + 1)
}

function previousPage() {
  if (loading.value || currentPage.value <= 1) return
  void loadRecords(currentPage.value - 1)
}

onMounted(() => {
  active = true
  void loadRecords(1)
})

onBeforeUnmount(() => {
  active = false
  requestCounter += 1
  detailsRequestCounter += 1
  if (detailsVisible.value) document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <div class="space-y-4">
    <!-- Page heading -->
    <header
      class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-5 py-4"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-orange)]"
        >
          <i class="pi pi-calendar text-lg" aria-hidden="true"></i>
        </div>

        <div>
          <p class="text-[10px] font-bold uppercase tracking-[0.17em] text-[var(--wi-orange)]">
            Mesogeos · Historical Research
          </p>

          <h1 class="text-xl font-extrabold text-[var(--wi-text)]">Historical Wildfire Explorer</h1>

          <p class="mt-1 text-xs text-[var(--wi-muted)]">
            Explore recorded wildfire observations and environmental measurements.
          </p>
        </div>
      </div>

      <span
        class="rounded-full border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-1.5 text-xs font-semibold text-[var(--wi-muted)]"
      >
        2006–2022
      </span>
    </header>

    <!-- Summary indicators -->
    <section class="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Historical wildfire summary">
      <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4">
        <p class="text-xs font-semibold text-[var(--wi-muted)]">Matching observations</p>

        <p class="mt-2 text-2xl font-extrabold text-[var(--wi-text)]">
          {{ formatNumber(totalRecords) }}
        </p>
      </div>

      <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4">
        <p class="text-xs font-semibold text-[var(--wi-muted)]">Current page</p>

        <p class="mt-2 text-2xl font-extrabold text-[var(--wi-teal)]">
          {{ currentPage }}
          <span class="text-sm font-medium text-[var(--wi-muted)]"> / {{ totalPages }} </span>
        </p>
      </div>

      <div class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-4">
        <p class="text-xs font-semibold text-[var(--wi-muted)]">Observations displayed</p>

        <p class="mt-2 text-2xl font-extrabold text-[var(--wi-orange)]">
          {{ displayedCount }}
        </p>
      </div>
    </section>

    <!-- Server-side filters; Apply resets pagination to page one. -->
    <section
      class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-4 py-3"
      aria-label="Historical wildfire filters"
    >
      <div class="mb-3 flex items-center justify-between gap-2">
        <h2 class="text-sm font-bold text-[var(--wi-text)]">
          <i class="pi pi-filter mr-2 text-[var(--wi-teal)]" aria-hidden="true"></i>
          Explore observations
        </h2>
        <span class="text-[11px] text-[var(--wi-muted)]">Filters apply across the dataset</span>
      </div>

      <form class="wi-history-filter-grid" @submit.prevent="applyFilters">
        <div class="space-y-1">
          <label for="history-year" class="block text-xs font-semibold text-[var(--wi-muted)]"
            >Year</label
          >
          <select id="history-year" v-model="filterYear" class="history-select" :disabled="loading">
            <option value="">All years</option>
            <option v-for="value in yearOptions" :key="value" :value="String(value)">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="space-y-1">
          <label for="history-country" class="block text-xs font-semibold text-[var(--wi-muted)]"
            >Country</label
          >
          <select
            id="history-country"
            v-model="filterCountry"
            class="history-select"
            :disabled="loading"
          >
            <option value="">All countries</option>
            <option v-for="value in countryOptions" :key="value" :value="value">{{ value }}</option>
          </select>
        </div>

        <div class="space-y-1">
          <label for="history-area" class="block text-xs font-semibold text-[var(--wi-muted)]"
            >Minimum burned area</label
          >
          <select
            id="history-area"
            v-model="filterMinArea"
            class="history-select"
            :disabled="loading"
          >
            <option value="0">Any size</option>
            <option value="100">100+ ha</option>
            <option value="500">500+ ha</option>
            <option value="1000">1,000+ ha</option>
            <option value="2000">2,000+ ha</option>
          </select>
        </div>

        <div class="space-y-1">
          <label for="history-sort" class="block text-xs font-semibold text-[var(--wi-muted)]"
            >Sort by</label
          >
          <select id="history-sort" v-model="sortBy" class="history-select" :disabled="loading">
            <option value="date">Date</option>
            <option value="burned_area">Burned area</option>
            <option value="temperature">Temperature</option>
            <option value="country">Country</option>
          </select>
        </div>

        <div class="space-y-1">
          <label for="history-order" class="block text-xs font-semibold text-[var(--wi-muted)]"
            >Order</label
          >
          <select id="history-order" v-model="sortOrder" class="history-select" :disabled="loading">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div class="flex gap-2">
          <button
            type="submit"
            :disabled="loading"
            class="min-w-0 flex-1 rounded-lg bg-[var(--wi-teal)] px-3 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            Apply
          </button>
          <button
            type="button"
            :disabled="loading"
            @click="resetFilters"
            class="rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-sm font-semibold text-[var(--wi-text)] hover:opacity-80 disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </form>
    </section>

    <!-- Historical data table -->
    <section
      class="overflow-hidden rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)]"
    >
      <div
        class="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--wi-border)] px-5 py-4"
      >
        <div>
          <h2 class="text-sm font-bold text-[var(--wi-text)]">Historical Observations</h2>

          <p class="mt-1 text-xs text-[var(--wi-muted)]">
            Historical wildfire records · sorted by
            {{ appliedFilters.sortBy.replace('_', ' ') }} ({{ appliedFilters.sortOrder }})
          </p>
        </div>

        <button
          type="button"
          :disabled="loading"
          class="rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-xs font-semibold text-[var(--wi-text)] hover:opacity-80 disabled:opacity-50"
          @click="loadRecords()"
        >
          <i
            :class="['pi', loading ? 'pi-spin pi-spinner' : 'pi-refresh']"
            class="mr-1"
            aria-hidden="true"
          ></i>
          Refresh
        </button>
      </div>

      <div
        v-if="error"
        role="alert"
        class="border-b border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-500"
      >
        {{ error }}
      </div>

      <div
        v-if="loading"
        role="status"
        class="border-b border-[var(--wi-border)] px-5 py-3 text-xs text-[var(--wi-muted)]"
      >
        <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>
        Loading historical wildfire records...
      </div>

      <div class="w-full overflow-x-auto">
        <table class="w-full min-w-[950px] text-left text-sm">
          <thead class="border-b border-[var(--wi-border)] bg-[var(--wi-surface-alt)]">
            <tr class="text-[11px] font-bold uppercase tracking-wide text-[var(--wi-muted)]">
              <th scope="col" class="px-4 py-3">Record ID</th>
              <th scope="col" class="px-4 py-3">Date</th>
              <th scope="col" class="px-4 py-3">Country</th>
              <th scope="col" class="px-4 py-3 text-right">Burned Area</th>
              <th scope="col" class="px-4 py-3 text-right">Temperature</th>
              <th scope="col" class="px-4 py-3 text-right">Humidity</th>
              <th scope="col" class="px-4 py-3 text-right">Latitude</th>
              <th scope="col" class="px-4 py-3 text-right">Longitude</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-[var(--wi-border)]">
            <tr
              v-for="record in records"
              :key="record.record_id"
              class="transition-colors hover:bg-[var(--wi-surface-alt)]"
            >
              <td class="px-4 py-3 font-semibold text-[var(--wi-teal)]">
                <button
                  type="button"
                  class="rounded font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wi-teal)]"
                  :aria-label="`View details for wildfire record ${record.record_id}`"
                  @click="selectRecord(record.record_id)"
                >
                  #{{ record.record_id }}
                  <i class="pi pi-external-link ml-1 text-[10px]" aria-hidden="true"></i>
                </button>
              </td>

              <td class="px-4 py-3 whitespace-nowrap text-[var(--wi-text)]">
                {{ formatDate(record.date) }}
              </td>

              <td class="px-4 py-3 font-medium text-[var(--wi-text)]">
                {{ record.country }}
              </td>

              <td class="px-4 py-3 text-right">
                <span
                  :class="burnedAreaClass(record.burned_area_ha)"
                  class="inline-flex rounded-md px-2 py-1 text-xs font-bold"
                >
                  {{ formatNumber(record.burned_area_ha) }} ha
                </span>
              </td>

              <td class="px-4 py-3 text-right text-[var(--wi-text)]">
                {{ formatMeasurement(record.temperature_c, '°C') }}
              </td>

              <td class="px-4 py-3 text-right text-[var(--wi-text)]">
                {{ formatMeasurement(record.relative_humidity, '%') }}
              </td>

              <td class="px-4 py-3 text-right text-[var(--wi-muted)]">
                {{ record.latitude.toFixed(4) }}
              </td>

              <td class="px-4 py-3 text-right text-[var(--wi-muted)]">
                {{ record.longitude.toFixed(4) }}
              </td>
            </tr>

            <tr v-if="!loading && records.length === 0">
              <td colspan="8" class="px-4 py-10 text-center text-sm text-[var(--wi-muted)]">
                No historical wildfire observations to display.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--wi-border)] px-5 py-4"
      >
        <p class="text-xs text-[var(--wi-muted)]">
          Showing
          <strong class="text-[var(--wi-text)]">
            {{ formatNumber(pageStart) }}–{{ formatNumber(pageEnd) }}
          </strong>
          of
          <strong class="text-[var(--wi-text)]">
            {{ formatNumber(totalRecords) }}
          </strong>
          observations
        </p>

        <div class="flex items-center gap-2">
          <button
            type="button"
            :disabled="loading || currentPage <= 1"
            class="rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-4 py-2 text-xs font-semibold text-[var(--wi-text)] hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
            @click="previousPage"
          >
            <i class="pi pi-chevron-left mr-1" aria-hidden="true"></i>
            Previous
          </button>

          <span class="px-2 text-xs font-semibold text-[var(--wi-muted)]">
            {{ currentPage }} / {{ totalPages }}
          </span>

          <button
            type="button"
            :disabled="loading || currentPage >= totalPages"
            class="rounded-lg bg-[var(--wi-teal)] px-4 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            @click="nextPage"
          >
            Next
            <i class="pi pi-chevron-right ml-1" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>

    <p class="px-1 text-[11px] leading-5 text-[var(--wi-muted)]">
      Research dataset: Mesogeos historical wildfire observations. Burned areas are recorded
      historical measurements, not model predictions. Environmental measurements may be unavailable
      for some observations.
    </p>
  </div>

  <!-- Record details modal. Teleport keeps it above the fixed dashboard sidebar. -->
  <Teleport to="body">
    <div
      v-if="detailsVisible"
      class="wi-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
    >
      <div
        class="absolute inset-0 bg-[#030b15]/80 backdrop-blur-sm"
        @click="closeRecordDetails"
      ></div>

      <section
        ref="modalDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-detail-title"
        tabindex="-1"
        class="wi-history-modal relative flex max-h-[92dvh] w-full max-w-[1060px] flex-col overflow-hidden rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] shadow-2xl outline-none"
        @keydown.esc.stop="closeRecordDetails"
      >
        <!-- High-contrast research header -->
        <header
          class="relative shrink-0 overflow-hidden border-b border-[var(--wi-border)] px-5 py-4 sm:px-6"
        >
          <div
            class="pointer-events-none absolute -right-10 -top-24 h-48 w-48 rounded-full bg-[var(--wi-orange)] opacity-[0.07] blur-3xl"
          ></div>
          <div class="relative flex items-start justify-between gap-4">
            <div class="flex items-start gap-3">
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] text-[var(--wi-orange)]"
              >
                <i class="pi pi-chart-scatter text-lg" aria-hidden="true"></i>
              </div>
              <div>
                <p
                  class="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--wi-orange)]"
                >
                  Mesogeos · Historical observation dossier
                </p>
                <h2
                  id="history-detail-title"
                  class="mt-1 text-lg font-extrabold text-[var(--wi-text)] sm:text-xl"
                >
                  Wildfire Record #{{ selectedRecord?.record_id ?? requestedRecordId }}
                </h2>
                <p class="mt-1 text-xs text-[var(--wi-muted)]">
                  Original environmental and geographical measurements · not a model prediction
                </p>
              </div>
            </div>
            <button
              type="button"
              class="flex shrink-0 items-center gap-2 rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-xs font-semibold text-[var(--wi-text)] hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[var(--wi-teal)]"
              aria-label="Close wildfire details"
              @click="closeRecordDetails"
            >
              <i class="pi pi-times" aria-hidden="true"></i
              ><span class="hidden sm:inline">Close</span>
            </button>
          </div>
        </header>

        <!-- Only this area scrolls; the list stays in its original position. -->
        <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          <div
            v-if="detailsLoading"
            role="status"
            class="flex min-h-48 items-center justify-center gap-3 text-sm text-[var(--wi-muted)]"
          >
            <i class="pi pi-spinner pi-spin text-[var(--wi-teal)]" aria-hidden="true"></i>
            Loading original wildfire measurements…
          </div>
          <div
            v-else-if="detailsError"
            role="alert"
            class="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
          >
            <i class="pi pi-exclamation-triangle mr-2" aria-hidden="true"></i>{{ detailsError }}
          </div>
          <div v-else-if="selectedRecord" class="space-y-5">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div class="wi-dossier-stat rounded-xl border border-[var(--wi-border)] p-4">
                <p class="text-[11px] font-semibold text-[var(--wi-muted)]">Recorded burned area</p>
                <p class="mt-2 text-2xl font-extrabold text-[var(--wi-orange)]">
                  {{ formatNumber(selectedRecord.burned_area_ha) }} <span class="text-sm">ha</span>
                </p>
              </div>
              <div class="wi-dossier-stat rounded-xl border border-[var(--wi-border)] p-4">
                <p class="text-[11px] font-semibold text-[var(--wi-muted)]">Country</p>
                <p class="mt-2 text-lg font-bold text-[var(--wi-text)]">
                  {{ selectedRecord.country }}
                </p>
              </div>
              <div class="wi-dossier-stat rounded-xl border border-[var(--wi-border)] p-4">
                <p class="text-[11px] font-semibold text-[var(--wi-muted)]">Observation date</p>
                <p class="mt-2 text-lg font-bold text-[var(--wi-text)]">
                  {{ formatDate(selectedRecord.date) }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <section
                v-for="group in measurementGroups"
                :key="group.title"
                class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] p-4"
              >
                <h3
                  class="mb-2 flex items-center gap-2 border-b border-[var(--wi-border)] pb-3 text-xs font-extrabold uppercase tracking-wide text-[var(--wi-text)]"
                >
                  <i
                    :class="['pi', group.icon]"
                    class="text-[var(--wi-teal)]"
                    aria-hidden="true"
                  ></i>
                  {{ group.title }}
                </h3>
                <dl class="divide-y divide-[var(--wi-border)]">
                  <div
                    v-for="field in group.fields"
                    :key="field.key"
                    class="flex items-start justify-between gap-4 py-2 text-xs"
                  >
                    <dt class="text-[var(--wi-muted)]">{{ field.label }}</dt>
                    <dd class="text-right font-semibold tabular-nums text-[var(--wi-text)]">
                      {{ detailValue(selectedRecord.measurements[field.key], field.unit) }}
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
            <p class="text-[11px] leading-5 text-[var(--wi-muted)]">
              Source: Original Mesogeos historical dataset. Values are observations, not XGBoost
              predictions. Land-cover columns are dataset indicators; missing values are shown as
              unavailable. Units are included only where established by the source column names.
            </p>
          </div>
        </div>
        <footer
          class="flex shrink-0 items-center justify-between gap-3 border-t border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-5 py-3 text-[11px] text-[var(--wi-muted)] sm:px-6"
        >
          <span
            ><i class="pi pi-database mr-1 text-[var(--wi-teal)]" aria-hidden="true"></i> Mesogeos
            research dataset</span
          >
          <span>Press Esc or Close to return to observations</span>
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.wi-history-modal {
  box-shadow: 0 28px 95px rgba(0, 0, 0, 0.45);
}
.wi-dossier-stat {
  background: var(--wi-surface-alt);
}

.history-select {
  width: 100%;
  min-width: 0;
  border-radius: 0.5rem;
  border: 1px solid var(--wi-border);
  background: var(--wi-surface-alt);
  color: var(--wi-text);
  padding: 0.55rem 0.65rem;
  font-size: 0.875rem;
  color-scheme: normal;
}
.history-select:focus-visible {
  outline: 2px solid var(--wi-teal);
  outline-offset: 1px;
}
.history-select:disabled {
  opacity: 0.6;
}

.severity-low {
  background: color-mix(in srgb, #f59e0b 13%, transparent);
  color: #d97706;
}

.severity-moderate {
  background: color-mix(in srgb, #f97316 13%, transparent);
  color: var(--wi-orange);
}

.severity-high {
  background: color-mix(in srgb, #ea580c 16%, transparent);
  color: #f97316;
}

.severity-extreme {
  background: color-mix(in srgb, #dc2626 14%, transparent);
  color: #ef4444;
}

/* Compact historical explorer filter toolbar */
.wi-history-filter-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-items: end;
}

.wi-history-filter-grid select {
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 6px 10px;
  font-size: 13px;
}

.wi-history-filter-grid label {
  display: block;
  font-size: 11px;
  margin-bottom: 5px;
}

.wi-history-filter-grid button {
  min-height: 38px;
  padding: 6px 12px;
  font-size: 13px;
}

/* Single-row toolbar on desktop */
@media (min-width: 1200px) {
  .wi-history-filter-grid {
    grid-template-columns:
      repeat(5, minmax(0, 1fr))
      minmax(160px, 1.2fr);
    gap: 10px;
  }
}

/* Three columns on medium screens */
@media (min-width: 768px) and (max-width: 1199px) {
  .wi-history-filter-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
