import React from 'react';
import { Theme } from './types.js';
/**
 * Hook to use the current theme.
 */
export declare function useTheme(): Theme;
/**
 * Props for ThemeProvider.
 */
interface ThemeProviderProperties {
    /** The theme to provide */
    readonly theme: Theme;
    /** Children components */
    readonly children: React.ReactNode;
}
/**
 * Provider component for theme context.
 */
export declare function ThemeProvider({ theme, children, }: ThemeProviderProperties): React.ReactElement;
export {};
