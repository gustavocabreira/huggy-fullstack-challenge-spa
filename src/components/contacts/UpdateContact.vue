<template>
  <Dialog :isVisible="isDialogVisible" @update:isVisible="isDialogVisible = $event" @confirm="updateContact">
    <template v-slot:header>
      <h2>Editar contato</h2>
    </template>
    <template v-slot:body>
      <ContactForm :editingContact="contact" :errors="errors" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useContactStore } from '@/stores/useContactStore';

import Dialog from '@/components/ui/Dialog.vue';
import ContactForm from '@/components/contacts/ContactForm.vue';
import { useNotificationStore } from '@/stores/useNotifiactionStore';

const isDialogVisible = ref(false);

const contactStore = useContactStore();
const contact = computed(() => contactStore.selectedContact);

const notificationStore = useNotificationStore();
const { addNotification } = notificationStore;

const errors = ref({});

const updateContact = async () => {
  try {
    await contactStore.updateContact(contact.value);
    addNotification({
      title: 'Contato atualizado',
      message: 'Contato atualizado com sucesso',
      type: 'SUCCESS',
    });
    isDialogVisible.value = false;
  } catch (error) {
    errors.value = error.response?.data?.errors || {};
    console.error('Error updating contact:', error);
  }
};

const toggleDialogVisibility = () => {
  isDialogVisible.value = !isDialogVisible.value;
};

defineExpose({
  toggleVisible: toggleDialogVisibility,
});
</script>

