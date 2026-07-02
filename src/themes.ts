import type { GlobalThemeOverrides } from 'naive-ui';

/**
 * IT-Tools Theme Overrides — ui-ux-pro-max Redesign
 *
 * Dark theme: OLED deep base (#060B11) + Neon Cyan (#22D3EE) + Lime (#A3E635)
 * Light theme: Clean slate + refined cyan accents
 */

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: "'IBM Plex Sans', 'Inter', -apple-system, sans-serif",
    fontFamilyMono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",

    primaryColor: '#0891b2',
    primaryColorHover: '#06b6d4',
    primaryColorPressed: '#0e7490',
    primaryColorSuppl: '#06b6d4',

    successColor: '#65a30d',
    successColorHover: '#84cc16',
    successColorPressed: '#4d7c0f',
    successColorSuppl: '#84cc16',

    bodyColor: '#f1f5f9',
    cardColor: '#ffffff',
    modalColor: '#ffffff',
    popoverColor: '#ffffff',
    tableColor: '#ffffff',

    borderColor: 'rgba(0, 0, 0, 0.08)',
    dividerColor: 'rgba(0, 0, 0, 0.08)',
    hoverColor: 'rgba(8, 145, 178, 0.06)',

    borderRadius: '16px',
    borderRadiusSmall: '8px',

    textColor1: '#0f172a',
    textColor2: '#475569',
    textColor3: '#94a3b8',
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: { color: '#f1f5f9' },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: "'IBM Plex Sans', 'Inter', -apple-system, sans-serif",
    fontFamilyMono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",

    primaryColor: '#22d3ee',
    primaryColorHover: '#67e8f9',
    primaryColorPressed: '#06b6d4',
    primaryColorSuppl: '#67e8f9',

    infoColor: '#22d3ee',
    infoColorHover: '#67e8f9',
    infoColorPressed: '#06b6d4',
    infoColorSuppl: '#67e8f9',

    successColor: '#a3e635',
    successColorHover: '#bef264',
    successColorPressed: '#84cc16',
    successColorSuppl: '#bef264',

    warningColor: '#fbbf24',
    warningColorHover: '#fcd34d',
    warningColorPressed: '#f59e0b',

    errorColor: '#f87171',
    errorColorHover: '#fca5a5',
    errorColorPressed: '#ef4444',

    bodyColor: '#060b11',
    cardColor: '#0b1220',
    modalColor: '#101a2b',
    popoverColor: '#101a2b',
    tableColor: '#0b1220',

    borderColor: 'rgba(125, 211, 252, 0.12)',
    dividerColor: 'rgba(125, 211, 252, 0.08)',
    hoverColor: 'rgba(34, 211, 238, 0.08)',

    actionColor: '#101a2b',
    clearColor: '#101a2b',

    borderRadius: '16px',
    borderRadiusSmall: '8px',

    textColor1: '#e6f1ff',
    textColor2: '#a8b3c7',
    textColor3: '#6f7d95',
    placeholderColor: '#6f7d95',
    textColorDisabled: '#6f7d9566',
  },

  Notification: {
    color: '#0b1220',
    textColor: '#e6f1ff',
    border: '1px solid rgba(125, 211, 252, 0.12)',
    borderRadius: '16px',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#101a2b' },
    },
  },

  Menu: {
    itemHeight: '32px',
    color: 'transparent',
    borderColor: 'transparent',
    itemColorActive: 'rgba(34, 211, 238, 0.1)',
    itemTextColorActive: '#22d3ee',
    itemTextColor: '#a8b3c7',
    itemTextColorHover: '#e6f1ff',
    itemColorHover: 'rgba(255, 255, 255, 0.04)',
    arrowColor: '#6f7d95',
  },

  Layout: {
    color: '#060b11',
    headerColor: 'rgba(6, 11, 17, 0.85)',
    siderColor: 'rgba(11, 18, 32, 0.92)',
    siderBorderColor: 'transparent',
    footerColor: '#060b11',
  },

  Card: {
    color: '#0b1220',
    borderColor: 'rgba(125, 211, 252, 0.12)',
    colorModal: '#101a2b',
    borderRadius: '16px',
    paddingHorizontal: '20px',
    paddingVertical: '18px',
  },

  Button: {
    color: 'rgba(255, 255, 255, 0.06)',
    colorHover: 'rgba(255, 255, 255, 0.1)',
    colorPressed: 'rgba(255, 255, 255, 0.18)',
    colorPrimary: '#22d3ee',
    colorPrimaryHover: '#67e8f9',
    colorPrimaryPressed: '#06b6d4',
    textColorPrimary: '#041018',
    borderRadius: '12px',
    borderRadiusSmall: '8px',
    border: '1px solid transparent',
    borderHover: '1px solid rgba(125, 211, 252, 0.2)',
    borderPrimary: '1px solid transparent',
    borderFocus: '1px solid #22d3ee',
    textColor: '#e6f1ff',
    textColorHover: '#e6f1ff',
    heightMedium: '34px',
    fontSizeMedium: '14px',
  },

  Input: {
        color: '#0b1220',
        colorFocus: '#101a2b',
        border: '1px solid rgba(125, 211, 252, 0.1)',
        borderHover: '1px solid rgba(125, 211, 252, 0.25)',
        borderFocus: '1px solid #22d3ee',
        boxShadowFocus: '0 0 0 2px rgba(34, 211, 238, 0.15)',
        borderRadius: '12px',
        textColor: '#e6f1ff',
        placeholderColor: '#6f7d95',
        heightMedium: '40px',
        fontSizeMedium: '15px',
        caretColor: '#22d3ee',
  },

  InternalSelectMenu: {
        color: '#101a2b',
        border: '1px solid rgba(125, 211, 252, 0.12)',
        borderRadius: '12px',
  },

  Dropdown: {
        color: '#101a2b',
        border: '1px solid rgba(125, 211, 252, 0.12)',
        borderRadius: '12px',
  },

  Modal: {
        color: '#101a2b',
        border: '1px solid rgba(125, 211, 252, 0.12)',
        borderRadius: '16px',
  },

  Table: {
        tdColor: '#0b1220',
        thColor: '#101a2b',
        tdColorStriped: '#0d1628',
        borderColor: 'rgba(125, 211, 252, 0.08)',
        borderRadius: '12px',
  },

  Tag: {
        color: 'rgba(34, 211, 238, 0.1)',
        textColor: '#22d3ee',
        border: '1px solid rgba(34, 211, 238, 0.2)',
        borderRadius: '8px',
  },

  Switch: {
        railColor: 'rgba(125, 211, 252, 0.15)',
        railColorActive: '#22d3ee',
  },

  Progress: {
        railColor: 'rgba(125, 211, 252, 0.1)',
        fillColor: '#22d3ee',
  },

  Tooltip: {
        color: '#101a2b',
        border: '1px solid rgba(125, 211, 252, 0.12)',
        borderRadius: '8px',
  },

  Slider: {
        fillColor: '#22d3ee',
        railColor: 'rgba(125, 211, 252, 0.1)',
  },

  Scrollbar: {
        color: 'rgba(125, 211, 252, 0.15)',
        colorHover: 'rgba(125, 211, 252, 0.25)',
  },

  Checkbox: {
        border: '1px solid rgba(125, 211, 252, 0.2)',
        checkMarkColor: '#041018',
        colorChecked: '#22d3ee',
        color: 'transparent',
  },

  Radio: {
        border: '1px solid rgba(125, 211, 252, 0.2)',
        dotColorActive: '#22d3ee',
        colorActive: 'transparent',
  },

  Code: {
        color: '#0b1220',
        border: '1px solid rgba(125, 211, 252, 0.08)',
        borderRadius: '8px',
  },

  Message: {
        color: '#101a2b',
        border: '1px solid rgba(125, 211, 252, 0.12)',
        borderRadius: '12px',
  },
};