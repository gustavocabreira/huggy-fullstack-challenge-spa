import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types/User';
import client from '@/services/http';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  function setUser(userData: User, accessToken: string) {
    user.value = userData;
    localStorage.setItem('access_token', JSON.stringify(accessToken));
  }

  async function logout() {
    user.value = null;
    await localStorage.removeItem('access_token');
    router.push({
      name: 'Login',
    });
  }

  function getUser() {
    const accessToken = localStorage.getItem('access_token')?.replaceAll(`"`, '');

    client.get('me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      setUser(response.data, accessToken as string);
    })
    .catch(error => {
      logout();
    })
  }

  return { user, isAuthenticated, setUser, logout, getUser };
});
