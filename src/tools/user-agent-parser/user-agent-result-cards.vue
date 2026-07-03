<script setup lang="ts">
import type { UAParser } from 'ua-parser-js';
import type { UserAgentResultSection } from './user-agent-parser.types';

const props = defineProps<{
  userAgentInfo?: UAParser.IResult
  sections: UserAgentResultSection[]
}>();
const { userAgentInfo, sections } = toRefs(props);
</script>

<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div v-for="{ heading, icon, content } in sections" :key="heading">
        <c-card h-full>
          <div flex items-center gap-3>
            <component :is="icon" :size="30" class="text-[var(--text-secondary)]" />
            <span text-lg>{{ heading }}</span>
          </div>

          <div mt-5 flex gap-2 flex-wrap>
            <span v-for="{ label, getValue } in content" :key="label">
              <c-tooltip v-if="getValue(userAgentInfo)" :tooltip="label">
                <span class="inline-block rounded-full bg-[var(--state-success)]/15 px-3 py-1 text-sm font-medium leading-5 text-[var(--state-success)]">
                  {{ getValue(userAgentInfo) }}
                </span>
              </c-tooltip>
            </span>
          </div>
          <div flex flex-col>
            <span v-for="{ label, getValue, undefinedFallback } in content" :key="label">
              <span v-if="getValue(userAgentInfo) === undefined" op-70>{{ undefinedFallback }}</span>
            </span>
          </div>
        </c-card>
      </div>
    </div>
  </div>
</template>
