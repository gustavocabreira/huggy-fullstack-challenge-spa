<template>
  <Card class="rounded-lg">
    <div class="overflow-x-auto">

      <WebhooksTable />
    </div>
  </Card>
</template>

<script lang="ts" setup>
import Card from '@/components/ui/Card.vue';
import WebhooksTable from '@/components/webhooks/WebhooksTable.vue';
</script>