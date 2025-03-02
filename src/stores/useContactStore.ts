import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Contact } from '../types/Contact';
import client from '../services/http';

export const useContactStore = defineStore('contact', () => {
  const contacts = ref<Contact[]>([]);
  const currentPage = ref(1);
  const totalPages = ref(1);

  const fetchContacts = async (sortField: string = 'name', sortOrder: string = 'asc', page: number = 1, query: string = '') => {
    try {
      sortField = sortField ? sortField : 'name';
      sortOrder = sortOrder ? sortOrder : 'asc';

      const response = await client.get('contacts', {
        params: {
          order_by: sortField,
          direction: sortOrder,
          page,
          per_page: 10,
          query: query,
        }
      });

      contacts.value = response.data.data;
      currentPage.value = response.data.meta.current_page;
      totalPages.value = response.data.meta.last_page;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return {
    contacts,
    currentPage,
    totalPages,
    fetchContacts,
  };
});