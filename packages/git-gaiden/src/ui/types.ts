/**
 * Color scheme for the CLI UI.
 */
export interface ThemeColors {
	/** Default text color */
	readonly text: string;
	/** Background color for components */
	readonly background?: string;
	/** Colors for different choice types */
	readonly choice: {
		readonly safe: string;
		readonly risky: string;
		readonly meta: string;
	};
	/** Colors for progress bar */
	readonly progress: {
		readonly bar: string;
		readonly text: string;
	};
	/** Color for loading indicators */
	readonly loading: string;
}

/**
 * Complete theme configuration.
 */
export interface Theme {
	/** Name of the theme */
	readonly name: string;
	/** Color scheme */
	readonly colors: ThemeColors;
}
