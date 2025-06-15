import { createRouter, createWebHistory } from 'vue-router'
import Workspace from '../views/Workspace.vue'
import Bench from '../views/Bench.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Workspace,
    },
    {
      path: '/bench',
      name: 'bench',
      component: Bench,
    }
  ],
})

export default router
