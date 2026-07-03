<script setup lang="ts">
import {
  chineseSimplifiedWordList,
  chineseTraditionalWordList,
  czechWordList,
  englishWordList,
  entropyToMnemonic,
  frenchWordList,
  generateEntropy,
  italianWordList,
  japaneseWordList,
  koreanWordList,
  mnemonicToEntropy,
  portugueseWordList,
  spanishWordList,
} from '@it-tools/bip39';
import { IconCopy, IconRefresh } from '@tabler/icons-vue';

import { useCopy } from '@/composable/copy';
import { useValidation } from '@/composable/validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';

const languages = {
  'English': englishWordList,
  'Chinese simplified': chineseSimplifiedWordList,
  'Chinese traditional': chineseTraditionalWordList,
  'Czech': czechWordList,
  'French': frenchWordList,
  'Italian': italianWordList,
  'Japanese': japaneseWordList,
  'Korean': koreanWordList,
  'Portuguese': portugueseWordList,
  'Spanish': spanishWordList,
};

const entropy = ref(generateEntropy());
const passphraseInput = ref('');

const language = ref<keyof typeof languages>('English');
const passphrase = computed({
  get() {
    return withDefaultOnError(() => entropyToMnemonic(entropy.value, languages[language.value]), passphraseInput.value);
  },
  set(value: string) {
    passphraseInput.value = value;
    entropy.value = withDefaultOnError(() => mnemonicToEntropy(value, languages[language.value]), '');
  },
});

const entropyValidation = useValidation({
  source: entropy,
  rules: [
    {
      validator: value => value === '' || (value.length <= 32 && value.length >= 16 && value.length % 4 === 0),
      message: 'Entropy length should be >= 16, <= 32 and be a multiple of 4',
    },
    {
      validator: value => /^[a-fA-F0-9]*$/.test(value),
      message: 'Entropy should be an hexadecimal string',
    },
  ],
});

const mnemonicValidation = useValidation({
  source: passphrase,
  rules: [
    {
      validator: value => isNotThrowing(() => mnemonicToEntropy(value, languages[language.value])),
      message: 'Invalid mnemonic',
    },
  ],
});

function refreshEntropy() {
  entropy.value = generateEntropy();
}

const { copy: copyEntropy } = useCopy({ source: entropy, text: 'Entropy copied to the clipboard' });
const { copy: copyPassphrase } = useCopy({ source: passphrase, text: 'Passphrase copied to the clipboard' });
</script>

<template>
  <div>
    <div class="grid grid-cols-3 gap-3 mb-4">
      <div class="col-span-1">
        <c-select
          v-model:value="language"
          searchable
          label="Language:"
          :options="Object.keys(languages)"
        />
      </div>
      <div class="col-span-2">
        <div class="mb-1">
          <label class="text-sm font-medium text-[var(--text-secondary)]">Entropy (seed):</label>
          <span v-if="entropyValidation.message" class="text-xs ml-2" :class="entropyValidation.status === 'error' ? 'text-[var(--state-danger)]' : 'text-[var(--text-muted)]'">{{ entropyValidation.message }}</span>
        </div>
        <div class="flex items-center gap-1">
          <c-input-text v-model:value="entropy" placeholder="Your string..." class="flex-1" />
          <c-button @click="refreshEntropy()">
            <IconRefresh size="22" />
          </c-button>
          <c-button @click="copyEntropy()">
            <IconCopy size="22" />
          </c-button>
        </div>
      </div>
    </div>
    <div class="mb-1">
      <label class="text-sm font-medium text-[var(--text-secondary)]">Passphrase (mnemonic):</label>
      <span v-if="mnemonicValidation.message" class="text-xs ml-2" :class="mnemonicValidation.status === 'error' ? 'text-[var(--state-danger)]' : 'text-[var(--text-muted)]'">{{ mnemonicValidation.message }}</span>
    </div>
    <div class="flex items-center gap-1">
      <c-input-text v-model:value="passphrase" placeholder="Your mnemonic..." raw-text class="flex-1" />
      <c-button @click="copyPassphrase()">
        <IconCopy size="22" />
      </c-button>
    </div>
  </div>
</template>
