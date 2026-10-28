<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  getWildfireMapRecords,
  type WildfireMapRecord,
  type WildfireMapFilters,
} from '@/services/wildfireMapService'

const mapContainer = ref<HTMLElement | null>(null)
const records = ref<WildfireMapRecord[]>([])
const matchingCount = ref(0)
const loading = ref(false)
const error = ref('')
const applied = ref(false)

const year = ref('')
const country = ref('')
const minArea = ref('0')
const limit = ref('2000')
const yearOptions = Array.from({ length: 17 }, (_, index) => 2022 - index)
// Natural Earth naming may differ slightly. The API also supports 'Unassigned'.
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

let map: L.Map | null = null
let markerLayer: L.LayerGroup | null = null
let active = false
let requestCounter = 0

const displayCount = computed(() => records.value.length)
const meanArea = computed(() =>
  displayCount.value
    ? records.value.reduce((sum, item) => sum + item.burned_area_ha, 0) / displayCount.value
    : 0,
)
const largestArea = computed(() =>
  records.value.reduce((max, item) => Math.max(max, item.burned_area_ha), 0),
)
const largeCount = computed(() => records.value.filter((item) => item.burned_area_ha >= 500).length)
const recordYears = computed(() => new Set(records.value.map((item) => item.year)).size)
const hasFilter = computed(() =>
  Boolean(year.value || country.value || Number(minArea.value) > 0 || limit.value !== '2000'),
)

function number(value: number) {
  return value.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

function classLabel(area: number) {
  if (area >= 2000) return '2,000+ ha'
  if (area >= 500) return '500–1,999 ha'
  if (area >= 100) return '100–499 ha'
  return 'Under 100 ha'
}

function markerColor(area: number) {
  return area >= 2000 ? '#B91C1C' : area >= 500 ? '#EA580C' : area >= 100 ? '#F97316' : '#F59E0B'
}

function popup(record: WildfireMapRecord): HTMLElement {
  // Construct nodes safely rather than interpolating API values into HTML.
  const root = document.createElement('div')
  root.className = 'wi-fire-popup'
  root.style.minWidth = '220px'
  const heading = document.createElement('div')
  heading.className = 'wi-fire-popup-title'
  heading.textContent = `Historical Wildfire #${record.record_id}`
  root.appendChild(heading)

  const area = document.createElement('div')
  area.className = 'wi-fire-popup-area'
  const areaCaption = document.createElement('div')
  areaCaption.className = 'wi-fire-popup-caption'
  areaCaption.textContent = `Recorded burned area · ${classLabel(record.burned_area_ha)}`
  const areaNumber = document.createElement('div')
  areaNumber.className = 'wi-fire-popup-number'
  areaNumber.textContent = `${number(record.burned_area_ha)} ha`
  area.append(areaCaption, areaNumber)
  root.appendChild(area)

  const details = [
    ['Country', record.country || 'Unassigned'],
    ['Date', record.date],
    ['Coordinates', `${record.latitude.toFixed(4)}, ${record.longitude.toFixed(4)}`],
    [
      'Temperature',
      record.temperature_c === null ? 'Not available' : `${record.temperature_c.toFixed(2)} °C`,
    ],
    [
      'Humidity',
      record.relative_humidity === null
        ? 'Not available'
        : `${record.relative_humidity.toFixed(2)}%`,
    ],
  ]
  for (const [label, value] of details) {
    const line = document.createElement('div')
    line.className = 'wi-fire-popup-line'
    const key = document.createElement('span')
    key.className = 'wi-fire-popup-key'
    key.textContent = label ?? ''
    const val = document.createElement('strong')
    val.className = 'wi-fire-popup-value'
    val.textContent = value ?? ''
    line.append(key, val)
    root.appendChild(line)
  }
  return root
}

async function applyFilters() {
  if (!map || !markerLayer) return
  const currentRequest = ++requestCounter
  error.value = ''
  loading.value = true
  const selectedYear = year.value ? Number(year.value) : undefined
  const selectedArea = Number(minArea.value)
  const selectedLimit = Number(limit.value)
  const filters: WildfireMapFilters = {
    ...(selectedYear === undefined ? {} : { year: selectedYear }),
    ...(country.value ? { country: country.value } : {}),
    ...(selectedArea > 0 ? { minArea: selectedArea } : {}),
    limit: selectedLimit,
  }
  try {
    const response = await getWildfireMapRecords(filters)
    if (!active || currentRequest !== requestCounter || !map || !markerLayer) return
    const valid = response.records.filter(
      (item) =>
        Number.isFinite(item.latitude) &&
        Number.isFinite(item.longitude) &&
        Number.isFinite(item.burned_area_ha),
    )
    markerLayer.clearLayers()
    records.value = valid
    matchingCount.value = response.total_matching_records
    for (const record of valid) {
      const color = markerColor(record.burned_area_ha)
      L.circleMarker([record.latitude, record.longitude], {
        radius: Math.min(13, 4 + Math.log10(record.burned_area_ha + 1) * 1.9),
        stroke: true,
        color,
        weight: 1.2,
        fillColor: color,
        fillOpacity: 0.58,
      })
        .bindPopup(popup(record), { maxWidth: 300 })
        .addTo(markerLayer)
    }
    if (valid.length) {
      map.fitBounds(
        L.latLngBounds(valid.map((item) => [item.latitude, item.longitude] as L.LatLngTuple)),
        {
          padding: [22, 22],
          maxZoom: 8,
        },
      )
    }
    applied.value = true
  } catch (cause) {
    if (active && currentRequest === requestCounter) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load wildfire observations.'
    }
  } finally {
    if (active && currentRequest === requestCounter) loading.value = false
  }
}

