import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  PokemonApiResponseType,
  PokemonNameResponseType,
} from "../../services/apiRequestsTypes";
import { homePageContainerStyle } from "./style";
import { sendGenericAPIRequest } from "../../services/apiRequests";
import { PokedexDisplay } from "../../components/pokedex-display";

export const POKEMON_MAX_NUM = 1010;

export const HomePage: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [allPokemonNames, setAllPokemonNames] = useState<
    PokemonNameResponseType[]
  >([]);

  // pokemon list finished fetching from api
  useEffect(() => {
    if (Object.keys(allPokemonNames).length !== 0) setHasLoaded(true);
  }, [allPokemonNames]);

  // get all pokemon names
  useEffect(() => {
    sendGenericAPIRequest<PokemonApiResponseType>(
      `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_MAX_NUM}&offset=0`
    ).then((data) => {
      if (data) setAllPokemonNames(data.results);
    });
  }, []);

  return (
    <Box sx={homePageContainerStyle}>
      <Box width="100%">
        <PokedexDisplay
          pokedexList={allPokemonNames}
          displaySearch
          listLoaded={hasLoaded}
        />
      </Box>
      <Box></Box>
    </Box>
  );
};
