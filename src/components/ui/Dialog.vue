<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center p-4 dialog" @click.self="closeModal">
      <div class="modal-content bg-white rounded-lg border border-mine-shaft-30 max-w-[910px] md:w-[610px] min-w-[450px] max-h-[90vh] overflow-y-auto">
        <div class="border-b border-mine-shaft-30 p-6">
          <slot name="header"></slot>
        </div>
        <div class="p-6">
          <slot name="body"></slot>
        </div>
        <div v-if="displayActionRow" class="flex items-center justify-end gap-4 p-4 border-t border-mine-shaft-30">
          <slot name="footer">
            <Button class="text-mine-shaft-400" @click="closeModal">Cancelar</Button>
            <Button color="primary" @click="confirmAction">Salvar</Button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  displayActionRow: {
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(['update:isVisible', 'confirm']);

const closeModal = () => {
  emit('update:isVisible', false);
};

const confirmAction = () => {
  emit('confirm');
}
</script>

<style lang="scss" scoped>

.dialog {
  background-color: rgb(0,0,0,0.35)
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>