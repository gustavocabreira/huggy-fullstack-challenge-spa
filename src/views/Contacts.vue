<template>
  <div class="mx-auto w-full max-w-6xl min-h-screen overflow-x-hidden">
    <header class="py-4 w-full">
      <h2>Contatos</h2>
    </header>

    <Container class="w-full">
      <div class="flex items-center justify-between gap-8 p-4">
        <input
          type="text"
          placeholder="Nome"
          class="border rounded p-2"
          v-model="searchQuery"
        />
        <Button icon="add" color="primary">Adicionar contato</Button>
      </div>

      <Table :columns="tableColumns" :items="tableItems" :getData="getData" :pagination="tablePagination">
        <template v-slot:name="{ row }">
          <div class="flex items-center gap-4">
            <img :src="row.photo_url" alt="Avatar" class="w-10 h-10 rounded-full object-cover" />
            <span>{{ row.name }}</span>
          </div>
        </template>
      </Table>

      <div v-if="loading" class="text-center">Loading...</div>
      <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { type TablePagination, type TableColumn, type TableRow } from '../types/ui/TableType';
import { useContactStore } from '../stores/useContactStore';

import Button from '@/components/ui/Button.vue';
import Container from '@/components/ui/Container.vue';
import Table from '../components/ui/Table.vue';

const tableColumns = ref<TableColumn[]>([
  { name: 'Nome', field: 'name' },
  { name: 'Email', field: 'email' },
  { name: 'Telefone', field: 'cellphone_number' },
  { name: '', field: 'actions' },
]);

const tableItems = ref<TableRow[]>([]);
const tablePagination = ref<TablePagination>({
  current_page: 1,
  last_page: 1,
  total: 1,
});

const contactStore = useContactStore();
const { fetchContacts, loading, error } = contactStore;
const searchQuery = ref('');

const getData = async (sortField: string = 'name', sortOrder: string = 'asc', page: number = 1) => {
  try {
    await fetchContacts(sortField, sortOrder, page);
    setData();
  } catch (err) {
    console.error('Error fetching contacts:', err);
  }
};

const setData = () => {
  const { contacts, currentPage, totalPages } = contactStore;

  tablePagination.value = {
    current_page: currentPage,
    last_page: totalPages,
    total: contacts.length,
  };

  tableItems.value = contacts;
};

onMounted(async () => {
  await fetchContacts();
  setData();
});
</script>

<style scoped lang="scss">
.row:nth-child(odd) > div {
  background-color: #f8f8f8;
}

.row:nth-child(even) > div {
  background-color: #ffffff;
}
</style>