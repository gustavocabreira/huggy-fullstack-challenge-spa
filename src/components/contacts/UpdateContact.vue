<template>
  <Dialog :isVisible="isDialogVisible" @update:isVisible="handleDialogClose" @confirm="updateContact">
    <template v-slot:header>
      <h2>Editar contato</h2>
    </template>
    <template v-slot:body>
      <ContactForm :editingContact="contact" :errors="errors" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useContactStore } from '@/stores/useContactStore';

import Dialog from '@/components/ui/Dialog.vue';
import ContactForm from '@/components/contacts/ContactForm.vue';
import { useNotificationStore } from '@/stores/useNotificationStore';

const isDialogVisible = ref(false);

const contactStore = useContactStore();
const contact = ref({ ...contactStore.selectedContact });
const contactBackup = ref({});

const notificationStore = useNotificationStore();
const { addNotification } = notificationStore;

const errors = ref({});

watch(isDialogVisible, (visible) => {
  if (visible) {
    contactBackup.value = { ...contactStore.selectedContact };
    contact.value = { ...contactStore.selectedContact };
  }
});

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

const handleDialogClose = (event: boolean) => {
  if (!event) {
    contact.value = { ...contactBackup.value };
  }
  isDialogVisible.value = event;
};

const toggleDialogVisibility = () => {
  isDialogVisible.value = !isDialogVisible.value;
};

defineExpose({
  toggleVisible: toggleDialogVisibility,
});
</script>
