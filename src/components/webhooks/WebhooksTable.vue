<template>
  <Table
    :columns="tableColumns"
    :items="tableItems"
    :getData="getData"
    :pagination="tablePagination"
    :class="{'min-w-3xl': tableItems.length > 0}"
  >
    <template v-slot:updated_at="{ row }">
      {{ formatDate(row.created_at) }}
    </template>
    <template v-slot:payload="{ row }">
      <Button 
        @click="downloadFile(row.payload, 'payload.json')" 
        color="primary">
        Download
      </Button>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { TableColumn, TablePagination } from '@/types/ui/TableType';
import { useWebhookLogsStore } from '@/stores/useWebhookLogsStore';

import Table from '@/components/ui/Table.vue';
import Button from '@/components/ui/Button.vue';
import formatDate from '@/services/formatDate';

const tableColumns: TableColumn[] = [
  { name: 'Ultima atualização', field: 'updated_at' },
  { name: 'Para', field: 'to' },
  { name: 'Evento', field: 'event' },
  { name: 'Status', field: 'status' },
  { name: 'Payload', field: 'payload' },
];

const tablePagination = ref<TablePagination>({
  current_page: computed(() => webhooksStore.currentPage),
  last_page: computed(() => webhooksStore.totalPages),
});

const webhooksStore = useWebhookLogsStore();

const tableItems = computed(() => webhooksStore.webhooks);

const getData = async (sortField = 'id', sortOrder = 'desc', page = 1, query = '') => {
  await webhooksStore.fetchWebhooks(sortField, sortOrder, page, query);
};

const downloadFile = (payload: any, filename: string) => {
  const payloadString = JSON.stringify(payload, null, 2);
  const blob = new Blob([payloadString], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

onMounted(() => {
  webhooksStore.fetchWebhooks();
});
</script>
