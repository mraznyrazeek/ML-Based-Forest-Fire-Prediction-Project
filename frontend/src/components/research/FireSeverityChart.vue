<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LogarithmicScale,
  Legend,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { useTheme } from '@/composables/useTheme'

ChartJS.register(LineElement, PointElement, CategoryScale, LogarithmicScale, Legend, Tooltip)

const { theme } = useTheme()

const darkMode = computed(() => theme.value === 'dark')

const colors = computed(() => ({
  text: darkMode.value ? '#edf4fc' : '#102238',
  muted: darkMode.value ? '#9dafc6' : '#62758d',
  grid: darkMode.value ? 'rgba(157,175,198,0.14)' : 'rgba(98,117,141,0.14)',
  orange: darkMode.value ? '#fb923c' : '#f36b21',
  teal: darkMode.value ? '#2dd4bf' : '#008f87',
}))

// Mean values documented in the Final Model
// Improvement Experiments notebook.
const severity = [
  { label: '30–100', actual: 58.14, predicted: 144.35 },
  { label: '101–500', actual: 222.15, predicted: 200.21 },
  { label: '501–5,000', actual: 1301.07, predicted: 293.62 },
  { label: '5,001–10,000', actual: 7128.47, predicted: 494.17 },
  { label: '>10,000', actual: 16222.8, predicted: 610.49 },
]

const chartData = computed<ChartData<'line'>>(() => ({
  labels: severity.map((row) => row.label),
  datasets: [
    {
      label: 'Observed mean',
      data: severity.map((row) => row.actual),
      borderColor: colors.value.orange,
      backgroundColor: colors.value.orange,
      pointBackgroundColor: colors.value.orange,
      pointBorderColor: colors.value.orange,
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 9,
      tension: 0.25,
      fill: false,
    },
    {
      label: 'Predicted mean',
      data: severity.map((row) => row.predicted),
      borderColor: colors.value.teal,
      backgroundColor: colors.value.teal,
      pointBackgroundColor: colors.value.teal,
      pointBorderColor: colors.value.teal,
      borderDash: [7, 5],
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 9,
      tension: 0.25,
      fill: false,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    mode: 'index',
    intersect: false,
  },

  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        color: colors.value.text,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 24,
        font: { size: 12 },
      },
    },

    tooltip: {
      backgroundColor: darkMode.value ? '#13263b' : '#ffffff',
      titleColor: colors.value.text,
      bodyColor: colors.value.muted,
      borderColor: colors.value.grid,
      borderWidth: 1,
      padding: 14,
      callbacks: {
        title: (items) => `Actual fire-size group: ${items[0]?.label ?? ''} ha`,
        label: (context) => {
          const value = Number(context.parsed.y ?? 0)
          return `${context.dataset.label}: ${value.toLocaleString('en-US', {
            maximumFractionDigits: 2,
          })} ha`
        },
      },
    },
  },

  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: colors.value.muted,
        maxRotation: 35,
      },
      title: {
        display: true,
        text: 'Observed wildfire-size category (ha)',
        color: colors.value.muted,
        padding: 14,
      },
    },

    y: {
      type: 'logarithmic',
      min: 10,
      max: 30000,
      grid: {
        color: colors.value.grid,
      },
      ticks: {
        color: colors.value.muted,
        callback: (value) => {
          const number = Number(value)
          return [10, 100, 1000, 10000].includes(number) ? number.toLocaleString('en-US') : ''
        },
      },
      title: {
        display: true,
        text: 'Mean burned area (ha) · logarithmic scale',
        color: colors.value.muted,
      },
    },
  },
}))
</script>

<template>
  <div class="w-full">
    <div class="relative h-[340px] w-full sm:h-[430px]">
      <Line :key="theme" :data="chartData" :options="chartOptions" />
    </div>

    <p class="mt-5 text-xs leading-6 text-[var(--wi-text-muted)]">
      Figure 01. Mean observed and predicted burned area across categories defined by actual
      wildfire size. Values are taken from the optimized XGBoost experiments. The vertical axis uses
      logarithmic scaling. Points represent group means, not individual observations, and connecting
      lines are visual guides rather than continuous estimates.
    </p>
  </div>
</template>
