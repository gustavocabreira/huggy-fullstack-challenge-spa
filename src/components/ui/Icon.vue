<template>
  <button class="cursor-pointer"><img :src="selectedIcon"/></button>
</template>

<script lang="ts" setup>
import editIcon from '@/assets/icons/edit.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import reportIcon from '@/assets/icons/report.svg';
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  }
});

const selectedIcon = computed(() => {
  let icons = {
    'edit': editIcon,
    'delete': deleteIcon,
    'report': reportIcon,
  }

  return icons[props.icon];
});
</script>