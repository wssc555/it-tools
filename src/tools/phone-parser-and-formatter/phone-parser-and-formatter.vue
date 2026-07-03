<script setup lang="ts">
import { getCountries, getCountryCallingCode, parsePhoneNumber } from 'libphonenumber-js/max';
import lookup from 'country-code-lookup';
import {
  formatTypeToHumanReadable,
  getDefaultCountryCode,
  getFullCountryName,
} from './phone-parser-and-formatter.models';
import { withDefaultOnError } from '@/utils/defaults';
import { booleanToHumanReadable } from '@/utils/boolean';
import { useValidation } from '@/composable/validation';

const rawPhone = ref('');
const defaultCountryCode = ref(getDefaultCountryCode());
const validation = useValidation({
  source: rawPhone,
  rules: [
    {
      validator: value => value === '' || /^[0-9 +\-()]+$/.test(value),
      message: 'Invalid phone number',
    },
  ],
});

const parsedDetails = computed(() => {
  if (!validation.isValid) {
    return undefined;
  }

  const parsed = withDefaultOnError(() => parsePhoneNumber(rawPhone.value, defaultCountryCode.value), undefined);

  if (!parsed) {
    return undefined;
  }

  return [
    { label: 'Country', value: parsed.country },
    { label: 'Country', value: getFullCountryName(parsed.country) },
    { label: 'Country calling code', value: parsed.countryCallingCode },
    { label: 'Is valid?', value: booleanToHumanReadable(parsed.isValid()) },
    { label: 'Is possible?', value: booleanToHumanReadable(parsed.isPossible()) },
    { label: 'Type', value: formatTypeToHumanReadable(parsed.getType()) },
    { label: 'International format', value: parsed.formatInternational() },
    { label: 'National format', value: parsed.formatNational() },
    { label: 'E.164 format', value: parsed.format('E.164') },
    { label: 'RFC3966 format', value: parsed.format('RFC3966') },
  ];
});

const countriesOptions = getCountries().map(code => ({
  label: `${lookup.byIso(code)?.country || code} (+${getCountryCallingCode(code)})`,
  value: code,
}));
</script>

<template>
  <div>
    <c-select v-model:value="defaultCountryCode" label="Default country code:" :options="countriesOptions" searchable class="mb-5" />

    <c-input-text
      v-model:value="rawPhone"
      placeholder="Enter a phone number"
      label="Phone number:"
      :validation="validation"
      class="mb-5"
    />

    <div v-if="parsedDetails" class="overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
      <table class="w-full border-collapse text-sm">
        <tbody>
          <tr v-for="{ label, value } in parsedDetails" :key="label" class="border-b border-[var(--border-subtle)] last:border-b-0">
            <td class="px-4 py-2 font-semibold text-[var(--text-primary)]" style="white-space: nowrap;">{{ label }}</td>
            <td class="px-4 py-2 text-[var(--text-secondary)]">
              <span-copyable v-if="value" :value="value" />
              <span v-else class="opacity-70 text-[var(--text-muted)]">Unknown</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>