<script lang="ts" setup>
defineProps<{ title?: string }>();
</script>

<template>
  <div class="rounded-[var(--radius-md)] bg-[var(--surface-card)] px-5 py-4">
    <div v-if="title" class="mb-5 text-base font-medium text-[var(--text-primary)]">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<style lang="less" scoped>
</style>