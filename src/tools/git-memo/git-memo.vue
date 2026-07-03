<script setup lang="ts">
import Memo from './git-memo.content.md';
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
</style>