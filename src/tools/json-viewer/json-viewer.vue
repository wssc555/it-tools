<script setup lang="ts">
import JSON5 from 'json5';
import { useStorage } from '@vueuse/core';
import { IconCopy } from '@tabler/icons-vue';
import { formatJson } from './json.models';
import { withDefaultOnError } from '@/utils/defaults';
import { useValidation } from '@/composable/validation';
import { useCopy } from '@/composable/copy';
import WorkbenchPanel from '@/components/workbench/WorkbenchPanel.vue';

const inputElement = ref<HTMLElement>();

const rawJson = useStorage('json-prettify:raw-json', '{"hello": "world", "foo": "bar"}');
const indentSize = useStorage('json-prettify:indent-size', 3);
const sortKeys = useStorage('json-prettify:sort-keys', true);
const cleanJson = computed(() => withDefaultOnError(() => formatJson({ rawJson, indentSize, sortKeys }), ''));

const rawJsonValidation = useValidation({
  source: rawJson,
  rules: [
    {
      validator: v => v === '' || JSON5.parse(v),
      message: 'Provided JSON is not valid.',
    },
  ],
});

const { copy: copyOutput, isJustCopied } = useCopy({ source: cleanJson, createToast: false });
</script>

<template>
  <div class="json-workbench">
    <!-- Controls Row -->
    <div class="controls-row">
      <div class="control-item">
        <span class="control-label">Sort keys</span>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="sortKeys" class="sr-only" />
          <span
            class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
            :class="sortKeys ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'"
            @click="sortKeys = !sortKeys"
          >
            <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="sortKeys ? 'translate-x-4' : 'translate-x-0'" />
          </span>
        </label>
      </div>
      <div class="control-item">
        <span class="control-label">Indent size</span>
        <input
          v-model.number="indentSize"
          type="number"
          min="0"
          max="10"
          class="w-20 rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]"
        />
      </div>
    </div>

    <!-- Workbench: Input / Output -->
    <div class="workbench-split">
      <WorkbenchPanel
        label="Raw JSON"
        class="input-panel"
        :class="{ 'has-error': rawJsonValidation.status === 'error' }"
        mono
      >
        <template #actions>
          <div v-if="rawJsonValidation.status === 'error'" class="validation-error">
            {{ rawJsonValidation.message }}
          </div>
        </template>
        <c-input-text
          ref="inputElement"
          v-model:value="rawJson"
          placeholder="Paste your raw JSON here..."
          rows="16"
          multiline
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          class="json-input"
        />
      </WorkbenchPanel>

      <WorkbenchPanel
        label="Formatted JSON"
        type="output"
        class="output-panel"
        mono
      >
        <template #actions>
          <c-tooltip :tooltip="isJustCopied ? 'Copied!' : 'Copy to clipboard'" position="left">
            <c-button
              circle
              variant="text"
              class="copy-btn"
              :class="{ copied: isJustCopied }"
              @click="copyOutput()"
            >
              <IconCopy size="20" />
            </c-button>
          </c-tooltip>
        </template>
        <div class="output-content">
          <div class="overflow-auto">
              <pre
                v-if="cleanJson"
                class="m-0 p-0 text-[13px] leading-relaxed font-mono text-[var(--text-primary)] whitespace-pre"
                data-test-id="area-content"
              >{{ cleanJson }}</pre>
              <div v-else class="output-placeholder">
                Valid JSON output will appear here
              </div>
            </div>
        </div>
      </WorkbenchPanel>
    </div>
  </div>
</template>

<style lang="less" scoped>
.json-workbench {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.controls-row {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 4px 0;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-label {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-secondary);
}

.control-input {
  width: 80px;
}

.workbench-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.input-panel {
  &.has-error {
    border-color: rgba(248, 113, 113, 0.4);
  }
}

.json-input {
  ::v-deep(textarea) {
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.6;
    min-height: 280px;
    resize: vertical;
    background: transparent;
    border: none;
    color: var(--text-primary);
    padding: 0;
    width: 100%;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--text-muted);
    }
  }
}

.validation-error {
  font-size: 12px;
  color: #f87171;
  font-weight: 500;
}

.output-panel {
  .output-content {
    min-height: 280px;
    max-height: 600px;
    overflow: auto;
  }

  .output-placeholder {
    color: var(--text-muted);
    font-size: 14px;
    padding: 20px 0;
    font-family: var(--font-body);
  }
}

.copy-btn {
  transition: all var(--transition-fast);

  &.copied {
    color: var(--accent-lime) !important;

    &:hover {
      color: var(--accent-lime-hover) !important;
    }
  }

  &:hover {
    background: rgba(34, 211, 238, 0.1) !important;
  }
}
</style>
