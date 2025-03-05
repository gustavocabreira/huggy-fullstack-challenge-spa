<template>
  <button class="cursor-pointer"><img :src="selectedIcon"/></button>
</template>

<script lang="ts" setup>
import editIcon from '@/assets/icons/edit.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import reportIcon from '@/assets/icons/report.svg';
import closeIcon from '@/assets/icons/close.svg';
import goBackIcon from '@/assets/icons/go-back.svg';
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
    'close': closeIcon,
    'go-back': goBackIcon,
  }

  return icons[props.icon];
});
</script>