import axios from "axios";

const API = "https://pokeapi.co/api/v2/";

export const requestLinks = {
  getData: (nameId: number | string): string => {
    return API + `pokemon/${nameId}`;
  },
  getSpecies: (nameId: string | number): string => {
    return API + `pokemon-species/${nameId}`;
  },
  getPokedex: (pokedexName: string): string => {
    return API + `pokedex/${pokedexName}`;
  },
  getAnimatedSprite: (id: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
  },
  getItemSprite: (name: string): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`;
  },
  getTMType: (type: string): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${type}.png`;
  },
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
