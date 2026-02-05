import React from "react";
import ThemeToggle from "../ThemeToggle.jsx";

export default function Header({ title }) {
    return (
        <header className="app-header">
            <div className="header-left">
                <strong>{title}</strong>
            </div>

            <div className="header-right">
                <ThemeToggle />
                Header Right: languageSwitch
            </div>
        </header>
    );
}
