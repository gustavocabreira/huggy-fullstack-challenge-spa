<template>
  <div class="px-4 sm:px-4 md:px-0 pb-8">
    <router-view></router-view>
    <div class="absolute top-15 right-15 flex flex-col gap-4">
      <Toastr v-for="notification in notifications" :key="notification.id" :notification="notification" @removeNotification="notificationStore.removeNotification" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useUserStore } from '@/stores/useUserStore';
import Toastr from "@/components/ui/Toastr.vue";
import { useNotificationStore } from "@/stores/useNotificationStore";

const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);

onBeforeMount(() => {
  const userStore = useUserStore();
  userStore.getUser();
});
</script>