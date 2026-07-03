<script setup lang="ts">
import { decodeJwt } from './jwt-parser.service';
import { useValidation } from '@/composable/validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';

const rawJwt = ref(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
);

const decodedJWT = computed(() =>
  withDefaultOnError(() => decodeJwt({ jwt: rawJwt.value }), { header: [], payload: [] }),
);

const sections = [
  { key: 'header', title: 'Header' },
  { key: 'payload', title: 'Payload' },
] as const;

const validation = useValidation({
  source: rawJwt,
  rules: [
    {
      validator: value => value.length > 0 && isNotThrowing(() => decodeJwt({ jwt: rawJwt.value })),
      message: 'Invalid JWT',
    },
  ],
});
</script>

<template>
  <c-card>
    <c-input-text v-model:value="rawJwt" label="JWT to decode" :validation="validation" placeholder="Put your token here..." rows="5" multiline raw-text autofocus class="mb-3" />

    <div v-if="validation.isValid" class="overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
      <table class="w-full border-collapse text-left text-sm">
        <tbody>
          <template v-for="section of sections" :key="section.key">
            <tr class="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)]">
              <th colspan="2" class="px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                {{ section.title }}
              </th>
            </tr>
            <tr v-for="{ claim, claimDescription, friendlyValue, value } in decodedJWT[section.key]" :key="claim + value" class="border-b border-[var(--border-subtle)] last:border-b-0">
              <td class="px-4 py-2 align-top">
                <span class="font-semibold text-[var(--text-primary)]">{{ claim }}</span>
                <span v-if="claimDescription" class="ml-2 opacity-70 text-[var(--text-muted)]">({{ claimDescription }})</span>
              </td>
              <td class="px-4 py-2 text-[var(--text-primary)]" style="word-wrap: break-word;word-break: break-all;">
                <span>{{ value }}</span>
                <span v-if="friendlyValue" class="ml-2 opacity-70 text-[var(--text-muted)]">({{ friendlyValue }})</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </c-card>
</template>