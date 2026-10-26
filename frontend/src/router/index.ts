
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
      ],
    },
  ],
})

export default router
