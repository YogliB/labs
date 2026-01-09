import { Theme } from './types.js';

/**
 * Default theme with standard colors.
 */
export const defaultTheme: Theme = {
  name: 'default',
  colors: {
    text: 'white',
    background: undefined, // transparent
    choice: {
      safe: 'green',
      risky: 'yellow',
      meta: 'blue',
    },
    progress: {
      bar: 'cyan',
      text: 'white',
    },
    loading: 'gray',
  },
};

/**
 * Dark theme with darker colors.
 */
export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    text: 'white',
    background: 'black',
    choice: {
      safe: 'green',
      risky: 'red',
      meta: 'magenta',
    },
    progress: {
      bar: 'blue',
      text: 'white',
    },
    loading: 'gray',
  },
};

/**
 * Light theme with lighter colors.
 */
export const lightTheme: Theme = {
  name: 'light',
  colors: {
    text: 'black',
    background: 'white',
    choice: {
      safe: 'green',
      risky: 'orange',
      meta: 'purple',
    },
    progress: {
      bar: 'blue',
      text: 'black',
    },
    loading: 'gray',
  },
};

/**
 * Available themes map.
 */
export const themes: Record<string, Theme> = {
  default: defaultTheme,
  dark: darkTheme,
  light: lightTheme,
};

/**
 * Get theme by name, fallback to default.
 */
export function getTheme(name: string): Theme {
  return themes[name] || defaultTheme;
}
