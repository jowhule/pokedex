import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NationalDex } from "./pages/national-dex-page";
import { MoveToTop } from "./components/move-to-top";
import { NAVBAR_HEIGHT, Navbar } from "./components/navbar";
import { Box } from "@mui/material";
import { GenDex } from "./pages/gen-dex-page";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Box sx={{ height: NAVBAR_HEIGHT }} />
      <MoveToTop />
      <Routes>
        <Route path="/" element={<NationalDex />} />
        <Route path="/:dexName" element={<GenDex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
