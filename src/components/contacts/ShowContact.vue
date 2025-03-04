<template>
  <Dialog :isVisible="isDialogVisible" @update:isVisible="isDialogVisible = $event" :displayActionRow="false">
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Avatar :contact="props.contact" />
          <h2>{{ props.contact.name }}</h2>
        </div>
        <div class="flex items-center justify-between gap-4">
          <Icon icon="delete" @click="deleteContact"/>
          <Icon icon="edit"/>
          <Icon icon="close" @click="isDialogVisible = false"/>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <span class="subtitle2 text-right min-w-24 text-mine-shaft-100">Email:</span>
          <span class="body2 text-mine-shaft-700">{{ props.contact.email ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="subtitle2 text-right min-w-24 text-mine-shaft-100">Telefone:</span>
          <span class="body2 text-mine-shaft-700">{{ props.contact.cellphone_number ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="subtitle2 text-right min-w-24 text-mine-shaft-100">CEP:</span>
          <span class="body2 text-mine-shaft-700">{{ props.contact.zip_code ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="subtitle2 text-right min-w-24 text-mine-shaft-100">Endereço:</span>
          <span class="body2 text-mine-shaft-700">{{ props.contact.address ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="subtitle2 text-right min-w-24 text-mine-shaft-100">Bairro:</span>
          <span class="body2 text-mine-shaft-700">{{ props.contact.district ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="subtitle2 text-right min-w-24 text-mine-shaft-100">Cidade:</span>
          <span class="body2 text-mine-shaft-700">{{ props.contact.city ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="subtitle2 text-right min-w-24 text-mine-shaft-100">Estado:</span>
          <span class="body2 text-mine-shaft-700">{{ props.contact.state ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="subtitle2 text-right min-w-24 text-mine-shaft-100">País:</span>
          <span class="body2 text-mine-shaft-700">{{ props.contact.country ?? '-' }}</span>
        </div>
      </div>
    </template>
  </Dialog>

  <ConfirmDialog
      title="Excluir esse contato?"
      :isVisible="isConfirmVisible"
      @update:isVisible="isConfirmVisible = $event"
      @confirm="performDeleteRow"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Contact } from '@/types/Contact';
import Dialog from '@/components/ui/Dialog.vue';
import Avatar from '@/components/ui/Avatar.vue';
import Icon from '@/components/ui/Icon.vue';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';

const props = defineProps({
  contact: {
    type: Object as () => Contact,
    required: true,
  },
});

const isDialogVisible = ref(false);
const isConfirmVisible = ref(false); 

const emit = defineEmits(['deleteContact']);

const toggleVisible = () => {
  isDialogVisible.value = !isDialogVisible.value;
};

const deleteContact = () => {
  isConfirmVisible.value = true;
};

const performDeleteRow = async () => {
  isDialogVisible.value = false;
  emit('deleteContact', props.contact);
};

defineExpose({
  toggleVisible,
});
</script>