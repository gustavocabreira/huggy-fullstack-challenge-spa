<template>
  <Dialog :isVisible="isDialogVisible" @update:isVisible="isDialogVisible = $event" @confirm="storeContact">
    <template v-slot:header>
      <h2>Adicionar novo contato</h2>
    </template>
    <template v-slot:body>
      <form>
        <div class="flex flex-col space-y-5">
          <ImageUploader :maxSize="2048" :acceptedMimeTypes="['image/jpeg', 'image/png']" @update:photo="updatePhoto" />
          <div class="flex flex-col md:flex-row gap-2 space-y-5 md:space-y-0">
            <Input
              label="Nome"
              type="text"
              id="name"
              v-model="contact.name"
              placeholder="Nome completo"
              :error="errors['name']"
              class="w-full md:w-1/2" />
            <Input
              label="Data de Nascimento"
              type="text"
              id="date_of_birth"
              v-model="contact.date_of_birth"
              :error="errors['date_of_birth']"
              placeholder="Data de Nascimento"
              class="w-full md:w-1/2" />
          </div>
          <Input
            label="Email"
            type="email"
            id="email"
            v-model="contact.email"
            placeholder="Email"
            :error="errors['email']"
            class="w-full" />
          <div class="flex flex-col md:flex-row gap-2 space-y-5 md:space-y-0">
            <Input
              label="Telefone"
              type="text"
              id="phone_number"
              v-model="contact.phone_number"
              placeholder="Telefone"
              :error="errors['phone_number']"
              class="w-full md:w-1/2" />
            <Input
              label="Celular"
              type="text"
              id="cellphone_number"
              v-model="contact.cellphone_number"
              placeholder="Celular"
              :error="errors['cellphone_number']"
              class="w-full md:w-1/2" />
          </div>
          <div class="flex flex-col md:flex-row gap-2 space-y-5 md:space-y-0">
            <Input
              label="CEP"
              type="text"
              id="zip_code"
              v-model="contact.zip_code"
              placeholder="CEP"
              :error="errors['zip_code']"
              class="w-full md:w-1/4" />
            <Input
              label="Endereço"
              type="text"
              id="address"
              v-model="contact.address"
              placeholder="Endereço"
              :error="errors['address']"
              class="w-full md:w-3/4" />
          </div>
          <div class="flex flex-col md:flex-row gap-2 space-y-5 md:space-y-0">
            <Input
              label="Bairro"
              type="text"
              id="district"
              v-model="contact.district"
              placeholder="Bairro"
              :error="errors['district']"
              class="w-full md:w-1/2" />
            <Input
              label="Cidade"
              type="text"
              id="city"
              v-model="contact.city"
              placeholder="Cidade"
              :error="errors['city']"
              class="w-full md:w-1/2" />
          </div>
          <div class="flex flex-col md:flex-row gap-2 space-y-5 md:space-y-0">
            <Input
              label="Estado"
              type="text"
              id="state"
              v-model="contact.state"
              placeholder="Estado"
              :error="errors['state']"
              class="w-full md:w-1/2" />
            <Input
              label="País"
              type="text"
              id="country"
              v-model="contact.country"
              placeholder="País"
              :error="errors['country']"
              class="w-full md:w-1/2" />
          </div>
        </div>
      </form>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Contact } from '@/types/Contact';
import { useContactStore } from '@/stores/useContactStore';
import Input from '@/components/ui/Input.vue';
import Dialog from '@/components/ui/Dialog.vue';
import ImageUploader from '@/components/ui/ImageUploader.vue';
import { useNotificationStore } from '@/stores/useNotifiactionStore';

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
