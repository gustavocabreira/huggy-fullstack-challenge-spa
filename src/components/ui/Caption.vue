<template>
  <component :is="props.type" class="caption" :disabled="props.disabled">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>

const props = defineProps({
  type: {
    type: String,
    default: 'span',
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

</script>

<style scoped>
.caption {
  font-weight: 500;
  font-size: 0.75em;
  line-height: 1em;
  letter-spacing: 0.4px;
}
</style>