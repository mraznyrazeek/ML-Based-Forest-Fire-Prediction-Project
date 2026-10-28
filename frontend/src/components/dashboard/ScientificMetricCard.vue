<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value: string
    description: string
    icon?: string
    tone?: 'teal' | 'blue' | 'orange' | 'purple'
  }>(),
  {
    icon: 'pi pi-chart-bar',
    tone: 'teal',
  },
)

// Accent colors remain independent of light/dark mode.
// Card backgrounds, borders and text use global theme variables.
const tones = {
  teal: {
    icon: 'text-[var(--wi-teal)]',
    accent: 'bg-[var(--wi-teal)]',
  },
  blue: {
    icon: 'text-[var(--wi-blue)]',
    accent: 'bg-[var(--wi-blue)]',
  },
  orange: {
    icon: 'text-[var(--wi-orange)]',
    accent: 'bg-[var(--wi-orange)]',
  },
  purple: {
    icon: 'text-violet-500',
    accent: 'bg-violet-500',
  },
}
</script>

<template>
  <article
    class="relative overflow-hidden rounded-2xl border border-[var(--wi-border)] bg-[var(--wi-surface)] p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
  >
    <!-- Scientific accent line -->
    <div class="absolute inset-x-0 top-0 h-1" :class="tones[tone].accent"></div>

    <!-- Metric icon -->
    <div
      class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--wi-surface-alt)]"
      :class="tones[tone].icon"
    >
      <i :class="icon" class="text-xl" aria-hidden="true"></i>
    </div>

    <!-- Metric label -->
    <p class="text-sm font-medium text-[var(--wi-muted)]">
      {{ label }}
    </p>

    <!-- Metric value -->
    <p class="mt-2 text-3xl font-bold tracking-tight text-[var(--wi-text)]">
      {{ value }}
    </p>

    <!-- Metric description -->
    <p class="mt-3 text-sm leading-relaxed text-[var(--wi-muted)]">
      {{ description }}
    </p>
  </article>
</template>
