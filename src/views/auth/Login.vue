<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="flex flex-col items-center justify-center w-full">
      <div class="flex flex-col items-center justify-center w-full gap-8">
        <h1>Login</h1>
        <Button color="primary" :isLink="true" :href="authUrl">Fazer login com a Huggy</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import client from '@/services/http';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  axios.get(import.meta.env.VITE_API_URL + '/sanctum/csrf-cookie', {
    withCredentials: true,
    withXSRFToken: true,
  }).then(() => {
    if (route.query.access_token) {
      client.get('me', {
        withCredentials: true,
        withXSRFToken: true,
      }).then(() =>
        router.push({
          name: 'Contacts',
        })
      )
    }
  })
});

const authUrl = computed(() => `${import.meta.env.VITE_API_URL}/auth/huggy/redirect`);

</script>