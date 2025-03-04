import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import VueTheMask from 'vue-the-mask'

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(VueTheMask)
  .mount('#app')
