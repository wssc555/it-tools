<script setup lang="ts">
const props = withDefaults(defineProps<{
  page?: number
  pageSize?: number
  total?: number
  showSizePicker?: boolean
  pageSizes?: number[]
  disabled?: boolean
  testId?: string
}>(), {
  page: 1,
  pageSize: 20,
  total: 0,
  showSizePicker: false,
  pageSizes: () => [10, 20, 30, 50],
  disabled: false,
  testId: undefined,
});

const emit = defineEmits(['update:page', 'update:pageSize']);

const currentPage = useVModel(props, 'page', emit);
const currentSize = useVModel(props, 'pageSize', emit);

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / currentSize.value)));

const pages = computed(() => {
  const tp = totalPages.value;
  const cp = currentPage.value;
  const range: (number | string)[] = [];

  // Always show first page
  range.push(1);

  if (tp <= 7) {
    for (let i = 2; i < tp; i++) range.push(i);
  } else {
    // Complex pagination with ellipsis
    if (cp <= 3) {
      range.push(2, 3, 4, '...');
    } else if (cp >= tp - 2) {
      range.push('...', tp - 3, tp - 2, tp - 1);
    } else {
      range.push('...', cp - 1, cp, cp + 1, '...');
    }
  }

  if (tp > 1) range.push(tp);

  return range;
});

function goTo(p: number | string) {
  if (typeof p !== 'number' || props.disabled) return;
  if (p < 1 || p > totalPages.value) return;
  currentPage.value = p;
}

function goPrev() { goTo(currentPage.value - 1); }
function goNext() { goTo(currentPage.value + 1); }

const isFirst = computed(() => currentPage.value <= 1);
const isLast = computed(() => currentPage.value >= totalPages.value);
</script>

<template>
  <div
    class="c-pagination flex items-center gap-1 text-sm"
    :class="{ 'c-pagination--disabled': disabled }"
    :data-test-id="testId"
  >
    <!-- Page size picker -->
    <select
      v-if="showSizePicker"
      v-model="currentSize"
      :disabled="disabled"
      class="c-pagination__size-picker mr-2 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-2 py-1 text-xs text-[var(--text-secondary)] outline-none"
      @change="$emit('update:pageSize', currentSize)"
    >
      <option v-for="s in pageSizes" :key="s" :value="s">{{ s }} / page</option>
    </select>

    <!-- Prev -->
    <button
      class="c-pagination__btn"
      :disabled="isFirst || disabled"
      @click="goPrev"
    >
      <icon-mdi-chevron-left class="h-4 w-4" />
    </button>

    <!-- Pages -->
    <template v-for="(p, i) in pages" :key="i">
      <span v-if="p === '...'" class="c-pagination__ellipsis px-1 text-[var(--text-muted)]">...</span>
      <button
        v-else
        class="c-pagination__btn"
        :class="{ 'c-pagination__btn--active': p === currentPage }"
        :disabled="disabled"
        @click="goTo(p)"
      >
        {{ p }}
      </button>
    </template>

    <!-- Next -->
    <button
      class="c-pagination__btn"
      :disabled="isLast || disabled"
      @click="goNext"
    >
      <icon-mdi-chevron-right class="h-4 w-4" />
    </button>

    <!-- Total info -->
    <span class="c-pagination__info ml-2 text-xs text-[var(--text-muted)]">
      Total {{ total }}
    </span>
  </div>
</template>

<style lang="less" scoped>
.c-pagination {
  &--disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 6px;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.15s;
    font-size: 13px;

    &:hover:not(:disabled) {
      background: var(--bg-surface-2);
      border-color: var(--border-default);
      color: var(--text-primary);
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    &--active {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: var(--text-on-accent);

      &:hover:not(:disabled) {
        background: var(--accent-primary-hover);
        border-color: var(--accent-primary-hover);
        color: var(--text-on-accent);
      }
    }
  }

  &__size-picker {
    &:focus-visible {
      box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary);
    }
  }
}
</style>
