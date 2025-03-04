import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    notification.id = new Date().getTime();
    notifications.value.push(notification);

    setTimeout(() => {
      notifications.value = notifications.value.filter(n => n.id !== notification.id);
    }, 3000);
  }

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }

  return {
    notifications,
    addNotification,
    removeNotification,
  }
});