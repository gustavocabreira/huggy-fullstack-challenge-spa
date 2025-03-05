<template>
  <div class="flex flex-col items-center justify-center p-4 min-h-2/3 gap-4">
    <img :src="noContactImage" alt="No Contacts" />
    <span class="body-2 text-gray-500 font-normal">Ainda não há contatos</span>
    <Button class="mt-4" icon="add" color="primary" @click="toggleContactDialog">Adicionar contato</Button>
  </div>

  <CreateContact ref="createContact" @created="emitCreated" />
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import Button from '@/components/ui/Button.vue';
import noContactImage from '@/assets/images/no-contact.png';
import CreateContact from './CreateContact.vue';

const emit = defineEmits(['created']);

const emitCreated = () => {
  emit('created');
};

const createContact = ref(null);

const toggleContactDialog = () => {
  createContact?.value?.toggleVisible();
};
</script>