function resetFilters() {
  year.value = ''
  country.value = ''
  minArea.value = '0'
  limit.value = '2000'
  void applyFilters()
}

onMounted(() => {
  active = true
  if (!mapContainer.value) return
  map = L.map(mapContainer.value, {
    center: [39, 12],
    zoom: 5,
    zoomControl: false,
    preferCanvas: true,
  })
  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'Tiles &copy; Esri and its data providers',
      maxZoom: 18,
    },
  ).addTo(map)
  L.control.zoom({ position: 'bottomright' }).addTo(map)
  markerLayer = L.layerGroup().addTo(map)
  void applyFilters()
})

onBeforeUnmount(() => {
  active = false
  ++requestCounter
  markerLayer?.clearLayers()
  markerLayer = null
  map?.remove()
  map = null
})
</script>

<template>
  <div class="wi-observatory space-y-3">
    <!-- Compact laboratory-style title -->
    <header
      class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-5 py-4 shadow-sm"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)] text-[var(--wi-orange)]"
        >
          <i class="pi pi-map text-lg" aria-hidden="true"></i>
        </div>
        <div>
          <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--wi-orange)]">
            Geospatial research · Mesogeos
          </p>
          <h1 class="text-xl font-extrabold tracking-tight text-[var(--wi-text)]">
            Wildfire Observatory
          </h1>
        </div>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <span
          class="rounded-full bg-[var(--wi-surface-alt)] px-3 py-1.5 font-semibold text-[var(--wi-teal)]"
          >Historical observations</span
        >
        <span
          class="hidden rounded-full border border-[var(--wi-border)] px-3 py-1.5 text-[var(--wi-muted)] sm:inline-flex"
          >Mediterranean region</span
        >
      </div>
    </header>

    <!-- Compact KPIs, explicitly scoped to the returned sample -->
    <section class="grid grid-cols-2 gap-2 lg:grid-cols-4" aria-label="Wildfire map indicators">
      <div
        class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-4 py-3 shadow-sm"
      >
        <p class="text-[10px] font-bold uppercase tracking-wider text-[var(--wi-muted)]">
          Displayed observations
        </p>
        <div class="mt-1 flex items-baseline gap-1.5">
          <strong class="text-2xl text-[var(--wi-text)]">{{ number(displayCount) }}</strong
          ><span class="text-xs text-[var(--wi-muted)]">/ {{ number(matchingCount) }}</span>
        </div>
      </div>
      <div
        class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-4 py-3 shadow-sm"
      >
        <p class="text-[10px] font-bold uppercase tracking-wider text-[var(--wi-muted)]">
          Largest displayed fire
        </p>
        <div class="mt-1 flex items-baseline gap-1">
          <strong class="text-2xl text-[var(--wi-orange)]">{{ number(largestArea) }}</strong
          ><span class="text-xs text-[var(--wi-muted)]">ha</span>
        </div>
      </div>
      <div
        class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-4 py-3 shadow-sm"
      >
        <p class="text-[10px] font-bold uppercase tracking-wider text-[var(--wi-muted)]">
          Mean displayed area
        </p>
        <div class="mt-1 flex items-baseline gap-1">
          <strong class="text-2xl text-[var(--wi-teal)]">{{ number(meanArea) }}</strong
          ><span class="text-xs text-[var(--wi-muted)]">ha</span>
        </div>
      </div>
      <div
        class="rounded-xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-4 py-3 shadow-sm"
      >
        <p class="text-[10px] font-bold uppercase tracking-wider text-[var(--wi-muted)]">
          Large fires · ≥ 500 ha
        </p>
        <div class="mt-1 flex items-baseline gap-1.5">
          <strong class="text-2xl text-red-500">{{ number(largeCount) }}</strong
          ><span class="text-xs text-[var(--wi-muted)]">displayed</span>
        </div>
      </div>
    </section>

    <!-- Filter bar -->
    <section
      class="rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] px-4 py-3 shadow-sm"
      aria-label="Map filters"
    >
      <div class="grid grid-cols-2 items-end gap-3 lg:grid-cols-[1fr_1.3fr_1.2fr_1fr_auto_auto]">
        <div class="space-y-1">
          <label for="fire-year" class="block text-xs font-semibold text-[var(--wi-muted)]"
            >Year</label
          >
          <select
            id="fire-year"
            v-model="year"
            class="w-full rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-sm text-[var(--wi-text)] focus:border-[var(--wi-teal)] focus:outline-none"
          >
            <option value="">All years</option>
            <option v-for="value in yearOptions" :key="value" :value="String(value)">
              {{ value }}
            </option>
          </select>
        </div>
        <div class="space-y-1">
          <label for="fire-country" class="block text-xs font-semibold text-[var(--wi-muted)]"
            >Country</label
          >
          <select
            id="fire-country"
            v-model="country"
            class="w-full rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-sm text-[var(--wi-text)] focus:border-[var(--wi-teal)] focus:outline-none"
          >
            <option value="">All countries</option>
            <option v-for="value in countryOptions" :key="value" :value="value">{{ value }}</option>
          </select>
        </div>
        <div class="space-y-1">
          <label for="fire-area" class="block text-xs font-semibold text-[var(--wi-muted)]"
            >Minimum burned area</label
          >
          <select
            id="fire-area"
            v-model="minArea"
            class="w-full rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-sm text-[var(--wi-text)] focus:border-[var(--wi-teal)] focus:outline-none"
          >
            <option value="0">Any size</option>
            <option value="100">100+ ha</option>
            <option value="500">500+ ha</option>
            <option value="1000">1,000+ ha</option>
            <option value="2000">2,000+ ha</option>
          </select>
        </div>
        <div class="space-y-1">
          <label for="fire-limit" class="block text-xs font-semibold text-[var(--wi-muted)]"
            >Display limit</label
          >
          <select
            id="fire-limit"
            v-model="limit"
            class="w-full rounded-lg border border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-3 py-2 text-sm text-[var(--wi-text)] focus:border-[var(--wi-teal)] focus:outline-none"
          >
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="1000">1,000</option>
            <option value="2000">2,000</option>
          </select>
        </div>
        <button
          type="button"
          :disabled="loading"
          class="rounded-lg bg-[var(--wi-teal)] px-4 py-2 text-sm font-semibold text-[#071827] hover:opacity-90 disabled:opacity-50"
          @click="applyFilters"
        >
          <i class="pi pi-filter mr-1" aria-hidden="true"></i>Apply
        </button>
        <button
          type="button"
          :disabled="loading || !hasFilter"
          class="rounded-lg border border-[var(--wi-border)] px-4 py-2 text-sm font-semibold text-[var(--wi-muted)] hover:bg-[var(--wi-surface-alt)] disabled:opacity-40"
          @click="resetFilters"
        >
          Reset
        </button>
      </div>
      <p v-if="applied" class="mt-2 text-[11px] text-[var(--wi-muted)]">
        Showing the latest {{ number(displayCount) }} of {{ number(matchingCount) }} matching
        records. Summary metrics describe displayed observations only.
      </p>
    </section>

    <!-- Map: visual priority -->
    <section
      class="overflow-hidden rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] shadow-sm"
    >
      <div
        class="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--wi-border)] px-4 py-2.5"
      >
        <div>
          <h2 class="text-sm font-bold text-[var(--wi-text)]">Mediterranean Wildfire Geography</h2>
          <p class="text-[11px] text-[var(--wi-muted)]">
            Recorded burned area · select a marker for details
          </p>
        </div>
        <span
          class="rounded-full bg-[var(--wi-surface-alt)] px-3 py-1 text-[11px] font-bold text-[var(--wi-orange)]"
          >{{ number(recordYears) }} year{{ recordYears === 1 ? '' : 's' }} in display</span
        >
      </div>
      <div
        v-if="loading"
        role="status"
        class="border-b border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-4 py-2 text-xs text-[var(--wi-blue)]"
      >
        <i class="pi pi-spin pi-spinner mr-2"></i>Loading historical wildfire observations...
      </div>
      <div
        v-if="error"
        role="alert"
        class="border-b border-[var(--wi-border)] bg-[var(--wi-surface-alt)] px-4 py-2 text-xs text-red-500"
      >
        {{ error }}
      </div>
      <div
        ref="mapContainer"
        class="h-[550px] w-full bg-slate-100"
        aria-label="Interactive map of historical wildfire observations"
      ></div>
      <div
        class="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--wi-border)] px-4 py-2.5 text-[11px] text-[var(--wi-muted)]"
      >
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span class="font-semibold text-[var(--wi-text)]">Burned area</span>
          <span class="flex items-center gap-1.5"
            ><i class="h-2.5 w-2.5 rounded-full bg-amber-500"></i>Under 100 ha</span
          >
          <span class="flex items-center gap-1.5"
            ><i class="h-2.5 w-2.5 rounded-full bg-[var(--wi-surface-alt)]0"></i>100–499 ha</span
          >
          <span class="flex items-center gap-1.5"
            ><i class="h-2.5 w-2.5 rounded-full bg-orange-600"></i>500–1,999 ha</span
          >
          <span class="flex items-center gap-1.5"
            ><i class="h-2.5 w-2.5 rounded-full bg-red-700"></i>2,000+ ha</span
          >
        </div>
        <span class="text-[var(--wi-muted)]">Mesogeos · Historic observations</span>
      </div>
    </section>
    <p class="px-1 text-[11px] leading-5 text-[var(--wi-muted)]">
      Research prototype. Markers show recorded historical burned area, not predicted fire
      locations, risk or intensity. Country identification uses simplified Natural Earth boundaries;
      some coastal records may be unassigned.
    </p>
  </div>
