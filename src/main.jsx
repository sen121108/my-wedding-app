// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./fonts.css"
import EntrySPA from "./Entry/EntrySPA.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/entry" element={<EntrySPA />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);