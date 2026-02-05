import React, { useEffect, useState } from 'react';
import ThemeContext from './ThemeContext.jsx';

/**
 * ThemeProvider
 * -------------
 * React provider component that manages and persists the active theme.
 *
 * Responsibilities:
 * - Detect user's preferred color scheme (dark / light)
 * - Load stored theme from localStorage (if available)
 * - Keep `theme` state and update it when toggled
 * - Apply the theme to <html> via the `data-theme` attribute
 * - Persist theme changes to localStorage (with a safe try/catch)
 *
 * Usage:
 * Wrap your root component with <ThemeProvider> to make
 * `{ theme, toggle }` available throughout the app.
 *
 * Typically consumed using the `useTheme()` hook.
 */

export default function ThemeProvider({ children }) {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    const defaultTheme = stored || (prefersDark ? 'dark' : 'light');
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('theme', theme);
        } catch {
            /* ignore */
        }
    }, [theme]);

    const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}
