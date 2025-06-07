import { createRouter, createWebHistory } from 'vue-router'
import Workspace from '../views/Workspace.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Workspace,
    }
  ],
})

export default router
