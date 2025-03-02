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
import { useUserStore } from '@/stores/useUserStore';
import client from '@/services/http';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const login = (accessToken: string) => {
  client.get('me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(response => {
    userStore.setUser(response.data, accessToken);
    router.push({
      name: 'Contacts',
    })
  }).then(error => {
    alert(error.response.data.message);
  })
};

onMounted(() => {
  if (route.query.access_token) {
    login(route.query.access_token as string);
  }
});

const authUrl = computed(() => `${import.meta.env.VITE_API_URL}/auth/huggy/redirect`);

</script>