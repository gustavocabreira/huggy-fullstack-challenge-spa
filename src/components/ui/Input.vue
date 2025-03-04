<template>
  <div class="flex flex-col">
    <Caption is="label" :for="props.id" class="text-mine-shaft-700 font-medium">{{ props.label }}</Caption>

    <input
      v-model="inputValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :id="props.id"
      @input="updateValue($event.target.value)"
      :class="{ 'border-alizarin-crimson-400': props.error, 'border-mine-shaft-30': !props.error }"
      class="mt-2 border rounded-full px-4 focus:outline-none body-2 bg-mine-shaft-10 min-w-full" />

    <Caption v-if="props.error" class="caption text-alizarin-crimson-400 mt-1">{{ props.error.join('<br>') }}</Caption>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Caption from '@/components/ui/Caption.vue';

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
  modelValue: {
    type: String,
    default: '',
  },
  error: {
    type: Array,
    default: null,
  }
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

const updateValue = (value) => {
  emit('update:modelValue', value);
};

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