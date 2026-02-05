import { createContext } from 'react';

/**
 * ThemeContext
 * ------------
 * Holds the React context object for theming.
 *
 * This file defines only the context shape and default values.
 * It does NOT contain logic or state — that is handled by ThemeProvider.
 *
 * The context provides:
 * - `theme`: current theme ("light" | "dark")
 * - `toggle`: function that switches between light and dark themes
 *
 * Components normally consume the context using `useTheme()`,
 * so many parts of the app never need to import this file directly.
 */

const ThemeContext = createContext({
    theme: 'light',
    toggle: () => {}
});

export default ThemeContext;
