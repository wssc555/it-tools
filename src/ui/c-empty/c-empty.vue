<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
  icon?: boolean
  testId?: string
}>(), {
  message: 'No data',
  icon: true,
  testId: undefined,
});
</script>

<template>
  <div class="c-empty flex flex-col items-center justify-center gap-3 py-12" :data-test-id="testId">
    <icon-mdi-inbox-outline v-if="icon" class="h-12 w-12 text-[var(--text-muted)]" />
    <p class="c-empty__message text-sm text-[var(--text-muted)]">
      <slot>
        {{ message }}
      </slot>
    </p>
  </div>
</template>

<style lang="less" scoped>
.c-empty {
  user-select: none;
}
</style>