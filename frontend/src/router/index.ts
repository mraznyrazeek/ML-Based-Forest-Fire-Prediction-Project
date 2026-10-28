
import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'overview',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'prediction',
          name: 'prediction',
          component: () => import('@/views/PredictionView.vue'),
        },
        {
          path: 'map',
          name: 'wildfire-map',
          component: () => import('@/views/WildfireMapView.vue'),
        },
        {
          path: 'history',
          name: 'historical-explorer',
          component: () => import('@/views/HistoricalExplorerView.vue'),
        },
        {
          path: 'analytics',
          name: 'environmental-analytics',
          component: () => import('@/views/EnvironmentalAnalyticsView.vue'),
        },
        {
          path: 'model-insights',
          name: 'model-insights',
          component: () => import('@/views/ModelInsightsView.vue'),
        },
      ],
    },
  ],
})

export default router
