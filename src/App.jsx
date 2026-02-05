import React from "react";
// import {useState} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import {defaultOptions} from "./utils/toastHelper.jsx";

import "./assets/styles/design-tokens.css"
import "./assets/styles/theme.css"
import "./assets/styles/base.css"
import "./assets/styles/layout.css"

import "./assets/styles/components/buttons.css"
import "./assets/styles/components/cards.css"

import TestPage from "./pages/test/testPage.jsx";
import EmptyPage from "./pages/empty/emptyPage.jsx";
import ReservationController from "./pages/reservation/reservationController.jsx";
import ThemeProvider from "./contexts/theme/ThemeProvider.jsx";

function App() {
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [afterLoginUrl, setAfterLoginUrl] = useState("");

  return (
      <ThemeProvider>
          <BrowserRouter>
              <ToastContainer {...defaultOptions} />
              <Routes>
                  <Route path="/" element={<TestPage />} />
                  <Route path="/mt" element={<EmptyPage />} />
                  <Route path="/p/:beachhousename" element={<ReservationController />} />
              </Routes>
          </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
