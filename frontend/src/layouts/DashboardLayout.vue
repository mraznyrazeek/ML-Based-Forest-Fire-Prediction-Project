
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
  <div class="min-h-screen bg-[var(--wi-canvas)] text-[var(--wi-text)]">
    <!-- Mobile top bar -->
    <header
      class="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:hidden"
    >
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--wi-navy)]">
          <i class="pi pi-bolt text-lg text-[var(--wi-orange)]" aria-hidden="true"></i>
        </div>
        <span class="font-bold">Wildfire Intelligence</span>
      </div>

      <button
        type="button"
        class="rounded-lg border border-slate-200 px-3 py-2"
        aria-label="Toggle navigation"
        :aria-expanded="sidebarOpen"
        @click="sidebarOpen = !sidebarOpen"
      >
        <i class="pi pi-bars" aria-hidden="true"></i>
      </button>
    </header>

    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-slate-950/60 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Scientific sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-hidden
             bg-[var(--wi-navy)] text-slate-200 shadow-xl
             transition-transform duration-200 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Subtle decorative glow -->
      <div
        class="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72
               rounded-full bg-teal-500/10 blur-3xl"
      ></div>

      <!-- Branding -->
      <div class="relative border-b border-white/10 px-6 py-7">
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center
                   rounded-2xl bg-orange-500/10 ring-1 ring-orange-400/20"
          >
            <i
              class="pi pi-bolt text-2xl text-[var(--wi-orange)]"
              aria-hidden="true"
            ></i>
          </div>

          <div>
            <h1 class="text-lg font-bold leading-tight text-white">
              Wildfire Intelligence
            </h1>
            <p class="mt-1 text-xs text-slate-400">
              Burned Area Prediction
            </p>
          </div>
        </div>

        <div class="mt-5 flex items-center gap-2">
          <span class="h-1.5 w-1.5 rounded-full bg-teal-400"></span>
          <span class="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">
            Scientific Research Platform
          </span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="relative flex-1 space-y-1 overflow-y-auto px-3 py-6" aria-label="Main navigation">
        <RouterLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          class="group flex items-center gap-3 rounded-xl border-l-[3px]
                 border-transparent px-4 py-3.5 text-sm font-medium
                 text-slate-300 transition-all duration-200
                 hover:bg-white/5 hover:text-white"
          exact-active-class="!border-[var(--wi-orange)] !bg-orange-500/15 !text-orange-300"
          @click="sidebarOpen = false"
        >
          <i
            :class="item.icon"
            class="text-base transition-colors group-hover:text-orange-300"
            aria-hidden="true"
          ></i>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <!-- Sidebar footer -->
      <div class="relative border-t border-white/10 p-4">
        <div
          class="rounded-xl border border-teal-400/15 bg-white/5 px-4 py-3"
        >
          <div class="flex items-center gap-3">
            <i class="pi pi-database text-lg text-teal-400" aria-hidden="true"></i>
            <div>
              <p class="text-xs text-slate-400">Machine Learning Research</p>
              <p class="mt-1 text-sm font-semibold text-white">
                XGBoost Prediction Engine
              </p>
            </div>
          </div>
        </div>

        <p class="mt-3 text-center text-[11px] text-slate-500">
          Research Prototype · v1.0
        </p>
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

