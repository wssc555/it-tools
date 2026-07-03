<script setup lang="ts">
import { useLoadingBar } from '@/composable/loading-bar';

const { loadingBarState } = useLoadingBar();
</script>

<template>
  <Teleport to="body">
    <div
      class="loading-bar-container fixed left-0 top-0 z-[9999] h-[3px] w-full pointer-events-none"
      :class="{ 'opacity-0': !loadingBarState.visible }"
      style="transition: opacity 0.2s ease;"
    >
      <div
        class="loading-bar-fill h-full transition-all duration-[300ms] ease-out"
        :style="{
          width: `${loadingBarState.progress}%`,
          backgroundColor: loadingBarState.color,
        }"
      />
    </div>
  </Teleport>
</template>