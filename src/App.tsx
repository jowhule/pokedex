import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PokedexDisplayPage } from "./pages/pokedex-display-page";

import { MoveToTop } from "./components/move-to-top";
import { Navbar } from "./components/navbar";
import { Box, ThemeProvider } from "@mui/material";
import { NAVBAR_HEIGHT } from "./components/navbar/style";
import { PokemonDetailsPage } from "./pages/pokemon-details-page";
import { ErrorrPage } from "./pages/error-page";
import { LoadProvider } from "./components/context-providers/load-provider";
import { Loader } from "./components/loader";
import { theme } from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadProvider>
        <BrowserRouter>
          <Loader />
          <Navbar />
          <Box height={`calc(${NAVBAR_HEIGHT} + 20px)`} />
          <MoveToTop />
          <Routes>
            <Route
              path="/"
              element={<PokedexDisplayPage generation="national" />}
            />
            <Route
              path="/kanto"
              element={<PokedexDisplayPage generation="kanto" />}
            />
            <Route
              path="/johto"
              element={<PokedexDisplayPage generation="original-johto" />}
            />
            <Route
              path="/hoenn"
              element={<PokedexDisplayPage generation="hoenn" />}
            />
            <Route
              path="/sinnoh"
              element={<PokedexDisplayPage generation="original-sinnoh" />}
            />
            <Route
              path="/unova"
              element={<PokedexDisplayPage generation="original-unova" />}
            />
            <Route
              path="/kalos"
              element={<PokedexDisplayPage generation="kalos" />}
            />
            <Route
              path="/alola"
              element={<PokedexDisplayPage generation="original-alola" />}
            />
            <Route
              path="/galar"
              element={<PokedexDisplayPage generation="galar" />}
            />
            <Route
              path="/hisui"
              element={<PokedexDisplayPage generation="hisui" />}
            />
            <Route
              path="/paldea"
              element={<PokedexDisplayPage generation="paldea" />}
            />
            <Route path="/pokemon/:pokeName" element={<PokemonDetailsPage />} />
            <Route path="/404" element={<ErrorrPage />} />
          </Routes>
        </BrowserRouter>
      </LoadProvider>
    </ThemeProvider>
  );
}

export default App;
