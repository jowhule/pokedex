import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { sendGenericAPIRequest } from "./services/apiRequests";
import {
  PokemonApiResponseType,
  PokemonNameResponseType,
} from "./services/apiRequestsTypes";

export const POKEMON_MAX_NUM = 10000;

export const triggerStorePokemonPromise = async (): Promise<
  PokemonNameResponseType[]
> => {
  const storePokemonPromise = new Promise<PokemonNameResponseType[]>(
    (resolve, reject) => {
      sendGenericAPIRequest<PokemonApiResponseType>(
        `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_MAX_NUM}&offset=0`
      ).then((data) => {
        if (data) {
          localStorage.setItem("pokemons", JSON.stringify(data.results));
          resolve(data.results);
        } else {
          reject();
        }
      });
    }
  );

  return storePokemonPromise;
};

function App() {
  // store locally so don't have to keep making requests
  if (!localStorage.getItem("pokemons")) triggerStorePokemonPromise();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
