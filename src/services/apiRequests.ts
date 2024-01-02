import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
const axios = setupCache(Axios);

const API = "https://pokeapi.co/api/v2/";

export const requestLinks = {
  getData: (nameId: number | string): string => API + `pokemon/${nameId}`,
  getSpecies: (nameId: string | number): string =>
    API + `pokemon-species/${nameId}`,
  getPokedex: (pokedexName: string): string => API + `pokedex/${pokedexName}`,
  getForm: (formId: number): string => API + `pokemon-form/${formId}`,
  getSprite: (id: number): string => {
    if (id > 650) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    } else {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
    }
  },
  getStillSprite: (id: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  },
  getItemSprite: (name: string): string =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`,
  getTMType: (type: string): string =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${type}.png`,
};

// using pokemon api, only get request
export const sendGenericAPIRequest = async <T>(
  url: string,
  errorHandler?: () => void
): Promise<T | void> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await axios.get(url, { headers });
    if (response) return response.data;
  } catch (err) {
    if (errorHandler) errorHandler();
  }
};
