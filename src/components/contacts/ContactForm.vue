<template>
  <form>
    <div class="flex flex-col space-y-5">
      <ImageUploader :maxSize="2048" :acceptedMimeTypes="['image/jpeg', 'image/png']" @update:photo="updatePhoto" :defaultPhoto="contact.photo_url" :hasPhoto="!!contact.photo" :text="contact.name" />
      <div class="flex flex-col md:flex-row gap-2 space-y-5 md:space-y-0">
        <Input
          label="Nome"
          type="text"
          id="name"
          v-model="contact.name"
          :error="errors['name']"
          placeholder="Nome completo"
          class="w-full md:w-1/2" />
        <Input
          label="Data de Nascimento"
          type="text"
          id="date_of_birth"
          v-model="contact.date_of_birth"
          placeholder="Data de Nascimento"
          class="w-full md:w-1/2" />
      </div>
      <Input
        label="Email"
        type="email"
        id="email"
        v-model="contact.email"
        :error="errors['email']"
        placeholder="Email"
        class="w-full" />
      <div class="flex flex-col md:flex-row gap-2 space-y-5 md:space-y-0">
        <Input
          label="Telefone"
          type="text"
          id="phone_number"
          v-model="contact.phone_number"
          :error="errors['phone_number']"
          placeholder="Telefone"
          class="w-full md:w-1/2" />
        <Input
          label="Celular"
          type="text"
          id="cellphone_number"
          v-model="contact.cellphone_number"
          :error="errors['cellphone_number']"
          placeholder="Celular"
          class="w-full md:w-1/2" />
      </div>
      <div class="flex flex-col md:flex-row gap-2 space-y-5 md:space-y-0">
        <Input
          label="CEP"
          type="text"
          id="zip_code"
          v-model="contact.zip_code"
          :error="errors['zip_code']"
          placeholder="CEP"
          class="w-full md:w-1/4" />
        <Input
          label="Endereço"
          type="text"
          id="address"
          v-model="contact.address"
          :error="errors['address']"
          placeholder="Endereço"
          class="w-full md:w-3/4" />
      </div>
      <div class="flex flex-col md:flex-row gap-2 space-y-5 md:space-y-0">
        <Input
          label="Bairro"
          type="text"
          id="district"
          v-model="contact.district"
          :error="errors['district']"
          placeholder="Bairro"
          class="w-full md:w-1/2" />
        <Input
          label="Cidade"
          type="text"
          id="city"
          v-model="contact.city"
          :error="errors['city']"
          placeholder="Cidade"
          class="w-full md:w-1/2" />
      </div>
      <div class="flex flex-col md:flex-row gap-2 space-y-5 md:space-y-0">
        <Input
          label="Estado"
          type="text"
          id="state"
          v-model="contact.state"
          :error="errors['state']"
          placeholder="Estado"
          class="w-full md:w-1/2" />
        <Input
          label="País"
          type="text"
          id="country"
          v-model="contact.country"
          :error="errors['country']"
          placeholder="País"
          class="w-full md:w-1/2" />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import ImageUploader from '@/components/ui/ImageUploader.vue';
import Input from '@/components/ui/Input.vue';
import type { Contact } from '../../types/Contact';
import { ref } from 'vue';

const props = defineProps({
  editingContact: {
    type: Object as () => Contact,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  }
});

const contact = ref<Contact>(props.editingContact);

const updatePhoto = (file: File) => {
  contact.value.uploaded_photo = file; 
};
</script>
