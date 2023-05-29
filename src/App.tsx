import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { MoveToTop } from "./components/move-to-top";

function App() {
  return (
    <BrowserRouter>
      <MoveToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
