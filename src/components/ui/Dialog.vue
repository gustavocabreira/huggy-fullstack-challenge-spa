<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay p-4 md:p-0" @click.self="closeDialog">
      <div class="modal-content border border-mine-shaft-30 max-h-[90vh] overflow-y-auto">
        <div class="border-b border-mine-shaft-30 p-6">
          <slot name="header"></slot>
        </div>
        <div class="p-6">
          <slot name="body"></slot>
        </div>
        <div class="flex items-center justify-end gap-4 p-4 border-t border-mine-shaft-30">
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0px 1px 2px 0px #00000026;
  position: relative;
  max-width: 610px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
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