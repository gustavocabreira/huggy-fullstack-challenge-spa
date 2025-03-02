<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from '@/stores/useUserStore';

onMounted(() => {
  const userStore = useUserStore();
  userStore.getUser();
});
</script>