import axios from "axios";

const API = "https://pokeapi.co/api/v2/";

export const requestLinks = {
  getData: (nameId: string | number): string => {
    return API + `pokemon/${nameId}`;
  },
  getSpecies: (nameId: string | number): string => {
    return API + `pokemon-species/${nameId}`;
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
