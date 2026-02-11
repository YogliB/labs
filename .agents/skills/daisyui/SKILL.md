---
name: daisyui
description: Use when building UI components with Tailwind CSS and DaisyUI
---

# DaisyUI Components

## Overview

DaisyUI is a CSS library for Tailwind CSS that provides class names for common UI components. It allows building responsive, themeable interfaces without writing custom CSS.

## When to Use

- Building web interfaces with Tailwind CSS
- Need pre-built, customizable UI components
- Want semantic color theming and responsive design
- Creating dashboards, forms, or interactive elements

## Core Pattern

Apply DaisyUI component classes to HTML elements, customize with Tailwind utilities, and use semantic color names for theming.

## Quick Reference

See [.agents/references/daisyui.md](.agents/references/daisyui.md) for complete component reference including:

- Installation and configuration
- All component class names and syntax
- Usage rules and best practices
- Color system and theming

## Implementation

1. Install DaisyUI: `npm i -D daisyui@latest`
2. Add to CSS: `@import "tailwindcss"; @plugin "daisyui";`
3. Use component classes: `<button class="btn btn-primary">Click me</button>`

## Common Mistakes

- Using Tailwind colors instead of DaisyUI semantic colors (breaks theming)
- Writing custom CSS when DaisyUI classes exist
- Not using responsive prefixes for layout

## Real-World Impact

Reduces CSS bundle size, ensures consistent theming, speeds up UI development.
