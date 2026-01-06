// @ts-check

import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import sonarjs from "eslint-plugin-sonarjs";
import importPlugin from "eslint-plugin-import";
import storybook from "eslint-plugin-storybook";
import unicorn from "eslint-plugin-unicorn";

export default defineConfig([
	eslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	sonarjs.configs.recommended,
	unicorn.configs.recommended,
	importPlugin.flatConfigs.recommended,
	importPlugin.flatConfigs.typescript,
	storybook.configs["flat/recommended"],
	prettier,
]);
