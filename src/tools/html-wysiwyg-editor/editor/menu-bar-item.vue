<script setup lang="ts">
import type { Component } from 'vue';

const props = defineProps<{ icon: Component; title: string; action: () => void; isActive?: () => boolean }>();
const { icon, title, action, isActive } = toRefs(props);
</script>

<template>
  <c-tooltip :tooltip="title">
    <c-button circle variant="text" :type="isActive?.() ? 'primary' : 'default'" @click="action">
      <component :is="icon" class="text-[var(--text-secondary)]" size="20" />
    </c-button>
  </c-tooltip>
</template>