import { createRouter, createWebHistory } from 'vue-router'
import CommisionPage from '@/views/CommisionPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CommisionPage
    }
  ],
})

export default router
