import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  NameUrlType,
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
  const [activePokemon, setActivePokemon] = useState<string | number>("");

  const [pokedexData, setPokedexData] = useState<
    Record<string, PokemonDataResponseType>
  >({});
  const [pokedexSpecies, setPokedexSpecies] = useState<
    Record<string, PokemonSpeciesResponseType>
  >({});

  // get kalos dex
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

  /**
   * pushes api requests to get a pokemon's data (promises) into the the array
   * @param dataPromises async api requests to get a pokemon's data array
   * @param dataHolder where data goes when api request is finished
   * @param id id of pokemon
   * @param speciesName name of the pokemon species
   */
  const getPokedexDataPromises = (
    dataPromises: Promise<void | PokemonDataResponseType>[],
    dataHolder: Record<string, PokemonDataResponseType> = {},
    id: number,
    speciesName: string
  ) => {
    dataPromises.push(
      sendGenericAPIRequest<PokemonDataResponseType>(
        requestLinks.getData(id)
      ).then((data) => {
        if (data) dataHolder[speciesName] = data;
      })
    );
  };

  /**
   * pushes api requests to get a pokemon's species (promises) into the the array
   * @param speciesPromises async api requests to get a pokemon's species array
   * @param speciesHolder where species goes when api request is finished
   * @param id id of the pokemon
   * @param speciesName name of the pokemon species
   */
  const getPokemonSpeciesPromises = (
    speciesPromises: Promise<void | PokemonSpeciesResponseType>[],
    speciesHolder: Record<string, PokemonSpeciesResponseType> = {},
    regionalPromises: Promise<void | PokemonDataResponseType>[],
    regionalHolder: Record<string, PokemonDataResponseType> = {},
    id: number,
    speciesName: string
  ) => {
    speciesPromises.push(
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        requestLinks.getSpecies(id)
      ).then((species) => {
        if (species) {
          speciesHolder[speciesName] = species;
          // check for regional forms
          for (const form of species.varieties) {
            getPokemonRegionalPromises(
              regionalPromises,
              regionalHolder,
              form,
              speciesName
            );
          }
        }
      })
    );
  };

  /**
   * pushes api requests to get data of a regional form (promises) into the
   * the array
   * @param regionalPromises async api requests to get a pokemon's data array
   * @param regionalHolder where data goes when api request is finished
   * @param id id of the pokemon
   * @param speciesName name of the pokemon data
   */
  const getPokemonRegionalPromises = (
    regionalPromises: Promise<void | PokemonDataResponseType>[],
    regionalHolder: Record<string, PokemonDataResponseType> = {},
    form: {
      is_default: boolean;
      pokemon: NameUrlType;
    },
    speciesName: string
  ) => {
    const match = form.pokemon.name.match(
      new RegExp(`^${speciesName}-${generation.replace("original-", "")}$`)
    );
    if (match) {
      // regional form found
      regionalPromises.push(
        sendGenericAPIRequest<PokemonDataResponseType>(
          requestLinks.getData(getIdFromLink(form.pokemon.url))
        ).then((regional) => {
          if (regional) regionalHolder[speciesName] = regional;
        })
      );
    }
  };

  // get all pokename in region pokedex
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
      const speciesPromises: Promise<void | PokemonSpeciesResponseType>[] = [];
      const regionalPromises: Promise<void | PokemonDataResponseType>[] = [];

      const dataHolder: Record<string, PokemonDataResponseType> = {};
      const speciesHolder: Record<string, PokemonSpeciesResponseType> = {};
      const regionalHolder: Record<string, PokemonDataResponseType> = {};

      for (const entry of pokedexEntries) {
        const id = parseInt(entry.pokemon_species.url.split("/")[6]);
        const speciesName = entry.pokemon_species.name;

        getPokedexDataPromises(dataPromises, dataHolder, id, speciesName);
        getPokemonSpeciesPromises(
          speciesPromises,
          speciesHolder,
          regionalPromises,
          regionalHolder,
          id,
          speciesName
        );
      }
      Promise.allSettled(dataPromises).then(() => {
        Promise.allSettled(regionalPromises).then(() => {
          for (const regional of Object.keys(regionalHolder)) {
            dataHolder[regional] = regionalHolder[regional];
          }
          setPokedexData(dataHolder);
        });
      });
      Promise.allSettled(speciesPromises).then(() =>
        setPokedexSpecies(speciesHolder)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokedexEntries]);

  // pokemon list finished fetching from api
  useEffect(() => {
    if (Object.keys(pokedexData).length > 0) setHasLoaded(true);
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
          activePokemonData={pokedexData[activePokemon]}
          setActivePokemon={setActivePokemon}
        />
      </Box>
    </Box>
  );
};
