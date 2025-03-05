<template>
  <div v-if="currentUser" class="flex items-center gap-4">
    <div class="flex flex-col justify-center items-end">
      <p class="body-2">{{ currentUser.name }}</p>
      <Caption class="text-alizarin-crimson-400 cursor-pointer" @click="logout">Finalizar sessão</Caption>
    </div>
    <div class="avatar flex items-center justify-center w-10 h-10 rounded-full subtitle2">
      <img :src="currentUser.avatar" alt="Avatar"
        class="w-full h-full rounded-full object-cover border-2 border-mine-shaft-30" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Caption from "@/components/ui/Caption.vue";
import { useUserStore } from "@/stores/useUserStore";
const userStore = useUserStore();

const currentUser = computed(() => userStore.user);
const { logout } = userStore;
</script>