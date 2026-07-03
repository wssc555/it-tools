<script setup lang="ts">
import { createToken } from './token-generator.service';
import { useCopy } from '@/composable/copy';
import { useQueryParam } from '@/composable/queryParams';
import { computedRefreshable } from '@/composable/computedRefreshable';

const length = useQueryParam({ name: 'length', defaultValue: 64 });
const withUppercase = useQueryParam({ name: 'uppercase', defaultValue: true });
const withLowercase = useQueryParam({ name: 'lowercase', defaultValue: true });
const withNumbers = useQueryParam({ name: 'numbers', defaultValue: true });
const withSymbols = useQueryParam({ name: 'symbols', defaultValue: false });
const { t } = useI18n();

const [token, refreshToken] = computedRefreshable(() =>
  createToken({
    length: length.value,
    withUppercase: withUppercase.value,
    withLowercase: withLowercase.value,
    withNumbers: withNumbers.value,
    withSymbols: withSymbols.value,
  }),
);

const { copy } = useCopy({ source: token, text: t('tools.token-generator.copied') });
</script>

<template>
  <div>
    <c-card>
      <div flex justify-center>
          <div>
            <div class="flex items-center justify-between gap-3 mb-2" style="min-width: 200px">
              <span class="text-sm text-[var(--text-secondary)]">{{ t('tools.token-generator.uppercase') }}</span>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="withUppercase" class="sr-only" />
                <span class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200" :class="withUppercase ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'" @click="withUppercase = !withUppercase">
                  <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="withUppercase ? 'translate-x-4' : 'translate-x-0'" />
                </span>
              </label>
            </div>
            <div class="flex items-center justify-between gap-3 mb-2" style="min-width: 200px">
              <span class="text-sm text-[var(--text-secondary)]">{{ t('tools.token-generator.lowercase') }}</span>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="withLowercase" class="sr-only" />
                <span class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200" :class="withLowercase ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'" @click="withLowercase = !withLowercase">
                  <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="withLowercase ? 'translate-x-4' : 'translate-x-0'" />
                </span>
              </label>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between gap-3 mb-2" style="min-width: 200px">
              <span class="text-sm text-[var(--text-secondary)]">{{ t('tools.token-generator.numbers') }}</span>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="withNumbers" class="sr-only" />
                <span class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200" :class="withNumbers ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'" @click="withNumbers = !withNumbers">
                  <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="withNumbers ? 'translate-x-4' : 'translate-x-0'" />
                </span>
              </label>
            </div>
            <div class="flex items-center justify-between gap-3 mb-2" style="min-width: 200px">
              <span class="text-sm text-[var(--text-secondary)]">{{ t('tools.token-generator.symbols') }}</span>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="withSymbols" class="sr-only" />
                <span class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200" :class="withSymbols ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'" @click="withSymbols = !withSymbols">
                  <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="withSymbols ? 'translate-x-4' : 'translate-x-0'" />
                </span>
              </label>
            </div>
          </div>
        </div>

      <div class="flex items-center justify-between gap-3 mb-4">
        <span class="text-sm text-[var(--text-secondary)]">{{ t('tools.token-generator.length') }} ({{ length }})</span>
        <div class="flex items-center gap-3 flex-1 max-w-[400px]">
          <input type="range" v-model.number="length" :step="1" :min="1" :max="512" class="flex-1 accent-[var(--accent-cyan)]" />
          <span class="text-sm font-mono w-10 text-right">{{ length }}</span>
        </div>
      </div>

      <c-input-text
        v-model:value="token"
        multiline
        :placeholder="t('tools.token-generator.tokenPlaceholder')"
        readonly
        rows="3"
        autosize
        class="token-display"
      />

      <div mt-5 flex justify-center gap-3>
        <c-button @click="copy()">
          {{ t('tools.token-generator.button.copy') }}
        </c-button>
        <c-button @click="refreshToken">
          {{ t('tools.token-generator.button.refresh') }}
        </c-button>
      </div>
    </c-card>
  </div>
</template>

<style scoped lang="less">
::v-deep(.token-display) {
  textarea {
    text-align: center;
  }
}
</style>
