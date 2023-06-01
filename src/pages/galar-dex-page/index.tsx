import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  PokemonDexResponseType,
  PokemonPokedexEntryType,
} from "../../services/apiRequestsTypes";
import { pageContainerStyle } from "../style";
import {
  requestLinks,
  sendGenericAPIRequest,
} from "../../services/apiRequests";
import { PokedexDisplay } from "../../components/pokedex-display";
import { MoreInfoSlide } from "../../components/more-info-slide";

export const GalarDex: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [nationalDex, setNationalDex] = useState<PokemonPokedexEntryType[]>([]);
  const [activePokemon, setActivePokemon] = useState<string | number>("");

  // pokemon list finished fetching from api
  useEffect(() => {
    if (nationalDex.length !== 0) setHasLoaded(true);
  }, [nationalDex]);

  // get all pokemon names
  useEffect(() => {
    sendGenericAPIRequest<PokemonDexResponseType>(
      requestLinks.getPokedex("national")
    ).then((data) => {
      if (data) setNationalDex(data.pokemon_entries.slice(809, 897));
    });
  }, []);

  return (
    <Box sx={pageContainerStyle}>
      <Box width="100%">
        <PokedexDisplay
          pokedexList={nationalDex}
          displaySearch
          listLoaded={hasLoaded}
          setActivePokemon={setActivePokemon}
        />
      </Box>
      <Box>
        <MoreInfoSlide
          activePokemon={activePokemon}
          setActivePokemon={setActivePokemon}
        />
      </Box>
    </Box>
  );
};
