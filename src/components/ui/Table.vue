<template>
  <div>
    <div class="flex px-6 py-4 border-b border-gray-200">
      <div v-for="(column, index) in columns" :key="index" :class="[
        index === columns.length - 1 ? 'flex-none w-24' : 'flex-1',
        'text-left caption cursor-pointer'
      ]" @click="sortBy(column.field)">
        {{ column.name }} <span v-if="sortField === column.field">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
      </div>
    </div>

    <div v-if="items.length">
      <div v-for="(row, index) in items" :key="index" class="row px-2">
        <div class="flex items-center px-4 py-4 rounded-md">
          <div v-for="(column, colIndex) in columns" :key="colIndex"
            :class="colIndex === columns.length - 1 ? 'flex-none body-2 w-24' : 'flex-1 body-2'">
            <template v-if="colIndex === columns.length - 1">
              <div class="flex justify-center items-center h-full">
                <button class="text-blue-600 text-sm" @click="editRow(row)">✏️</button>
                <button class="text-red-600 text-sm" @click="deleteRow(row)">🗑️</button>
              </div>
            </template>
            <template v-else>
              <slot :name="column.field" :row="row">
                {{ row[column.field] ?? '-' }}
              </slot>
            </template>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between p-4">
        <Button @click="prevPage" class="caption" color="grey"
          :disabled="pagination.current_page === 1 || isLoading">Anterior</Button>
        <span class="caption">Página {{ pagination.current_page }} de {{ pagination.last_page }}</span>
        <Button @click="nextPage" class="caption" color="grey"
          :disabled="pagination.current_page === pagination.last_page || isLoading">Próxima</Button>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center p-4 min-h-2/3 gap-4">
      <img :src="noContactImage" alt="No Contacts" />
      <span class="body-2 text-gray-500 font-normal">Ainda não há contatos</span>
      <Button class="mt-4" icon="add" color="primary">Adicionar contato</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import type { TableColumn, TablePagination, TableRow } from '../../types/ui/TableType';
import Button from '@/components/ui/Button.vue';
import noContactImage from '@/assets/images/no-contact.png';

const props = defineProps<{
  columns: Array<TableColumn>;
  items: Array<TableRow>;
  pagination: TablePagination;
  getData: (sortField: string, sortOrder: string, page: number, query: string) => Promise<void>;
}>();

const sortField = ref('');
const sortOrder = ref('asc');

const isLoading = ref(false);

const sortBy = async (field: string) => {
  if (!props.items.length || isLoading.value) return;

  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }

  isLoading.value = true;

  await props.getData(sortField.value, sortOrder.value, props.pagination.current_page, props.pagination.query);

  isLoading.value = false;
};

const prevPage = async () => {
  if (!props.items.length || isLoading.value) return;

  isLoading.value = true;
  await props.getData(sortField.value, sortOrder.value, props.pagination.current_page - 1, props.pagination.query);
  isLoading.value = false;
};

const nextPage = async () => {
  if (!props.items.length || isLoading.value) return;

  isLoading.value = true;
  await props.getData(sortField.value, sortOrder.value, props.pagination.current_page + 1, props.pagination.query);
  isLoading.value = false;
};

const editRow = (row: TableRow) => {
  console.log('Edit:', row);
};

const deleteRow = (row: TableRow) => {
  console.log('Delete:', row);
};
</script>

<style scoped lang="scss">
.row:nth-child(even)>div {
  background-color: #f8f8f8;
}

.row:nth-child(odd)>div {
  background-color: #ffffff;
}

.min-h-2\/3 {
  min-height: calc(2 / 3 * 100vh);
}
</style>