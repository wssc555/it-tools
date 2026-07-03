<script setup lang="ts">
import { IconCopy } from '@tabler/icons-vue';
import { useCopy } from '@/composable/copy';
import { base64ToText, isValidBase64, textToBase64 } from '@/utils/base64';
import { withDefaultOnError } from '@/utils/defaults';
import WorkbenchPanel from '@/components/workbench/WorkbenchPanel.vue';

const encodeUrlSafe = useStorage('base64-string-converter--encode-url-safe', false);
const decodeUrlSafe = useStorage('base64-string-converter--decode-url-safe', false);

const textInput = ref('');
const base64Output = computed(() => textToBase64(textInput.value, { makeUrlSafe: encodeUrlSafe.value }));
const { copy: copyTextBase64, isJustCopied: isBase64Copied } = useCopy({ source: base64Output, text: 'Base64 string copied to the clipboard' });

const base64Input = ref('');
const textOutput = computed(() =>
  withDefaultOnError(() => base64ToText(base64Input.value.trim(), { makeUrlSafe: decodeUrlSafe.value }), ''),
);
const { copy: copyText, isJustCopied: isTextCopied } = useCopy({ source: textOutput, text: 'String copied to the clipboard' });
const b64ValidationRules = [
  {
    message: 'Invalid base64 string',
    validator: (value: string) => isValidBase64(value.trim(), { makeUrlSafe: decodeUrlSafe.value }),
  },
];
const b64ValidationWatch = [decodeUrlSafe];
</script>

<template>
  <div class="base64-workbench">
    <!-- Encode Section -->
    <WorkbenchPanel label="String to Base64" class="encode-section">
      <div class="section-controls">
        <label class="inline-flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" v-model="encodeUrlSafe" class="sr-only" />
          <span
            class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
            :class="encodeUrlSafe ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'"
            @click="encodeUrlSafe = !encodeUrlSafe"
          >
            <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="encodeUrlSafe ? 'translate-x-4' : 'translate-x-0'" />
          </span>
          <span class="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">{{ encodeUrlSafe ? 'URL Safe' : 'Standard' }}</span>
        </label>
      </div>

      <div class="workbench-split">
        <div class="input-col">
          <label class="field-label">Input string</label>
          <c-input-text
            v-model:value="textInput"
            multiline
            placeholder="Put your string here..."
            rows="4"
            raw-text
            class="field-input"
          />
        </div>
        <div class="output-col">
          <div class="field-label-row">
            <label class="field-label">Base64 output</label>
            <c-tooltip :tooltip="isBase64Copied ? 'Copied!' : 'Copy base64'" position="left">
              <c-button
                circle
                variant="text"
                class="copy-btn"
                :class="{ copied: isBase64Copied }"
                @click="copyTextBase64()"
              >
                <IconCopy size="18" />
              </c-button>
            </c-tooltip>
          </div>
          <div class="output-display">
            <code>{{ base64Output || 'Base64 encoding will appear here' }}</code>
          </div>
        </div>
      </div>
    </WorkbenchPanel>

    <!-- Decode Section -->
    <WorkbenchPanel label="Base64 to String" type="output" class="decode-section">
      <div class="section-controls">
        <label class="inline-flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" v-model="decodeUrlSafe" class="sr-only" />
          <span
            class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
            :class="decodeUrlSafe ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'"
            @click="decodeUrlSafe = !decodeUrlSafe"
          >
            <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="decodeUrlSafe ? 'translate-x-4' : 'translate-x-0'" />
          </span>
          <span class="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">{{ decodeUrlSafe ? 'URL Safe' : 'Standard' }}</span>
        </label>
      </div>

      <div class="workbench-split">
        <div class="input-col">
          <label class="field-label">Base64 string</label>
          <c-input-text
            v-model:value="base64Input"
            multiline
            placeholder="Your base64 string..."
            rows="4"
            :validation-rules="b64ValidationRules"
            :validation-watch="b64ValidationWatch"
            raw-text
            class="field-input"
          />
        </div>
        <div class="output-col">
          <div class="field-label-row">
            <label class="field-label">Decoded string</label>
            <c-tooltip :tooltip="isTextCopied ? 'Copied!' : 'Copy decoded string'" position="left">
              <c-button
                circle
                variant="text"
                class="copy-btn"
                :class="{ copied: isTextCopied }"
                @click="copyText()"
              >
                <IconCopy size="18" />
              </c-button>
            </c-tooltip>
          </div>
          <div class="output-display">
            <code>{{ textOutput || 'Decoded string will appear here' }}</code>
          </div>
        </div>
      </div>
    </WorkbenchPanel>
  </div>
</template>

<style lang="less" scoped>
.base64-workbench {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.section-controls {
  margin-bottom: 12px;
}

.workbench-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.field-label {
  display: block;
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.field-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.field-input {
  ::v-deep(textarea) {
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.5;
    min-height: 80px;
    background: transparent;
    border: none;
    color: var(--text-primary);
    resize: vertical;
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

.output-display {
  background: var(--surface-output, var(--bg-app));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm, 8px);
  padding: 12px;
  min-height: 80px;

  code {
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.5;
    color: var(--text-primary);
    white-space: pre-wrap;
    word-break: break-all;
    display: block;
  }
}

.copy-btn {
  transition: all var(--transition-fast);

  &.copied {
    color: var(--accent-lime) !important;
  }

  &:hover {
    background: rgba(34, 211, 238, 0.1) !important;
  }
}
</style>
