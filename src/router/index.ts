import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Home from "../views/Home.vue";
import AppLayout from "../views/layouts/AppLayout.vue";

const routes = [
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;