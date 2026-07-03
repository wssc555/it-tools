<script lang="ts" setup>
import { type RouteLocationRaw, RouterLink } from 'vue-router';

const props = defineProps<{
  href?: string
  to?: RouteLocationRaw
  type?: 'primary' | 'default'
}>();

const { href, to } = toRefs(props);

const tag = computed(() => {
  if (href?.value) return 'a';
  if (to?.value) return RouterLink;
  return 'span';
});
</script>

<template>
  <component
    :is="tag"
    :href="href ?? to"
    class="c-link"
    :class="{ 'c-link--primary': type === 'primary' }"
    :to="to"
  >
    <slot />
  </component>
</template>

<style lang="less" scoped>
.c-link {
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  color: var(--text-secondary);
  border-radius: 4px;
  transition: color 0.2s ease;
  outline-offset: 1px;

  &:hover {
    color: var(--accent-primary);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary);
  }

  &--primary {
    color: var(--accent-primary);
    &:hover { color: var(--accent-primary-hover); }
  }
}
</style>