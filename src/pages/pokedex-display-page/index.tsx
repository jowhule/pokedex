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
import { PokedexDisplay } from "./pokedex-display";
import { MoreInfoSlide } from "../../components/more-info-slide";

export type PokedexDisplayrops = {
  generation: string;
};

export const PokedexDisplayPage: React.FC<PokedexDisplayrops> = ({
  generation,
}) => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [nationalDex, setNationalDex] = useState<PokemonPokedexEntryType[]>([]);
  const [activePokemon, setActivePokemon] = useState<string | number>("");

  // pokemon list finished fetching from api
  useEffect(() => {
    nationalDex.length !== 0 ? setHasLoaded(true) : setHasLoaded(false);
  }, [nationalDex]);

  // get all pokemon names
  useEffect(() => {
    setActivePokemon("");
    setHasLoaded(false);
    sendGenericAPIRequest<PokemonDexResponseType>(
      requestLinks.getPokedex(generation)
    ).then((data) => {
      if (data) setNationalDex(data.pokemon_entries);
    });
  }, [generation]);

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
