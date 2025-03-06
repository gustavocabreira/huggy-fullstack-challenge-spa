import { defineStore } from 'pinia';
import { ref } from 'vue';
import client from '@/services/http';

export const useWebhookLogsStore = defineStore('contact', () => {
  const webhooks = ref([]);
  const currentPage = ref(1);
  const totalPages = ref(1);

  const fetchWebhooks = async (sortField: string = 'id', sortOrder: string = 'desc', page: number = 1, query: string = '') => {
    try {

      sortField = sortField ? sortField : 'id';
      sortOrder = sortOrder ? sortOrder : 'desc';

      const response = await client.get('webhooks', {
        params: {
          order_by: sortField,
          direction: sortOrder,
          page,
          per_page: 10,
          query: query,
        }
      })

      webhooks.value = response.data.data;
      currentPage.value = response.data.current_page;
      totalPages.value = response.data.last_page;
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  }

  return {
    webhooks,
    currentPage,
    totalPages,
    fetchWebhooks,
  }
});