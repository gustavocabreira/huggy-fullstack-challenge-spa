<template>
  <div class="flex flex-col">
    <label :for="props.id" class="caption text-mine-shaft-700 font-medium">{{ props.label }}</label>
    <input
      v-model="inputValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :id="props.id"
      @input="updateValue($event.target.value)"
      class="mt-2 border border-mine-shaft-30 rounded-full px-4 focus:outline-none body-2 bg-mine-shaft-10 min-w-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: { // Define modelValue prop for v-model
    type: String,
    default: '',
  }
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue); // Local state for input value

const updateValue = (value) => {
  emit('update:modelValue', value);
};

// Watch for changes in modelValue prop to update local inputValue
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});
</script>

<style scoped>
input {
  max-width: 100%;
  box-sizing: border-box;
}
</style>