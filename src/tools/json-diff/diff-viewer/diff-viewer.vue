<script lang="ts" setup>
import _ from 'lodash';
import { diff } from '../json-diff.models';
import { DiffRootViewer } from './diff-viewer.models';
import { useAppTheme } from '@/ui/theme/themes';

const props = defineProps<{ leftJson: unknown; rightJson: unknown }>();
const onlyShowDifferences = ref(false);
const { leftJson, rightJson } = toRefs(props);
const appTheme = useAppTheme();

const result = computed(() =>
  diff(leftJson.value, rightJson.value, { onlyShowDifferences: onlyShowDifferences.value }),
);

const jsonAreTheSame = computed(() => _.isEqual(leftJson.value, rightJson.value));
const showResults = computed(() => !_.isUndefined(leftJson.value) && !_.isUndefined(rightJson.value));
</script>

<template>
  <div v-if="showResults">
    <div flex justify-center items-center gap-3>
      <label for="diff-toggle" class="text-sm cursor-pointer select-none" @click="onlyShowDifferences = !onlyShowDifferences">Only show differences</label>
      <input id="diff-toggle" v-model="onlyShowDifferences" type="checkbox" class="sr-only" />
      <span
        class="relative inline-block h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200"
        :class="onlyShowDifferences ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'"
        @click="onlyShowDifferences = !onlyShowDifferences"
      >
        <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="onlyShowDifferences ? 'translate-x-4' : 'translate-x-0'" />
      </span>
    </div>

    <c-card data-test-id="diff-result">
      <div v-if="jsonAreTheSame" text-center op-70>
        The provided JSONs are the same
      </div>
      <DiffRootViewer v-else :diff="result" />
    </c-card>
  </div>
</template>

<style lang="less" scoped>
::v-deep(.diffs-viewer) {
  color: v-bind('appTheme.text.mutedColor');

  & > ul {
    padding-left: 0 !important;
  }

  ul {
    list-style: none;
    padding-left: 20px;
    margin: 0;

    li {
      .updated-line {
        padding: 3px 0;
      }

      .result,
      .array,
      .object,
      .value {
        &:not(:last-child) {
          margin-right: 4px;
        }

        &.added {
          padding: 3px 5px;
          border-radius: 4px;
          background-color: v-bind('appTheme.success.colorFaded');
          color: v-bind('appTheme.success.color');
          .key {
            color: inherit;
          }
        }

        &.removed {
          padding: 3px 5px;
          border-radius: 4px;
          background-color: v-bind('appTheme.error.colorFaded');
          color: v-bind('appTheme.error.color');

          .key {
            color: inherit;
          }
        }
      }

      .value {
        cursor: pointer;
        border: 1px solid transparent;
        transition: border-color 0.2s ease-in-out;

        &.added:hover {
          border-color: v-bind('appTheme.success.color');
        }

        &.removed:hover {
          border-color: v-bind('appTheme.error.color');
        }
      }

      .added .added,
      .removed .removed {
        background-color: transparent;
        color: inherit;
      }

      .key {
        font-weight: 500;
        color: v-bind('appTheme.text.baseColor');
      }
    }
  }
}
</style>
