<template>
  <div class="mx-auto w-full max-w-6xl min-h-screen overflow-x-hidden">
    <header class="py-4 w-full">
      <h2>Contatos</h2>
    </header>

    <Container class="w-full">
      <div class="flex items-center justify-between gap-8 p-4">
        <SearchInput v-model="searchQuery" />
        <div class="flex items-center gap-8">
          <Button icon="add" color="primary" @click="toggleContactDialog">Adicionar contato</Button>
          <Icon icon="report"></Icon>
        </div>
      </div>

      <Table ref="table" :query="searchQuery" />
    </Container>

    <CreateUpdateContact ref="createUpdateContact"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Button from '@/components/ui/Button.vue';
import Container from '@/components/ui/Container.vue';
import Table from '@/components/contacts/ContactTable.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import Icon from '@/components/ui/Icon.vue';
import CreateUpdateContact from '@/components/contacts/CreateUpdateContact.vue';

const searchQuery = ref('');

const createUpdateContact = ref(null);

const toggleContactDialog = () => {
  createUpdateContact?.value?.toggleVisible();
};
</script>