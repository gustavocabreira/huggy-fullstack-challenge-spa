<template>
  <Dialog :isVisible="isDialogVisible" @update:isVisible="isDialogVisible = $event" :displayActionRow="false">
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Avatar :contact="contact" />
          <h2>{{ contact.name }}</h2>
        </div>
        <div class="flex items-center justify-between gap-4">
          <Icon icon="delete" @click="deleteContact"/>
          <Icon icon="edit" @click="showUpdateContact"/>
          <Icon icon="close" @click="isDialogVisible = false"/>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex flex-col gap-4">
        <ContactDetail label="Email" :value="contact.email" />
        <div class="flex items-center justify-between gap-4">
          <ContactDetail label="Telefone" :value="contact.phone_number" />
          <MakeCall v-if="!!contact.phone_number" :phoneNumber="contact.phone_number" label="Ligar para Telefone" />
        </div>
        <div class="flex items-center justify-between gap-4">
          <ContactDetail label="Celular" :value="contact.cellphone_number" />
          <MakeCall v-if="!!contact.cellphone_number" :phoneNumber="contact.cellphone_number" label="Ligar para Celular" />
        </div>
        <ContactDetail label="CEP" :value="contact.zip_code" />
        <ContactDetail label="Endereço" :value="contact.address" />
        <ContactDetail label="Bairro" :value="contact.district" />
        <ContactDetail label="Cidade" :value="contact.city" />
        <ContactDetail label="Estado" :value="contact.state" />
        <ContactDetail label="País" :value="contact.country" />
      </div>
    </template>
  </Dialog>

  <ConfirmDialog
    title="Excluir esse contato?"
    :isVisible="isConfirmVisible"
    @update:isVisible="isConfirmVisible = $event"
    @confirm="performDeleteRow" />

  <UpdateContact
    ref="updateContactDialog"/>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useContactStore } from '@/stores/useContactStore';
import type { Contact } from '@/types/Contact';
import Dialog from '@/components/ui/Dialog.vue';
import Avatar from '@/components/ui/Avatar.vue';
import Icon from '@/components/ui/Icon.vue';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';
import ContactDetail from '@/components/contacts/ContactDetail.vue';
import UpdateContact from '@/components/contacts/UpdateContact.vue';
import Button from '@/components/ui/Button.vue';
import MakeCall from '@/components/contacts/MakeCall.vue';

const isDialogVisible = ref(false);
const isConfirmVisible = ref(false);

const emit = defineEmits(['deleteContact']);

const contactsStore = useContactStore();
const contact: Contact = computed(() => contactsStore.selectedContact);

const updateContactDialog = ref(null);

const showUpdateContact = () => {
  updateContactDialog?.value?.toggleVisible();
};

const toggleVisible = () => {
  isDialogVisible.value = !isDialogVisible.value;
};

const deleteContact = () => {
  isConfirmVisible.value = true;
};

const performDeleteRow = async () => {
  isDialogVisible.value = false;
  emit('deleteContact', contactsStore.selectedContact);
};

const makeCall = (phoneNumber: string) => {
  console.log('makeCall', phoneNumber);
}

defineExpose({
  toggleVisible,
});
</script>
