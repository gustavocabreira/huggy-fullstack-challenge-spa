<template>
  <div class="px-4 sm:px-4 md:px-0 pb-8">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useUserStore } from '@/stores/useUserStore';

onBeforeMount(() => {
  const userStore = useUserStore();
  userStore.getUser();
});
</script>