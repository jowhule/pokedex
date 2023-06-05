import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  PokemonDataResponseType,
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
import { pokemonDataDefault } from "../../utils/defaults";

export type PokedexDisplayrops = {
  generation: string;
};

// the region is not in https://pokeapi.co/api/v2/pokedex yet
const NO_POKEDEX_REGIONS: string[] = ["paldea", "galar"];

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
    if (NO_POKEDEX_REGIONS.includes(generation)) {
      sendGenericAPIRequest<PokemonDexResponseType>(
        requestLinks.getPokedex("national")
      ).then((data) => {
        if (data) {
          switch (generation) {
            case "galar":
              setPokedexEntries(data.pokemon_entries.slice(809, 898));
              break;
            case "paldea":
              setPokedexEntries(data.pokemon_entries.slice(905, 1010));
              break;
          }
        }
      });
    } else {
      sendGenericAPIRequest<PokemonDexResponseType>(
        requestLinks.getPokedex(generation)
      ).then((data) => {
        if (data) setPokedexEntries(data.pokemon_entries);
      });
    }
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
