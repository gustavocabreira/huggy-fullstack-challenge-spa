<template>
  <div class="px-4 sm:px-4 md:px-0 min-w-screen min-h-screen overflow-x-hidden">
    <div class="w-full md:w-8/12 mx-auto">
      <div class="flex items-center justify-between">
        <header class="py-4 flex items-start">
          <h2>{{ route.meta.title }}</h2>
        </header>
        <CurrentUser/>
      </div>
      <router-view></router-view>
    </div>
    <div class="absolute top-15 right-15 flex flex-col gap-4">
      <Toastr v-for="notification in notifications" :key="notification.id" :notification="notification"
        @removeNotification="notificationStore.removeNotification" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useUserStore } from '@/stores/useUserStore';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useRoute } from 'vue-router';
import Toastr from "@/components/ui/Toastr.vue";
import CurrentUser from "@/components/ui/CurrentUser.vue";

const route = useRoute();
const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);
const userStore = useUserStore();

onBeforeMount(async () => {
  await userStore.getUser();
});
</script>