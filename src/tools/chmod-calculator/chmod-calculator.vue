<script setup lang="ts">
import InputCopyable from '../../components/InputCopyable.vue';
import { computeChmodOctalRepresentation, computeChmodSymbolicRepresentation } from './chmod-calculator.service';

import type { Group, Scope } from './chmod-calculator.types';

const scopes: { scope: Scope; title: string }[] = [
  { scope: 'read', title: 'Read (4)' },
  { scope: 'write', title: 'Write (2)' },
  { scope: 'execute', title: 'Execute (1)' },
];
const groups: Group[] = ['owner', 'group', 'public'];

const permissions = ref({
  owner: { read: false, write: false, execute: false },
  group: { read: false, write: false, execute: false },
  public: { read: false, write: false, execute: false },
});

const octal = computed(() => computeChmodOctalRepresentation({ permissions: permissions.value }));
const symbolic = computed(() => computeChmodSymbolicRepresentation({ permissions: permissions.value }));
</script>

<template>
  <div>
    <div class="overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
      <table class="w-full border-collapse text-left text-sm">
        <thead>
          <tr class="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)]">
            <th class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]" scope="col" />
            <th class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]" scope="col">
              Owner (u)
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]" scope="col">
              Group (g)
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]" scope="col">
              Public (o)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ scope, title } of scopes" :key="scope" class="border-b border-[var(--border-subtle)] last:border-b-0">
            <td class="px-4 py-3 text-right text-sm font-semibold text-[var(--text-primary)]" style="max-width: 80px;">
              {{ title }}
            </td>
            <td v-for="group of groups" :key="group" class="px-4 py-3 text-center">
              <input
                type="checkbox"
                :checked="permissions[group][scope]"
                class="h-5 w-5 cursor-pointer accent-[var(--accent-primary)]"
                @change="permissions[group][scope] = !permissions[group][scope]"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="my-5 text-center font-mono text-5xl text-[var(--accent-primary)]">
      {{ octal }}
    </div>
    <div class="my-5 text-center font-mono text-5xl text-[var(--accent-primary)]">
      {{ symbolic }}
    </div>

    <InputCopyable :value="`chmod ${octal} path`" readonly />
  </div>
</template>