import React from "react";

import "./assets/styles/design-tokens.css"
import "./assets/styles/theme.css"
import "./assets/styles/base.css"
import "./assets/styles/layout.css"

function App() {
  return (
      <div className="has-aside has-main has-info">
        <header>
          <div className="header-left">
            <button className="hamburger">☰</button>
            <strong>Page title</strong>
          </div>

          <div className="header-right">
            <select>
              <option>EN</option>
              <option>NL</option>
            </select>
          </div>
        </header>

        <div className="app-layout">
          <nav>Menu</nav>
          <main>Main</main>
          <aside>Info</aside>
        </div>

        <div className="app-manage">
          <button className="btn">Manage</button>
        </div>
      </div>
  );
}

export default App;
