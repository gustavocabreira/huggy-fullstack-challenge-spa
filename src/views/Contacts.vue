<template>
  <Card class="rounded-lg overflow-x-hidden">
    <div class="flex items-center justify-between gap-8 p-4">
      <SearchInput v-model="searchQuery" />
      <div class="flex items-center gap-8">
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
import { useRoute } from 'vue-router';

const searchQuery = ref('');

const createContact = ref(null);

const toggleContactDialog = () => {
  createContact?.value?.toggleVisible();
};
</script>