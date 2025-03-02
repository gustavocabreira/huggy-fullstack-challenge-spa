import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Contacts from "../views/Contacts.vue";
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
        name: 'Contacts',
        component: Contacts,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;