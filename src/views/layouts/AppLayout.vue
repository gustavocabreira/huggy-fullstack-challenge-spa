<template>
  <div class="flex flex-col min-h-screen min-w-screen">
    layout
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from '@/stores/useUserStore';

onMounted(() => {
  const userStore = useUserStore();
  userStore.getUser();
});
</script>