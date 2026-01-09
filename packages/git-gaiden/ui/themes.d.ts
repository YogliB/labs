import { Theme } from './types.js';
/**
 * Default theme with standard colors.
 */
export declare const defaultTheme: Theme;
/**
 * Dark theme with darker colors.
 */
export declare const darkTheme: Theme;
/**
 * Light theme with lighter colors.
 */
export declare const lightTheme: Theme;
/**
 * Available themes map.
 */
export declare const themes: Record<string, Theme>;
/**
 * Get theme by name, fallback to default.
 */
export declare function getTheme(name: string): Theme;
