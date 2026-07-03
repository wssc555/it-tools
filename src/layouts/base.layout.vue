<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router';
import { IconHeart, IconHome2, IconMenu2, IconBrandGithub } from '@tabler/icons-vue';

import { storeToRefs } from 'pinia';
import HeroGradient from '../assets/hero-gradient.svg?component';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import ToolCard from '../components/ToolCard.vue';
import { useStyleStore } from '@/stores/style.store';
import { config } from '@/config';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import { useTracker } from '@/modules/tracker/tracker.services';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';

const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = config.app.lastCommitSha.slice(0, 7);

const { tracker } = useTracker();
const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory, selectedCategoryName, selectedCategoryTools } = storeToRefs(toolStore);

const route = useRoute();

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);

function clearCategorySelection() {
  toolStore.selectedCategoryName = null;
}
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="hero-wrapper" @click="clearCategorySelection">
        <HeroGradient class="gradient" />
        <div class="text-wrapper">
          <div class="title">
            IT - TOOLS
          </div>
          <div class="hero-divider" />
          <div class="subtitle">
            {{ $t('home.subtitle') }}
          </div>
        </div>
      </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" class="flex flex-col items-center">
          <locale-selector class="w-[90%]" />

          <div class="flex justify-center">
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <div class="footer">
          <div>
            IT-Tools

            <c-link target="_blank" rel="noopener" :href="`https://github.com/CorentinTh/it-tools/tree/v${version}`">
              v{{ version }}
            </c-link>

            <template v-if="commitSha && commitSha.length > 0">
              -
              <c-link
                target="_blank"
                rel="noopener"
                type="primary"
                :href="`https://github.com/CorentinTh/it-tools/tree/${commitSha}`"
              >
                {{ commitSha }}
              </c-link>
            </template>
          </div>
          <div>
            &copy; {{ new Date().getFullYear() }}
            <c-link target="_blank" rel="noopener" href="https://corentin.tech?utm_source=it-tools&utm_medium=footer">
              Corentin Thomasset
            </c-link>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="navbar" style="background: var(--bg-elevated); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);">
        <c-button
          circle
          variant="text"
          :aria-label="$t('home.toggleMenu')"
          @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
        >
          <IconMenu2 size="22" />
        </c-button>

        <c-tooltip :tooltip="$t('home.home')" position="bottom">
          <c-button to="/" circle variant="text" :aria-label="$t('home.home')" @click="clearCategorySelection">
            <IconHome2 size="22" />
          </c-button>
        </c-tooltip>

        <c-tooltip :tooltip="$t('home.uiLib')" position="bottom">
          <c-button v-if="config.app.env === 'development'" to="/c-lib" circle variant="text" :aria-label="$t('home.uiLib')">
            <IconBrandGithub size="22" />
          </c-button>
        </c-tooltip>

        <command-palette />

        <locale-selector v-if="!styleStore.isSmallScreen" />

        <div>
          <NavbarButtons v-if="!styleStore.isSmallScreen" />
        </div>

        <c-tooltip position="bottom" :tooltip="$t('home.support')">
          <c-button
            round
            href="https://www.buymeacoffee.com/cthmsst"
            rel="noopener"
            target="_blank"
            class="support-button"
            :bordered="false"
            @click="() => tracker.trackEvent({ eventName: 'Support button clicked' })"
          >
            {{ $t('home.buyMeACoffee') }}
            <IconHeart v-if="!styleStore.isSmallScreen" size="18" class="ml-2" />
          </c-button>
        </c-tooltip>
      </div>
      <div class="content-area">
        <!-- Category tools view when a category is selected and on home page -->
        <div v-if="route.path === '/' && selectedCategoryName && selectedCategoryTools.length > 0" class="category-tools-view">
          <div class="category-tools-header">
            <h2 class="category-tools-title">{{ selectedCategoryName }}</h2>
            <c-button variant="text" size="small" @click="clearCategorySelection">
              {{ $t('home.categories.allTools') }}
            </c-button>
          </div>
          <div class="bento-grid">
            <ToolCard v-for="tool in selectedCategoryTools" :key="tool.path" :tool="tool" />
          </div>
        </div>
        <!-- Default slot (home page or tool page) -->
        <slot v-else />
      </div>
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.support-button {
  background: color-mix(in srgb, var(--accent-primary), transparent 88%);
  border: 1px solid color-mix(in srgb, var(--accent-primary), transparent 78%) !important;
  color: var(--accent-primary) !important;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  transition: all var(--transition-base) !important;

  &:hover {
    background: color-mix(in srgb, var(--accent-primary), transparent 80%) !important;
    border-color: color-mix(in srgb, var(--accent-primary), transparent 65%) !important;
    color: var(--accent-primary-hover) !important;
  }
}

.footer {
  text-align: center;
  color: var(--text-muted);
  opacity: 0.6;
  margin-top: 20px;
  padding: 20px 0;
}

.sider-content {
  padding-top: 180px;
  padding-bottom: 200px;
}

.hero-wrapper {
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  z-index: 10;
  overflow: hidden;

  .gradient {
    margin-top: -65px;
  }

  .text-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 16px;
    color: #fff;

    .title {
      font-size: 25px;
      font-weight: 600;
    }

    .hero-divider {
      width: 50px;
      height: 2px;
      border-radius: 4px;
      background-color: var(--accent-primary);
      margin: 0 auto 5px;
    }

    .subtitle {
      font-size: 16px;
    }
  }
}

.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: var(--radius-md, 16px);
  margin-bottom: var(--space-md, 16px);
}

.content-area {
  padding: 0 var(--space-sm, 8px);
}

/* ─── Category tools view ─── */
.category-tools-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.category-tools-title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
</style>