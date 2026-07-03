<script setup lang="ts">
import { useCopy } from '@/composable/copy';
import { textToBase64 } from '@/utils/base64';

const username = ref('');
const password = ref('');
const header = computed(() => `Authorization: Basic ${textToBase64(`${username.value}:${password.value}`)}`);

const { copy } = useCopy({ source: header, text: 'Header copied to the clipboard' });
</script>

<template>
  <div>
    <c-input-text v-model:value="username" label="Username" placeholder="Your username..." clearable raw-text class="mb-5" />
    <c-input-text
      v-model:value="password"
      label="Password"
      placeholder="Your password..."
      clearable
      raw-text
      class="mb-2"
      type="password"
    />

    <c-card>
      <div class="flex flex-col gap-1">
        <span class="text-sm font-medium text-[var(--text-muted)]">Authorization header:</span>
        <div class="overflow-x-auto font-mono text-base text-[var(--text-primary)]" style="max-width: 550px; margin-bottom: -10px; padding-bottom: 10px">
          {{ header }}
        </div>
      </div>
    </c-card>
    <div class="mt-5 flex justify-center">
      <c-button @click="copy()">Copy header</c-button>
    </div>
  </div>
</template>