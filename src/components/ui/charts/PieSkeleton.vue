<template>
  <div v-if="display"
    class="w-full h-[380px] flex flex-col md:flex-row items-center justify-between space-y-4">
    
    <div class="w-1/2 md:w-full h-[380px] bg-gray-200 rounded-full animate-pulse"></div>
    
    <div class="w-full flex flex-col items-center md:items-start space-y-2 ml-0 md:ml-5">
      <div class="w-1/2 md:w-[60%] h-[20px] bg-gray-200 rounded animate-pulse"></div>
      <div class="w-1/2 md:w-[60%] h-[20px] bg-gray-200 rounded animate-pulse"></div>
      <div class="w-1/2 md:w-[60%] h-[20px] bg-gray-200 rounded animate-pulse"></div>
      <div class="w-1/2 md:w-[60%] h-[20px] bg-gray-200 rounded animate-pulse"></div>
      <div class="w-1/2 md:w-[60%] h-[20px] bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  display: {
    type: Boolean,
    default: false,
  }
});
</script>