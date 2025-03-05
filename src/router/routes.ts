import Login from "@/views/auth/Login.vue";
import Contacts from "@/views/Contacts.vue";
import AppLayout from "@/views/layouts/AppLayout.vue";
import Reports from "@/views/Reports.vue";

export default [
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
    }
  },
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Contacts',
        component: Contacts,
        meta: {
          title: 'Contatos',
        }
      },
      {
        path: 'reports',
        name: 'Reports',
        component: Reports,
        meta: {
          title: 'Relatórios',
        },
      },
    ],
  }
];