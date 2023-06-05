import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  PokemonDataResponseType,
  PokemonDexResponseType,
  PokemonPokedexEntryType,
} from "../../services/apiRequestsTypes";
import { pageContainerStyle } from "./style";
import {
  requestLinks,
  sendGenericAPIRequest,
} from "../../services/apiRequests";
import { PokedexDisplay } from "./pokedex-display";
import { MoreInfoSlide } from "../../components/more-info-slide";
import { pokemonDataDefault } from "../../utils/defaults";

export type PokedexDisplayrops = {
  generation: string;
};

export const PokedexDisplayPage: React.FC<PokedexDisplayrops> = ({
  generation,
}) => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [pokedexEntries, setPokedexEntries] = useState<
    PokemonPokedexEntryType[]
  >([]);
  const [activePokemon, setActivePokemon] = useState<string | number>("");

  const [pokedexData, setPokedexData] = useState<
    Record<string, PokemonDataResponseType>
  >({});

  // get all pokemon names
  useEffect(() => {
    setActivePokemon("");
    setHasLoaded(false);

    sendGenericAPIRequest<PokemonDexResponseType>(
      requestLinks.getPokedex(generation)
    ).then((data) => {
      if (data) setPokedexEntries(data.pokemon_entries);
    });
  }, [generation]);

  // get all pokemon's data
  useEffect(() => {
    if (pokedexEntries.length > 0) {
      const entriesHolder: Record<string, PokemonDataResponseType> = {};
      for (const entry of pokedexEntries) {
        entriesHolder[entry.pokemon_species.name] = pokemonDataDefault;
        const id = parseInt(entry.pokemon_species.url.split("/")[6]);
        sendGenericAPIRequest<PokemonDataResponseType>(
          requestLinks.getData(id)
        ).then((data) => {
          if (data) entriesHolder[entry.pokemon_species.name] = data;
        });
      }
      setPokedexData(entriesHolder);
    }
  }, [pokedexEntries]);

  // pokemon list finished fetching from api
  useEffect(() => {
    if (Object.keys(pokedexData).length > 0) {
      setHasLoaded(true);
    }
  }, [pokedexData]);

  return (
    <Box sx={pageContainerStyle}>
      <Box width="100%">
        <PokedexDisplay
          pokedexList={pokedexEntries}
          pokedexData={pokedexData}
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
