<template>
  <div class="flex items-center">
    <div class="relative w-full">
      <input
        v-model="value"
        @input="debounceEmit"
        type="text"
        placeholder="Buscar contato"
        class="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <img :src="searchIcon" alt="Search Icon" class="absolute left-3 top-1/2 transform -translate-y-1/2" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { debounce } from 'lodash';
import searchIcon from '@/assets/icons/search.svg';


const showIcon = ref(true);

const emit = defineEmits(['update:modelValue']);

const value = ref('');

const debounceEmit = debounce(() => {
  emit('update:modelValue', value.value);
}, 500);

onMounted(() => {
  debounceEmit.cancel();
});

</script>

<style scoped>
/* Additional styles if needed */
</style>