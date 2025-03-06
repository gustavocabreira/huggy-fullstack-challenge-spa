<template>
  <Table
    :columns="tableColumns"
    :items="tableItems"
    :getData="getData"
    :pagination="tablePagination"
    :class="{'min-w-3xl': tableItems?.value?.length}" 
  >
  <template v-slot:payload="{row}">
    {{ row.payload }}
  </template>
  </Table>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Table from '@/components/ui/Table.vue';
import { TableColumn } from '@/types/ui/TableType';
import { TablePagination } from '@/types/ui/TableType';
import { useWebhookLogsStore } from '@/stores/useWebhookLogsStore';

const tableColumns = ref<TableColumn[]>([
  { name: 'Para', field: 'to' },
  { name: 'Evento', field: 'event' },
  { name: 'Status', field: 'status' },
  { name: 'Payload', field: 'payload' },
]);

const tablePagination = ref<TablePagination>({
  current_page: 1,
  last_page: 1,
  total: 1,
});

const webhooksStore = useWebhookLogsStore();
const { webhooks, currentPage, totalPages, fetchWebhooks } = webhooksStore;

const tableItems = computed(() => webhooksStore.webhooks);

const getData = async (sortField = 'id', sortOrder = 'desc', page = 1, query = '') => {
  await fetchWebhooks(sortField, sortOrder, page, query);
  updateTableData();
};

const updateTableData = () => {
  tablePagination.value = {
    current_page: webhooksStore.currentPage,
    last_page: webhooksStore.totalPages,
    total: webhooks?.value?.length,
  };

  tableItems.value = webhooks.value;
};

onMounted(async () => {
  await fetchWebhooks();
  updateTableData();
})
</script>