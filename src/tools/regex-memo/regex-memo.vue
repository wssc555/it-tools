<script setup lang="ts">
import Memo from './regex-memo.content.md';
</script>

<template>
  <div>
    <Memo />
  </div>
</template>

<style lang="less" scoped>
::v-deep(pre) {
  margin: 0;
  padding: 15px 22px;
  background-color: var(--surface-card);
  border-radius: 4px;
  overflow: auto;
}

::v-deep(table) {
  border-collapse: collapse;
}

::v-deep(table), ::v-deep(td), ::v-deep(th) {
  border: 1px solid var(--text-primary);
  padding: 5px;
}

::v-deep(a) {
  color: var(--text-primary);
}
</style>