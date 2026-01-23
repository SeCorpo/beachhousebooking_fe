import React from "react";

export default function Header({ title }) {
    return (
        <header className="app-header">
            <div className="header-left">
                <strong>{title}</strong>
            </div>

            <div className="header-right">
                Header Right: languageSwitch, maybe themeSwitch
            </div>
        </header>
    );
}
