
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const sidebarOpen = ref(false)

const navigation = [
  { label: 'Overview', path: '/', icon: 'pi pi-home' },
  { label: 'Burned Area Prediction', path: '/prediction', icon: 'pi pi-chart-line' },
  { label: 'Wildfire Map', path: '/map', icon: 'pi pi-map' },
  { label: 'Historical Wildfires', path: '/history', icon: 'pi pi-calendar' },
  { label: 'Environmental Analytics', path: '/analytics', icon: 'pi pi-chart-bar' },
  { label: 'Model Insights', path: '/model-insights', icon: 'pi pi-cog' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <!-- Mobile navigation toggle -->
    <header class="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
      <span class="font-bold">Wildfire Intelligence</span>

      <button
        type="button"
        class="rounded-lg border border-slate-200 px-3 py-2"
        aria-label="Toggle navigation"
        :aria-expanded="sidebarOpen"
        @click="sidebarOpen = !sidebarOpen"
      >
        ☰
      </button>
    </header>

    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-950 text-slate-200 transition-transform duration-200 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="border-b border-slate-800 px-6 py-7">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
          Research Platform
        </p>
        <h1 class="mt-2 text-xl font-bold leading-snug text-white">
          Wildfire Intelligence
        </h1>
        <p class="mt-1 text-sm text-slate-400">
          Burned Area Prediction System
        </p>
      </div>

      <nav class="flex-1 space-y-1 px-4 py-6" aria-label="Main navigation">
        <RouterLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white"
          active-class="bg-orange-500/15 text-orange-300"
          exact-active-class="bg-orange-500/15 text-orange-300"
          @click="sidebarOpen = false"
        >
          <i :class="item.icon" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="border-t border-slate-800 px-6 py-5">
        <p class="text-xs text-slate-500">Machine Learning Research</p>
        <p class="mt-1 text-sm text-slate-300">XGBoost Prediction Engine</p>
      </div>
    </aside>

    <!-- Main content -->
    <main class="min-h-screen lg:ml-72">
      <div class="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <RouterView />
      </div>
    </main>
  </div>
</template>
