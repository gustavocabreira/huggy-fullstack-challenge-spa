<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useUserStore } from '@/stores/useUserStore';

onBeforeMount(() => {
  const userStore = useUserStore();
  userStore.getUser();
});
</script>