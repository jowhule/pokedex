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

  const getKalosDex = async () => {
    const kalosPromises: Promise<void | PokemonDexResponseType>[] = [
      sendGenericAPIRequest<PokemonDexResponseType>(
        requestLinks.getPokedex("kalos-central")
      ),
      sendGenericAPIRequest<PokemonDexResponseType>(
        requestLinks.getPokedex("kalos-coastal")
      ),
      sendGenericAPIRequest<PokemonDexResponseType>(
        requestLinks.getPokedex("kalos-mountain")
      ),
    ];

    Promise.all(kalosPromises).then((responses) => {
      let kalosDex: PokemonPokedexEntryType[] = [];
      for (const response of responses) {
        if (response) kalosDex = [...kalosDex, ...response.pokemon_entries];
      }
      setPokedexEntries([...kalosDex]);
    });
  };

  // get all pokemon data
  useEffect(() => {
    setActivePokemon("");
    setHasLoaded(false);

    if (generation === "kalos") {
      getKalosDex();
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
      const dataPromises: Promise<void | PokemonDataResponseType>[] = [];
      const entriesHolder: Record<string, PokemonDataResponseType> = {};
      for (const entry of pokedexEntries) {
        entriesHolder[entry.pokemon_species.name] = pokemonDataDefault;
        const id = parseInt(entry.pokemon_species.url.split("/")[6]);
        dataPromises.push(
          sendGenericAPIRequest<PokemonDataResponseType>(
            requestLinks.getData(id)
          ).then((data) => {
            if (data) entriesHolder[entry.pokemon_species.name] = data;
          })
        );
      }
      Promise.allSettled(dataPromises).then(() =>
        setPokedexData(entriesHolder)
      );
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
          generation={generation}
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
