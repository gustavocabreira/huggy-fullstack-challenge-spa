<template>
  <component :is="isLink ? 'a' : 'button'" :class="`btn btn-${color} flex items-center`" :href="href">
    <span v-if="icon" class="mr-2">
      <img :src="selectedIcon" alt="Add Icon" class="w-4 h-4" />
    </span>
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>

import addIcon from '@/assets/images/add.png';

import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'default',
  },
  isLink: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
  },
  icon: {
    type: String,
    default: '',
  }
});

const selectedIcon = computed(() => {
  let icons = {
    'add': addIcon,
  }

  return icons[props.icon];
});

</script>