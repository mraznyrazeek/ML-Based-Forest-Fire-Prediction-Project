<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const sidebarOpen = ref(false)

// Centralized global theme manager
const { theme, toggleTheme } = useTheme()

const navigation = [
  {
    label: 'Overview',
    path: '/',
    icon: 'pi pi-home',
  },
  {
    label: 'Burned Area Prediction',
    path: '/prediction',
    icon: 'pi pi-chart-line',
  },
  {
    label: 'Wildfire Map',
    path: '/map',
    icon: 'pi pi-map',
  },
  {
    label: 'Historical Wildfires',
    path: '/history',
    icon: 'pi pi-calendar',
  },
  {
    label: 'Environmental Analytics',
    path: '/analytics',
    icon: 'pi pi-chart-bar',
  },
  {
    label: 'Model Insights',
    path: '/model-insights',
    icon: 'pi pi-cog',
  },
  {
    label: 'Scientific Research',
    path: '/research',
    icon: 'pi pi-book',
  },
]
</script>

<template>
  <div class="min-h-screen bg-[var(--wi-canvas)] text-[var(--wi-text)]">
    <!-- Mobile top bar -->
    <header
      class="flex items-center justify-between border-b border-[var(--wi-border)] bg-[var(--wi-surface)] px-5 py-4 lg:hidden"
    >
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-[#071827]">
          <img
            src="/wildfire-intelligence-icon.png"
            alt="Wildfire Intelligence logo"
            class="h-full w-full object-cover"
          />
        </div>

        <span class="font-bold text-[var(--wi-text)]"> Wildfire Intelligence </span>
      </div>

      <button
        type="button"
        class="rounded-lg border border-[var(--wi-border)] px-3 py-2 text-[var(--wi-text)] transition-colors hover:bg-[var(--wi-surface-alt)]"
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
    ></div>

    <!-- Main sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-hidden bg-[#071827] text-slate-200 shadow-xl transition-transform duration-200 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Subtle background decoration -->
      <div
        class="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"
      ></div>

      <!-- Branding -->
      <div class="relative border-b border-white/10 px-6 py-7">
        <!-- Application identity -->
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 shrink-0 overflow-hidden rounded-2xl ring-1 ring-orange-400/20">
            <img
              src="/wildfire-intelligence-icon.png"
              alt="Wildfire Intelligence logo"
              class="h-full w-full object-cover"
            />
          </div>

          <div class="min-w-0">
            <h1 class="text-lg font-bold leading-tight text-white">Wildfire Intelligence</h1>

            <p class="mt-1 text-xs text-slate-400">Burned Area Prediction</p>
          </div>
        </div>

        <!-- Machine Learning Research identity -->

        <!-- Compact Machine Learning Research identity -->
        <div class="mt-4 flex items-center gap-2.5 border-t border-white/10 pt-4">
          <i class="pi pi-database shrink-0 text-sm text-teal-400" aria-hidden="true"></i>

          <div class="min-w-0">
            <p class="text-[10px] font-medium leading-4 text-teal-300">Machine Learning Research</p>

            <p class="mt-0.5 text-xs font-semibold leading-4 text-white">
              XGBoost Prediction Platform
            </p>
          </div>
        </div>
      </div>

      <!-- Sidebar navigation -->
      <nav class="relative flex-1 space-y-1 overflow-y-auto px-3 py-6" aria-label="Main navigation">
        <RouterLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          class="group flex items-center gap-3 rounded-xl border-l-[3px] border-transparent px-4 py-3.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-white"
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

      <!-- Sidebar footer: appearance only -->
      <div class="relative border-t border-white/10 p-4">
        <div
          class="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
        >
          <div class="flex items-center gap-3">
            <i
              :class="theme === 'dark' ? 'pi pi-moon' : 'pi pi-sun'"
              class="text-base text-orange-300"
              aria-hidden="true"
            ></i>

            <div>
              <p class="text-sm font-semibold text-white">Appearance</p>

              <p class="text-xs text-slate-400">
                {{ theme === 'dark' ? 'Dark mode' : 'Light mode' }}
              </p>
            </div>
          </div>

          <!-- Light / Dark mode switch -->
          <button
            type="button"
            role="switch"
            :aria-checked="theme === 'dark'"
            :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            class="relative h-7 w-12 shrink-0 cursor-pointer rounded-full border border-white/15 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            :class="theme === 'dark' ? 'bg-orange-500' : 'bg-slate-500'"
            @click="toggleTheme"
          >
            <span
              class="absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200"
              :class="theme === 'dark' ? 'translate-x-5' : 'translate-x-0'"
            >
              <i
                :class="theme === 'dark' ? 'pi pi-moon' : 'pi pi-sun'"
                class="text-[10px] text-slate-800"
                aria-hidden="true"
              ></i>
            </span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main application content -->
    <main class="min-h-screen lg:ml-72">
      <div class="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <RouterView />
      </div>
    </main>
  </div>
</template>
