import { useDark, useMediaQuery, useToggle } from '@vueuse/core';
import { defineStore } from 'pinia';
import { type Ref, ref, watch } from 'vue';

export const useStyleStore = defineStore('style', {
  state: () => {
    const isDarkTheme = useDark();
    const toggleDark = useToggle(isDarkTheme);
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const isMenuCollapsed = ref(isSmallScreen.value) as Ref<boolean>;

    watch(isSmallScreen, v => (isMenuCollapsed.value = v));

    return {
      isDarkTheme,
      toggleDark,
      isMenuCollapsed,
      isSmallScreen,
    };
  },
});
