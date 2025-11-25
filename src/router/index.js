import { createRouter, createWebHistory } from "vue-router";
import Workspace from "../views/Workspace.vue";
import Bench from "../views/Bench.vue";
import Local from "../views/Local.vue";
import CanvasTest from "../views/CanvasTest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Workspace,
    },
    {
      path: "/bench",
      name: "bench",
      component: Bench,
    },
    {
      path: "/local",
      name: "local",
      component: Local,
    },
    {
      path: "/canvas",
      name: "canvas",
      component: CanvasTest,
    },
  ],
});

export default router;
