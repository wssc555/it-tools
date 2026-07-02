<script setup lang="ts">
import JSON5 from 'json5';
import { useStorage } from '@vueuse/core';
import { Copy } from '@vicons/tabler';
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
        <n-switch v-model:value="sortKeys" />
      </div>
      <div class="control-item">
        <span class="control-label">Indent size</span>
        <n-input-number v-model:value="indentSize" min="0" max="10" class="control-input" />
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
              <n-icon size="20" :component="Copy" />
            </c-button>
          </c-tooltip>
        </template>
        <div class="output-content">
          <n-scrollbar
            x-scrollable
            trigger="none"
          >
            <n-config-provider>
              <n-code
                v-if="cleanJson"
                :code="cleanJson"
                language="json"
                :trim="false"
                data-test-id="area-content"
              />
              <div v-else class="output-placeholder">
                Valid JSON output will appear here
              </div>
            </n-config-provider>
          </n-scrollbar>
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