</template>

<style>
/* Leaflet creates popup DOM outside Vue's scoped template styling. */
.wi-observatory .leaflet-popup-content-wrapper {
  background: var(--wi-surface);
  color: var(--wi-text);
  border: 1px solid var(--wi-border);
  border-radius: 14px;
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.22);
}

.wi-observatory .leaflet-popup-tip {
  background: var(--wi-surface);
}

.wi-observatory .leaflet-popup-content {
  margin: 14px;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}

.wi-observatory .leaflet-popup-close-button {
  color: var(--wi-muted) !important;
}

.wi-fire-popup-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--wi-text);
  margin-bottom: 8px;
}

.wi-fire-popup-area {
  background: var(--wi-surface-alt);
  border: 1px solid var(--wi-border);
  border-left: 3px solid var(--wi-orange);
  border-radius: 10px;
  padding: 10px 12px;
  margin-bottom: 10px;
}

.wi-fire-popup-caption {
  color: var(--wi-orange);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.wi-fire-popup-number {
  color: var(--wi-text);
  font-size: 20px;
  font-weight: 800;
  margin-top: 3px;
}

.wi-fire-popup-line {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 5px 0;
  border-bottom: 1px solid var(--wi-border);
  font-size: 12px;
}

.wi-fire-popup-line:last-child {
  border-bottom: none;
}
.wi-fire-popup-key {
  color: var(--wi-muted);
}
.wi-fire-popup-value {
  color: var(--wi-text);
  text-align: right;
}

.wi-observatory select {
  color-scheme: light;
}
:root[data-theme='dark'] .wi-observatory select {
  color-scheme: dark;
}

/* Leaflet controls and attribution are readable in both themes. */
.wi-observatory .leaflet-control-zoom a {
  background: var(--wi-surface);
  color: var(--wi-text);
  border-color: var(--wi-border);
}
.wi-observatory .leaflet-control-zoom a:hover {
  background: var(--wi-surface-alt);
  color: var(--wi-text);
}
</style>
