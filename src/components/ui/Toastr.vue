<template>
  <div
    class="w-80 p-4 rounded-lg shadow-lg flex items-center justify-between gap-4 transition-transform transform duration-300"
    :class="[getBgColor()]">

    <div class="flex flex-col gap-2">
      <span class="font-semibold text-white text-lg">{{ notification.title }}</span>
      <span class="text-white text-sm opacity-80">{{ notification.message }}</span>
    </div>

    <Icon icon="close" class="text-white cursor-pointer hover:text-gray-200 transition-colors"
      @click="removeNotification" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import { Notification } from '@/types/ui/Notification';
import Icon from '@/components/ui/Icon.vue';

const notificationVisible = ref(true);

const props = defineProps({
  notification: {
    type: Object as () => Notification,
    required: true,
  },
});

const getBgColor = (): string => {
  const colors = {
    'SUCCESS': 'bg-deep-sea-90',
    'DANGER': 'bg-alizarin-crimson-400',
  };

  return colors[props.notification.type] as string;
};

const emit = defineEmits(['removeNotification']);

const removeNotification = () => {
  emit('removeNotification', props.notification.id);
};
</script>