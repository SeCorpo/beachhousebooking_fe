import React, {useState} from "react";
import Header from "../../components/layout/Header.jsx";
import Nav from "../../components/layout/Nav.jsx";
import NavItem from "../../components/layout/NavItem.jsx";

export default function TestPage() {
    const [active, setActive] = useState("dashboard");

    return (
        <>
            <Header title="Page title" />

            <div className="app-layout">
                <Nav ariaLabel="Main navigation">
                    <NavItem
                        active={active === "dashboard"}
                        onClick={() => setActive("dashboard")}
                    >
                        Dashboard
                    </NavItem>

                    <NavItem
                        active={active === "sessions"}
                        onClick={() => setActive("sessions")}
                    >
                        Sessions
                    </NavItem>

                    <NavItem
                        active={active === "settings"}
                        onClick={() => setActive("settings")}
                    >
                        Settings
                    </NavItem>
                </Nav>

                <main className="app-main">
                    Main
                </main>

                <aside className="app-aside">
                    Aside (for extra info)
                </aside>
            </div>

            <div className="app-manage">
                <button className="btn">Manage</button>
            </div>
        </>
    );
}