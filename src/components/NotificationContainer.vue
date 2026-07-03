<script setup lang="ts">
import { useNotification } from '@/composable/notification';

const { notifications, removeNotification } = useNotification();
</script>

<template>
  <Teleport to="body">
    <div class="notification-container fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      <TransitionGroup name="notification" tag="div" class="flex flex-col gap-2">
        <div
          v-for="n in notifications"
          :key="n.id"
          class="notification-item flex cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] px-4 py-3 text-sm shadow-[var(--shadow-md)] backdrop-blur-sm"
          :class="{
            'bg-[color-mix(in_srgb,var(--state-success),transparent_88%)] text-[var(--state-success)]': n.type === 'success',
            'bg-[color-mix(in_srgb,var(--state-danger),transparent_88%)] text-[var(--state-danger)]': n.type === 'error',
            'bg-[color-mix(in_srgb,var(--state-info),transparent_88%)] text-[var(--state-info)]': n.type === 'info',
            'bg-[color-mix(in_srgb,var(--state-warning),transparent_88%)] text-[var(--state-warning)]': n.type === 'warning',
          }"
          @click="removeNotification(n.id)"
        >
          <span>{{ n.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>