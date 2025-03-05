import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Contact } from '@/types/Contact';
import client from '@/services/http';

export const useContactStore = defineStore('contact', () => {
  const contacts = ref<Contact[]>([]);
  const currentPage = ref(1);
  const totalPages = ref(1);

  const selectedContact = ref<Contact | null>(null);

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

  const createContact = async (contact: Contact) => {
    const formData = new FormData();

    const formattedContact = {
      ...contact,
      date_of_birth: contact.date_of_birth.split('/').reverse().join('-'),
      cellphone_number: contact.cellphone_number?.replace(/\D/g, ''),
      phone_number: contact.phone_number?.replace(/\D/g, ''),
    };

    Object.entries(formattedContact).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== 'uploaded_photo') {
        formData.append(key, value as string);
      }
    });

    if (contact.uploaded_photo) {
      formData.append('photo', contact.uploaded_photo);
    }

    const response = await client.post('contacts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    contacts.value.push(response.data);
  }

  const deleteContact = async (contact: Contact) => {
    try {
      await client.delete(`contacts/${contact.id}`);
      contacts.value = contacts.value.filter(c => c.id !== contact.id);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }

  const setSelectedContact = (contact: Contact) => {
    selectedContact.value = contact;
  };

  const findContactById = async (id: number) => {
    try {
      const response = await client.get(`contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  }

  const updateContact = async (contact: Contact) => {
    const formData = new FormData();

    const formattedContact = {
      ...contact,
      date_of_birth: contact.date_of_birth.split('/').reverse().join('-'),
      cellphone_number: contact.cellphone_number?.replace(/\D/g, ''),
      phone_number: contact.phone_number?.replace(/\D/g, ''),
    };

    Object.entries(formattedContact).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== 'uploaded_photo') {
        formData.append(key, value as string);
      }
    });

    if (contact.uploaded_photo) {
      formData.append('photo', contact.uploaded_photo);
    } else {
      formData.delete('photo');
    }

    const response = await client.put(`contacts/${contact.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const contactIndex = contacts.value.findIndex(c => c.id === contact.id);
    
    if (contactIndex !== -1) {
      contacts.value[contactIndex] = response.data;
      setSelectedContact(contacts.value[contactIndex]);
    }
  };


  return {
    contacts,
    currentPage,
    totalPages,
    selectedContact,
    fetchContacts,
    deleteContact,
    createContact,
    setSelectedContact,
    findContactById,
    updateContact,
  };
});