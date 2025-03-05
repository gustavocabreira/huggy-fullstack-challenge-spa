<template>
  <Card class="rounded-lg overflow-x-hidden">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-4">
      <SearchInput class="w-full md:w-1/3" v-model="searchQuery" />
      <div class="flex items-center justify-between md:justify-end gap-8 w-full">
        <Button icon="add" color="primary" @click="toggleContactDialog">Adicionar contato</Button>
        <router-link :to="{ name: 'Reports' }">
          <Icon type="a" page="Reports" icon="report"></Icon>
        </router-link>
      </div>
    </div>

    <ContactTable ref="table" :query="searchQuery" />
  </Card>

  <CreateContact ref="createContact" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import ContactTable from '@/components/contacts/ContactTable.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import Icon from '@/components/ui/Icon.vue';
import CreateContact from '@/components/contacts/CreateContact.vue';

const searchQuery = ref('');

const createContact = ref(null);

const toggleContactDialog = () => {
  createContact?.value?.toggleVisible();
};
</script>