import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  PokemonDexResponseType,
  PokemonPokedexEntryType,
} from "../../services/apiRequestsTypes";
import { homePageContainerStyle } from "./style";
import { sendGenericAPIRequest } from "../../services/apiRequests";
import { PokedexDisplay } from "../../components/pokedex-display";
import { MoreInfoSlide } from "../../components/more-info-slide";

export const HomePage: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [nationalDex, setNationalDex] = useState<PokemonPokedexEntryType[]>([]);
  const [activePokemonUrl, setActivePokemonUrl] = useState<string>("");

  // pokemon list finished fetching from api
  useEffect(() => {
    if (nationalDex.length !== 0) setHasLoaded(true);
  }, [nationalDex]);

  // get all pokemon names
  useEffect(() => {
    sendGenericAPIRequest<PokemonDexResponseType>(
      `https://pokeapi.co/api/v2/pokedex/1`
    ).then((data) => {
      if (data) {
        setNationalDex(data.pokemon_entries);
      }
    });
  }, []);

  return (
    <Box sx={homePageContainerStyle}>
      <Box width="100%">
        <PokedexDisplay
          pokedexList={nationalDex}
          displaySearch
          listLoaded={hasLoaded}
          setActivePokemonUrl={setActivePokemonUrl}
        />
      </Box>
      <Box>
        <Box sx={{ width: "350px" }}></Box>
        <MoreInfoSlide
          activePokemonUrl={activePokemonUrl}
          setActivePokemonUrl={setActivePokemonUrl}
        />
      </Box>
    </Box>
  );
};
