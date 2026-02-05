import { useTheme } from '../contexts/theme/useTheme.jsx'
import '../assets/styles/components/theme-toggle.css'

export default function ThemeToggle() {
    const { theme, toggle } = useTheme?.() || { theme: 'light', toggle: () => {} };
    const isDark = theme === 'dark';

    return (
        <button
            className="theme-toggle"
            onClick={toggle}
            aria-pressed={isDark}
            aria-label="Toggle theme"
            type="button"
        >
            <div className="icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">
                    {isDark ? (
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
                    ) : (
                        <path d="M12 4a1 1 0 011-1h0a1 1 0 01-1 1zm0 16a1 1 0 011-1h0a1 1 0 01-1 1zm8-8a1 1 0 011-1v0a1 1 0 01-1 1zm-16 0a1 1 0 011-1v0a1 1 0 01-1 1zm13.66-5.66a1 1 0 011.41-1.41v0a1 1 0 01-1.41 1.41zm-11.32 0a1 1 0 011.41-1.41v0a1 1 0 01-1.41 1.41zm11.32 11.32a1 1 0 011.41 1.41v0a1 1 0 01-1.41-1.41zm-11.32 0a1 1 0 011.41 1.41v0a1 1 0 01-1.41-1.41zM12 8a4 4 0 100 8 4 4 0 000-8z" fill="currentColor" />
                    )}
                </svg>
            </div>

            <span className="label">{isDark ? 'Night' : 'Day'}</span>
        </button>
    );
}