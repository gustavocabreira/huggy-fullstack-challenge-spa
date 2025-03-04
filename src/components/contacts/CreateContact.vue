<template>
  <Dialog :isVisible="isDialogVisible" @update:isVisible="isDialogVisible = $event" @confirm="storeContact">
    <template v-slot:header>
      <h2>Adicionar novo contato</h2>
    </template>
    <template v-slot:body>
      <ContactForm :editingContact="contact" :errors="errors" :editing="false"/>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Contact } from '@/types/Contact';
import { useContactStore } from '@/stores/useContactStore';
import Dialog from '@/components/ui/Dialog.vue';
import { useNotificationStore } from '@/stores/useNotificationStore';
import ContactForm from '@/components/contacts/ContactForm.vue';

const isDialogVisible = ref(false); 
const errors = ref({}); 
const contact = ref<Contact>(initializeContact()); 

const contactStore = useContactStore();
const { createContact } = contactStore; 

const notificationStore = useNotificationStore();
const { addNotification } = notificationStore;

function initializeContact(): Contact {
  return {
    id: 0,
    name: '',
    date_of_birth: '',
    email: '',
    cellphone_number: '',
    phone_number: '',
    address: '',
    district: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    photo: null,
    uploaded_photo: null,
  };
}

const clearForm = () => {
  contact.value = initializeContact();
  errors.value = {}; 
};

const storeContact = async () => {
  try {
    await createContact(contact.value); 
    addNotification({
      title: 'Contato adicionado',
      message: 'Contato adicionado com sucesso',
      type: 'SUCCESS',
    });

    clearForm(); 
    isDialogVisible.value = false; 
  } catch (error) {
    console.error('Error storing contact:', error);
    errors.value = error.response?.data?.errors || {}; 
  }
};

const updatePhoto = (file: File) => {
  contact.value.uploaded_photo = file; 
};

const toggleVisible = () => {
  clearForm(); 
  isDialogVisible.value = !isDialogVisible.value; 
};

defineExpose({
  toggleVisible,
});
</script>
