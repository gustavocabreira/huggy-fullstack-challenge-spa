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
          <Icon icon="edit"/>
          <Icon icon="close" @click="isDialogVisible = false"/>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex flex-col gap-4">
        <ContactDetail label="Email" :value="contact.email" />
        <ContactDetail label="Telefone" :value="contact.cellphone_number" />
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

const isDialogVisible = ref(false);
const isConfirmVisible = ref(false); 

const emit = defineEmits(['deleteContact']);

const contactsStore = useContactStore();
const contact: Contact = computed(() => contactsStore.selectedContact);

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

defineExpose({
  toggleVisible,
});
</script>
