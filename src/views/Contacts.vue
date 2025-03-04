<template>
  <div class="mx-auto flex flex-col items-center min-h-screen overflow-x-hidden">
    <Container class="w-full">
      <header class="py-4 w-full flex items-center">
        <h2>Contatos</h2>
      </header>
      <Card class="rounded-lg overflow-x-hidden">
        <div class="flex items-center justify-between gap-8 p-4">
          <SearchInput v-model="searchQuery" />
          <div class="flex items-center gap-8">
            <Button icon="add" color="primary" @click="toggleContactDialog">Adicionar contato</Button>
            <Icon icon="report"></Icon>
          </div>
        </div>

        <Table ref="table" :query="searchQuery" />
      </Card>
    </Container>

    <CreateContact ref="createContact" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Container from '@/components/ui/Container.vue';
import Table from '@/components/contacts/ContactTable.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import Icon from '@/components/ui/Icon.vue';
import CreateContact from '@/components/contacts/CreateContact.vue';

const searchQuery = ref('');

const createContact = ref(null);

const toggleContactDialog = () => {
  createContact?.value?.toggleVisible();
};
</script>