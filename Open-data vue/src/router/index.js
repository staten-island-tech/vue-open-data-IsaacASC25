import { createRouter, createWebHistory } from 'vue-router'
import {LEPLanguages} from '../views/LEPLanguages.vue'
import {LEPPopulation} from '../views/LEPPopulation.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LEPLanguages,
    },
    {
      path: '/LEPPopulation',
      name: 'home',
      component: LEPPopulation,
    },
  ],
})

export default router
