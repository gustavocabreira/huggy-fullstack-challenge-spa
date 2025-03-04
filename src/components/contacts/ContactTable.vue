<template>
  <Table
    :columns="tableColumns"
    :items="tableItems"
    :getData="getData"
    :pagination="tablePagination"
    @deleteRow="deleteContactAction"
    @updateRow="updateContactAction">
    <template v-slot:name="{ row }">
      <div class="flex items-center gap-4">
        <Avatar :contact="row" />
        <span>{{ row.name }}</span>
      </div>
    </template>
  </Table>

  <CreateUpdateContact />
  <ShowContact ref="showContactDialog" @deleteContact="deleteContactAction" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { type TablePagination, type TableColumn, type TableRow } from '@/types/ui/TableType';
import { useContactStore } from '@/stores/useContactStore';
import type { Contact } from '@/types/Contact';

import Table from '@/components/ui/Table.vue';
import Avatar from '@/components/ui/Avatar.vue';
import CreateUpdateContact from './CreateUpdateContact.vue';
import ShowContact from './ShowContact.vue';

const props = defineProps({
  query: {
    type: String,
    default: '',
  },
});

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
  query: props.query,
});

const contactStore = useContactStore();
const { fetchContacts, deleteContact, setSelectedContact } = contactStore;

const getData = async (
  sortField: string = 'name',
  sortOrder: string = 'asc',
  page: number = 1,
  query: string = ''
) => {
  try {
    await fetchContacts(sortField, sortOrder, page, query);
    updateTableData();
  } catch (err) {
    console.error('Error fetching contacts:', err);
  }
};

const updateTableData = () => {
  const { contacts, currentPage, totalPages } = contactStore;

  tablePagination.value = {
    current_page: currentPage,
    last_page: totalPages,
    total: contacts.length,
    query: props.query,
  };

  tableItems.value = contacts;
};

watch(() => props.query, (newQuery) => {
  getData(undefined, undefined, 1, newQuery);
});

const deleteContactAction = async (contact: Contact) => {
  tableItems.value = tableItems.value.filter((c) => c.id !== contact.id);

  try {  
    await deleteContact(contact);
  } catch (error) {
    tableItems.value.push(contact);
  }
};

const showContactDialog = ref(null);
const selectedContact = ref<Contact | null>(null);

const updateContactAction = async (contact: Contact) => {
  setSelectedContact(contact);
  selectedContact.value = contact;
  showContactDialog.value?.toggleVisible();
};

onMounted(async () => {
  await fetchContacts();
  updateTableData();
});
</script>
