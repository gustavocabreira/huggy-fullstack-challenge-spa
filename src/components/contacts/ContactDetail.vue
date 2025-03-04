<template>
  <div class="flex items-center gap-4">
    <span class="subtitle2 text-right min-w-24 text-mine-shaft-100">{{ label }}:</span>
    <span class="body2 text-mine-shaft-700">{{ value ?? '-' }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    required: true,
  },
  value: {
    required: true,
  },
});
</script>
