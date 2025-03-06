<template>
  <Table
    :columns="tableColumns"
    :items="tableItems"
    :getData="getData"
    :pagination="tablePagination"
    @deleteRow="deleteContactAction"
    @updateRow="updateContactAction"
    class="min-w-3xl"
  >
    <template v-slot:name="{ row }">
      <div class="flex items-center gap-4">
        <Avatar :contact="row" />
        <span>{{ row.name }}</span>
      </div>
    </template>
  </Table>

  <div v-if="!contacts.length" class="empty-state">
    <img :src="noContactImage" alt="No Contacts" />
    <span class="body-2 text-gray-500 font-normal">Ainda não há contatos</span>
    <Button class="mt-4" icon="add" color="primary" @click="toggleContactDialog">
      Adicionar contato
    </Button>
  </div>

  <CreateContact ref="createContact"/>
  <ShowContact ref="showContactDialog" @deleteContact="deleteContactAction" />

  <ConfirmDialog
    title="Excluir esse contato?"
    :isVisible="isDeleteDialogVisible"
    @update:isVisible="isDeleteDialogVisible = $event"
    @confirm="performDeleteRow"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { type TablePagination, type TableColumn, type TableRow } from '@/types/ui/TableType';
import { useContactStore } from '@/stores/useContactStore';
import { useNotificationStore } from '@/stores/useNotificationStore';
import type { Contact } from '@/types/Contact';

import Table from '@/components/ui/Table.vue';
import Avatar from '@/components/ui/Avatar.vue';
import CreateContact from './CreateContact.vue';
import ShowContact from './ShowContact.vue';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';
import Button from '@/components/ui/Button.vue';
import noContactImage from '@/assets/images/no-contact.png';

const props = defineProps({
  query: { type: String, default: '' },
});

const contactStore = useContactStore();
const notificationStore = useNotificationStore();

const { fetchContacts, deleteContact, setSelectedContact, addContact } = contactStore;
const { addNotification } = notificationStore;

const contacts = computed(() => contactStore.contacts);

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

const isDeleteDialogVisible = ref(false);
const contactToBeDeleted = ref<Contact | null>(null);
const createContact = ref(null);
const showContactDialog = ref(null);
const selectedContact = ref<Contact | null>(null);

const getData = async (sortField = 'name', sortOrder = 'asc', page = 1, query = '') => {
  try {
    await fetchContacts(sortField, sortOrder, page, query);
    updateTableData();
  } catch (err) {
    console.error('Error fetching contacts:', err);
  }
};

const updateTableData = () => {
  tablePagination.value = {
    current_page: contactStore.currentPage,
    last_page: contactStore.totalPages,
    total: contacts.value.length,
    query: props.query,
  };

  tableItems.value = contacts.value;
};

watch(
  () => props.query,
  (newQuery) => getData(undefined, undefined, 1, newQuery)
);

const deleteContactAction = (contact: Contact) => {
  isDeleteDialogVisible.value = true;
  contactToBeDeleted.value = contact;
};

const performDeleteRow = async () => {
  if (!contactToBeDeleted.value) return;

  tableItems.value = tableItems.value.filter((c) => c.id !== contactToBeDeleted.value?.id);

  try {
    await deleteContact(contactToBeDeleted.value);
    addNotification({
      title: 'Contato excluído',
      message: 'Contato excluído com sucesso',
      type: 'SUCCESS',
    });
  } catch (error) {
    tableItems.value.push(contactToBeDeleted.value);
  }
};

const updateContactAction = (contact: Contact) => {
  setSelectedContact(contact);
  selectedContact.value = contact;
  showContactDialog.value?.toggleVisible();
};

const toggleContactDialog = () => {
  createContact?.value?.toggleVisible();
};

onMounted(async () => {
  await fetchContacts();
  updateTableData();
});
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 66vh;
  gap: 1rem;
}
</style>
