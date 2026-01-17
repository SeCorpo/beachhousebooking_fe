import React from "react";

export default function NavItem({
                                    active = false,
                                    disabled = false,
                                    onClick,
                                    children,
                                    icon,
                                }) {
    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };

    return (
        <li
            className={[
                "nav-item",
                active && "is-active",
                disabled && "is-disabled"
            ].filter(Boolean).join(" ")}
            role="presentation"
        >
            <button
                type="button"
                className="nav-link"
                onClick={handleClick}
                disabled={disabled}
                aria-current={active ? "step" : undefined}
                aria-disabled={disabled || undefined}
            >
                {icon ? <span className="nav-icon" aria-hidden="true">{icon}</span> : null}
                <span className="nav-label">{children}</span>
            </button>
        </li>
    );
}
