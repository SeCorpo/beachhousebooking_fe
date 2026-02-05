import { useContext } from 'react';
import ThemeContext from './ThemeContext.jsx';

/**
 * useTheme hook
 * --------------
 * Convenience hook that exposes the theme context values.
 *
 * Instead of importing and calling:
 *     useContext(ThemeContext)
 *
 * Components can simply use:
 *     const { theme, toggle } = useTheme();
 *
 * This keeps consumption consistent, clean, and decoupled from
 * the internal context implementation.
 */

export function useTheme() {
    return useContext(ThemeContext);
}
