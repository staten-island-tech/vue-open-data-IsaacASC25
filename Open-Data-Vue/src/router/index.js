import { createRouter, createWebHistory } from 'vue-router'
import LEPLanguages from '@/views/LEPLanguages.vue'
import LEPPopulation from '@/views/LEPPopulation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'lepLanguages',
      component: LEPLanguages,
    },
    {
      path: '/LEPPopulation',
      name: 'lepPopulation',
      component: LEPPopulation,
    },
  ],
})

export default router