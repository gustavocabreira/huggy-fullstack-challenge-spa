import Login from "@/views/auth/Login.vue";
import Contacts from "@/views/Contacts.vue";
import AppLayout from "@/views/layouts/AppLayout.vue";

export default [
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
];