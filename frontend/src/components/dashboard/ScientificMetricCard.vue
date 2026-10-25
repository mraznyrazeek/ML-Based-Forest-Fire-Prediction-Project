
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

const tones = {
  teal: {
    card: 'border-teal-200/80 bg-gradient-to-br from-white to-teal-50/80',
    icon: 'bg-teal-100 text-teal-700',
    accent: 'bg-teal-500',
  },
  blue: {
    card: 'border-blue-200/80 bg-gradient-to-br from-white to-blue-50/80',
    icon: 'bg-blue-100 text-blue-700',
    accent: 'bg-blue-500',
  },
  orange: {
    card: 'border-orange-200/80 bg-gradient-to-br from-white to-orange-50/80',
    icon: 'bg-orange-100 text-orange-700',
    accent: 'bg-orange-500',
  },
  purple: {
    card: 'border-violet-200/80 bg-gradient-to-br from-white to-violet-50/80',
    icon: 'bg-violet-100 text-violet-700',
    accent: 'bg-violet-500',
  },
}
</script>

<template>
  <article
    class="relative overflow-hidden rounded-2xl border p-6 shadow-sm
           transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    :class="tones[tone].card"
  >
    <div
      class="absolute inset-x-0 top-0 h-1"
      :class="tones[tone].accent"
    ></div>

    <div
      class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
      :class="tones[tone].icon"
    >
      <i :class="icon" class="text-xl" aria-hidden="true"></i>
    </div>

    <p class="text-sm font-medium text-[var(--wi-muted)]">
      {{ label }}
    </p>

    <p class="mt-2 text-3xl font-bold tracking-tight text-[var(--wi-text)]">
      {{ value }}
    </p>

    <p class="mt-3 text-sm leading-relaxed text-slate-600">
      {{ description }}
    </p>
  </article>
</template>
