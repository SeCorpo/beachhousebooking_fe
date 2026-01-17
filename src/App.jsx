import React from "react";
// import {useState} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import "./assets/styles/design-tokens.css"
import "./assets/styles/theme.css"
import "./assets/styles/base.css"
import "./assets/styles/layout.css"

import TestPage from "./pages/test/testPage.jsx";
import EmptyPage from "./pages/empty/emptyPage.jsx";

function App() {
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [afterLoginUrl, setAfterLoginUrl] = useState("");

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/test" element={<TestPage />} />
              <Route path="/" element={<EmptyPage />} />
              {/*<Route path="/p/:beachhousename" element={<ReservationController />} />*/}

          </Routes>
      </BrowserRouter>
  );
}

export default App;
