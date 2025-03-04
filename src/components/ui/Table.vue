<template>
  <div>
    <div class="flex px-6 py-4 border-b border-gray-200">
      <Caption v-for="(column, index) in columns" :key="index" :class="[
        index === columns.length - 1 ? 'flex-none w-24' : 'flex-1',
        'text-left cursor-pointer'
      ]" @click="sortBy(column.field)">
        {{ column.name }} <span v-if="sortField === column.field">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
      </Caption>
    </div>

    <div v-if="items.length">
      <div v-for="(row, index) in items" :key="index" class="row px-2 mt-2" @click="setActiveRow(index)"
        :class="{ active: activeRow === index }">
        <div class="flex items-center px-4 py-2 rounded-md">
          <div v-for="(column, colIndex) in columns" :key="colIndex"
            :class="colIndex === columns.length - 1 ? 'flex-none body-2 w-24' : 'flex-1 body-2'">
            <template v-if="colIndex === columns.length - 1">
              <div class="action-buttons justify-end items-center h-full gap-4">
                <Icon icon="edit" @click="editRow(row)">Editar</Icon>
                <Icon icon="delete" @click="deleteRow(row)">Excluir</Icon>
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
      <div class="flex items-center justify-between p-4 mt-4">
        <Caption type="button" @click="prevPage"
          :disabled="pagination.current_page === 1 || isLoading">Anterior</Caption>
        <Caption>Página {{ pagination.current_page }} de {{ pagination.last_page }}</Caption>
        <Caption type="button" @click="nextPage"
          :disabled="pagination.current_page === pagination.last_page || isLoading">Próxima</Caption>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center p-4 min-h-2/3 gap-4">
      <img :src="noContactImage" alt="No Contacts" />
      <span class="body-2 text-gray-500 font-normal">Ainda não há contatos</span>
      <Button class="mt-4" icon="add" color="primary" @click="toggleContactDialog">Adicionar contato</Button>
    </div>

    <ConfirmDialog
      title="Excluir esse contato?"
      :isVisible="isModalVisible"
      @update:isVisible="isModalVisible = $event"
      @confirm="performDeleteRow"/>

      <CreateUpdateContact ref="createUpdateContact"/>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import type { TableColumn, TablePagination, TableRow } from '../../types/ui/TableType';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import noContactImage from '@/assets/images/no-contact.png';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';
import CreateUpdateContact from '@/components/contacts/CreateUpdateContact.vue'; 
import Caption from '@/components/ui/Caption.vue';

const props = defineProps<{
  columns: Array<TableColumn>;
  items: Array<TableRow>;
  pagination: TablePagination;
  getData: (sortField: string, sortOrder: string, page: number, query: string) => Promise<void>;
}>();

const activeRow = ref<number | null>(null);
const selectedRow = ref<TableRow | null>(null);

const sortField = ref('');
const sortOrder = ref('asc');

const isLoading = ref(false);
const isModalVisible = ref(false);

const createUpdateContact = ref(null);

const emit = defineEmits(['deleteRow', 'updateRow']);

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
  emit('updateRow', row);
};

const deleteRow = (row: TableRow) => {
  showConfirmDialog(row);
};

const setActiveRow = (index: number) => {
  if (activeRow.value == index) {
    activeRow.value = null;
  } else {
    activeRow.value = index;
  }
};

const showConfirmDialog = (row: TableRow) => {
  selectedRow.value = row;
  isModalVisible.value = true;
};

const performDeleteRow = async () => {
  if (!selectedRow.value) return;

  emit('deleteRow', selectedRow.value);
  selectedRow.value = null;
  activeRow.value = null;
};

const toggleContactDialog = () => {
  createUpdateContact?.value?.toggleVisible();
};
</script>

<style scoped lang="scss">
.row {
  .action-buttons {
    display: none;
  }

  &:hover {
    &>div {
      background-color: #f8f8f8;
    }

    .action-buttons {
      display: flex;
    }
  }

  &:hover {
    &>div {
      background-color: #f8f8f8;
    }

    .action-buttons {
      display: flex;
    }
  }
}

.active {
  &>div {
    background-color: #f8f8f8;
  }

  .action-buttons {
    display: flex;
  }
}
</style>