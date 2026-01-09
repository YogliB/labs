import React, { createContext, useContext } from 'react';
import { Theme } from './types.js';
import { defaultTheme } from './themes.js';

/**
 * Context for theme.
 */
const ThemeContext = createContext<Theme>(defaultTheme);

/**
 * Hook to use the current theme.
 */
export function useTheme(): Theme {
	return useContext(ThemeContext);
}

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
export function ThemeProvider({
	theme,
	children,
}: ThemeProviderProperties): React.ReactElement {
	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
}
