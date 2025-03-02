<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p class="modal-message">{{ message }}</p>
        <div class="flex items-center justify-end gap-2 mt-8">
          <Button class="text-mine-shaft-400" @click="closeModal">Cancelar</Button>
          <Button class="text-alizarin-crimson-400" @click="confirmAction">Excluir</Button>
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
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: null,
  }
});

const emit = defineEmits(['update:isVisible', 'confirm']);

const closeModal = () => {
  emit('update:isVisible', false);
};

const confirmAction = () => {
  emit('confirm');
  closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  max-width: 400px;
  width: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-message {
  margin: 10px 0;
}

.cancel-button {
  background-color: #f0f0f0;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to
{
  opacity: 0;
}
</style>