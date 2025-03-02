<template>
  <component :is="isLink ? 'a' : 'button'" :class="`btn btn-${color}`" :href="href">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>

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
  }
})

</script>