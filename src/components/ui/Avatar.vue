<template>
  <div class="avatar flex items-center justify-center w-10 h-10 rounded-full subtitle2">
    <img v-if="hasAvatar" :src="contact.photo_url" alt="Avatar" class="w-full h-full rounded-full object-cover" />
    <span v-else>{{ initials }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Contact } from '@/types/Contact';

const props = defineProps({
  contact: {
    type: Object as () => Contact,
    required: true,
  },
});

const hasAvatar = computed(() => !!props.contact.photo);

const initials = computed(() => {
  const names = props.contact.name.split(' ');
  const firstInitial = names[0]?.charAt(0).toUpperCase() || '';
  const secondInitial = names[1]?.charAt(0).toUpperCase() || '';
  return `${firstInitial}${secondInitial}`;
});
</script>

<style lang="scss">
.avatar {
  background-color: #F8F7FD;
  color: #180D6E;
}
</style>