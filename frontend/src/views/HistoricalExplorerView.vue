<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import {
  getHistoricalWildfires,
  type HistoricalWildfireRecord,
  type HistoricalWildfireSortField,
  type HistoricalWildfireSortOrder,
} from '@/services/historicalWildfireService'

const records = ref<HistoricalWildfireRecord[]>([])
const loading = ref(false)
const error = ref('')

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

function burnedAreaClass(area: number): string {
  if (area >= 2000) return 'severity-extreme'
  if (area >= 500) return 'severity-high'
  if (area >= 100) return 'severity-moderate'
  return 'severity-low'
}

async function loadRecords(page = currentPage.value) {
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
              <td class="px-4 py-3 font-semibold text-[var(--wi-teal)]">#{{ record.record_id }}</td>

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
</template>

<style scoped>
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
