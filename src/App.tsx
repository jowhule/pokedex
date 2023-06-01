import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NationalDex } from "./pages/national-dex-page";
import { KantoDex } from "./pages/kanto-dex-page";
import { JohtoDex } from "./pages/johto-dex-page";
import { HoennDex } from "./pages/hoenn-dex-page";
import { SinnohDex } from "./pages/sinnoh-dex-page";
import { UnovaDex } from "./pages/unova-dex-page";
import { AlolaDex } from "./pages/alola-dex-page";
import { GalarDex } from "./pages/galar-dex-page";

import { MoveToTop } from "./components/move-to-top";
import { Navbar } from "./components/navbar";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { NAVBAR_HEIGHT } from "./components/navbar/style";
import { PaldeaDex } from "./pages/paldea-dex-page";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0c214a",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Box height={`calc(${NAVBAR_HEIGHT} + 20px)`} />
        <MoveToTop />
        <Routes>
          <Route path="/" element={<NationalDex />} />
          <Route path="/kanto" element={<KantoDex />} />
          <Route path="/johto" element={<JohtoDex />} />
          <Route path="/hoenn" element={<HoennDex />} />
          <Route path="/sinnoh" element={<SinnohDex />} />
          <Route path="/unova" element={<UnovaDex />} />
          <Route path="/alola" element={<AlolaDex />} />
          <Route path="/galar" element={<GalarDex />} />
          <Route path="/paldea" element={<PaldeaDex />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
