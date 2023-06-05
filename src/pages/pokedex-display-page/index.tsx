import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  PokemonDataResponseType,
  PokemonDexResponseType,
  PokemonPokedexEntryType,
  PokemonSpeciesResponseType,
} from "../../services/apiRequestsTypes";
import { pageContainerStyle } from "./style";
import {
  requestLinks,
  sendGenericAPIRequest,
} from "../../services/apiRequests";
import { PokedexDisplay } from "./pokedex-display";
import { MoreInfoSlide } from "../../components/more-info-slide";
import {
  pokemonDataDefault,
  pokemonSpeciesDefault,
} from "../../utils/defaults";
import { getIdFromLink } from "../../utils/helpers";

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
  const [pokedexData, setPokedexData] = useState<
    Record<string, PokemonDataResponseType>
  >({});
  const [pokedexSpecies, setPokedexSpecies] = useState<
    Record<string, PokemonSpeciesResponseType>
  >({});

  const [activePokemon, setActivePokemon] = useState<string | number>("");

  // initialise
  useEffect(() => {
    setActivePokemon("");
    setPokedexData({});
    setPokedexSpecies({});
    setHasLoaded(false);

    if (generation === "kalos") {
      sendGenericAPIRequest<PokemonDexResponseType>(
        requestLinks.getPokedex("kalos-central")
      ).then((kalos_one) => {
        if (kalos_one) {
          sendGenericAPIRequest<PokemonDexResponseType>(
            requestLinks.getPokedex("kalos-coastal")
          ).then((kalos_two) => {
            if (kalos_two) {
              sendGenericAPIRequest<PokemonDexResponseType>(
                requestLinks.getPokedex("kalos-mountain")
              ).then((kalos_three) => {
                if (kalos_three) {
                  setPokedexEntries([
                    ...kalos_one.pokemon_entries,
                    ...kalos_two.pokemon_entries,
                    ...kalos_three.pokemon_entries,
                  ]);
                }
              });
            }
          });
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
      const dataHolder: Record<string, PokemonDataResponseType> = {};
      const speciesHolder: Record<string, PokemonSpeciesResponseType> = {};

      for (const entry of pokedexEntries) {
        const speciesName = entry.pokemon_species.name;
        dataHolder[speciesName] = pokemonDataDefault;
        speciesHolder[speciesName] = pokemonSpeciesDefault;

        const id = parseInt(getIdFromLink(entry.pokemon_species.url));
        sendGenericAPIRequest<PokemonDataResponseType>(
          requestLinks.getData(id)
        ).then((data) => {
          if (data && !dataHolder[speciesName].name)
            dataHolder[speciesName] = data;
        });

        sendGenericAPIRequest<PokemonSpeciesResponseType>(
          requestLinks.getSpecies(id)
        ).then((species) => {
          if (species) {
            speciesHolder[speciesName] = species;
            for (const variety of species.varieties) {
              // check for regional forms
              if (variety.pokemon.name.match(new RegExp(`-${generation}`))) {
                // regional form found
                sendGenericAPIRequest<PokemonDataResponseType>(
                  requestLinks.getData(getIdFromLink(variety.pokemon.url))
                ).then((data) => {
                  if (data) {
                    dataHolder[speciesName] = data;
                    dataHolder[speciesName].id = id;
                  }
                });
              }
            }
          }
        });
      }
      setPokedexData(dataHolder);
      setPokedexSpecies(speciesHolder);
    }
  }, [generation, pokedexEntries]);

  // pokemon list finished fetching from api
  useEffect(() => {
    if (
      Object.keys(pokedexData).length > 0 &&
      Object.keys(pokedexSpecies).length > 0
    ) {
      setHasLoaded(true);
    }
  }, [pokedexData, pokedexSpecies]);

  return (
    <Box sx={pageContainerStyle}>
      <Box width="100%">
        <PokedexDisplay
          generation={generation}
          pokedexEntries={pokedexEntries}
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
