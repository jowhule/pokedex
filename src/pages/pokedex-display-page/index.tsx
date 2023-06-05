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

  const [activePokemon, setActivePokemon] = useState<string>("");
  const [hasReset, setHasReset] = useState<boolean>(false);

  // restart variables onMount
  useEffect(() => {
    setHasReset(false);
    setHasLoaded(false);
  }, [generation]);

  useEffect(() => {
    if (!hasReset) {
      setActivePokemon("");
      setPokedexData({});
      setPokedexSpecies({});
      setPokedexEntries([]);
    }
  }, [hasReset]);

  useEffect(() => {
    if (
      Object.keys(pokedexData).length === 0 &&
      Object.keys(pokedexSpecies).length === 0 &&
      pokedexEntries.length === 0
    ) {
      setHasReset(true);
    }
  }, [hasLoaded, pokedexData, pokedexEntries, pokedexSpecies]);

  useEffect(() => {
    if (hasReset && pokedexEntries.length === 0) {
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
    }
  }, [generation, hasReset, pokedexEntries.length]);

  // get all pokemon's data
  useEffect(() => {
    const fetchData = async () => {
      const dataHolder: Record<string, PokemonDataResponseType> = {};
      const speciesHolder: Record<string, PokemonSpeciesResponseType> = {};

      for (const entry of pokedexEntries) {
        const speciesName = entry.pokemon_species.name;

        const id = parseInt(getIdFromLink(entry.pokemon_species.url));
        const dataResponse =
          await sendGenericAPIRequest<PokemonDataResponseType>(
            requestLinks.getData(id)
          );
        if (dataResponse) dataHolder[speciesName] = dataResponse;

        const speciesResponse =
          await sendGenericAPIRequest<PokemonSpeciesResponseType>(
            requestLinks.getSpecies(id)
          );

        if (speciesResponse) {
          speciesHolder[speciesName] = speciesResponse;
          for (const variety of speciesResponse.varieties) {
            // check for regional forms
            if (
              variety.pokemon.name.match(
                new RegExp(
                  `${speciesName}-${generation.replace("original-", "")}`
                )
              )
            ) {
              // regional form found
              const regionalResponse =
                await sendGenericAPIRequest<PokemonDataResponseType>(
                  requestLinks.getData(getIdFromLink(variety.pokemon.url))
                );
              if (regionalResponse) {
                dataHolder[speciesName] = regionalResponse;
                dataHolder[speciesName].id = id;
              }
            }
          }
        }
      }
      setPokedexData({ ...dataHolder });
      setPokedexSpecies({ ...speciesHolder });
    };

    if (pokedexEntries.length > 0) {
      fetchData();
    }
  }, [generation, pokedexEntries]);

  // pokemon list finished fetching from api
  useEffect(() => {
    if (
      pokedexEntries.length > 0 &&
      Object.keys(pokedexData).length > 0 &&
      Object.keys(pokedexSpecies).length > 0
    ) {
      setHasLoaded(true);
    }
  }, [pokedexData, pokedexEntries, pokedexSpecies]);

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
          pokedexData={pokedexData}
          activePokemonData={pokedexData[activePokemon]}
          setActivePokemon={setActivePokemon}
        />
      </Box>
    </Box>
  );
};
