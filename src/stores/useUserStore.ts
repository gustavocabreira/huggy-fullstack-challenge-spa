import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '@/types/User';
import client from '@/services/http';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (userData: User) => {
    user.value = userData;
  }

  const logout = async () => {
    user.value = null;
    await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`);
    await client.post('logout')
    router.push({
      name: 'Login',
    });
  }

  const getUser = () => {

    client.get('me')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        logout();
      })
  }

  return { user, isAuthenticated, setUser, logout, getUser };
});
