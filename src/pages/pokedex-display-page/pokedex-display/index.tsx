import React, { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Divider, Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonCard } from "./pokemon-card";
import {
  PokemonDataResponseType,
  PokemonPokedexEntryType,
} from "../../../services/apiRequestsTypes";
import { loadMoreContainer } from "./style";
import { Searchbar } from "./searchbar";

import { TypeFilter } from "./type-filter";

const POKEMON_PER_LOAD = 30;

type PokedexDisplayProps = {
  pokedexList: PokemonPokedexEntryType[];
  generation: string;
  displaySearch?: boolean;
  listLoaded: boolean;
  setActivePokemon: React.Dispatch<React.SetStateAction<number | string>>;
  pokedexData: Record<string, PokemonDataResponseType>;
};

export const PokedexDisplay: React.FC<PokedexDisplayProps> = ({
  pokedexList,
  generation,
  displaySearch,
  listLoaded,
  setActivePokemon,
  pokedexData,
}) => {
  const [displayLimit, setDisplayLimit] = useState<number>(POKEMON_PER_LOAD);
  const [displayList, setDisplayList] = useState<Record<string, string>>({});

  const [prevSearchInput, setPrevSearchInput] = useState<string>("");
  const [currSearchInput, setCurrSearchInput] = useState<string>("");
  const [currFilters, setCurrFilters] = useState<string[]>([]);
  const [prevFilters, setPrevFilters] = useState<string[]>([]);

  const [hasMoreToLoad, setHasMoreToLoad] = useState<boolean>(true);

  /**
   * call to trigger adding more pokemon to display for infinite scroll
   */
  const handleNext = () => {
    setDisplayLimit(displayLimit + 1);
  };

  /**
   * returns list for loader to add onto
   */
  const getCurrentList = useCallback((): Record<string, string> => {
    let currList: Record<string, string> = displayList;
    if (prevSearchInput !== currSearchInput || prevFilters !== currFilters) {
      currList = {};
      setPrevSearchInput(currSearchInput);
      setPrevFilters(currFilters);
    }

    return currList;
  }, [currFilters, currSearchInput, displayList, prevFilters, prevSearchInput]);

  /**
   * loads at most 30 more items into display list based on search input
   */
  useEffect(() => {
    const currList: Record<string, string> = { ...getCurrentList() };
    const lenCurrDisplayList = Object.keys(currList).length;

    if (listLoaded && Object.keys(currList).length < displayLimit) {
      const nextSearchPage: Record<string, string> = {};
      let currPokemon = lenCurrDisplayList;
      let numAdded = 0;

      // load at least 30 pokemon into display list
      while (numAdded < POKEMON_PER_LOAD && currPokemon < pokedexList.length) {
        const { name, url } = pokedexList[currPokemon].pokemon_species;
        if (name.includes(currSearchInput) && !currList[name]) {
          const pokemonTypes = [
            pokedexData[name].types[0]?.type?.name,
            pokedexData[name].types[1]?.type?.name,
          ];
          // check typing filters
          if (
            currFilters.length === 0 ||
            (currFilters.length === 1 &&
              pokemonTypes.includes(currFilters[0])) ||
            (currFilters.length === 2 &&
              pokemonTypes.includes(currFilters[0]) &&
              pokemonTypes.includes(currFilters[1]))
          ) {
            nextSearchPage[name] = url;
            numAdded += 1;
          }
        }
        currPokemon += 1;
      }
      setDisplayList({ ...currList, ...nextSearchPage });
      // tell infinite scroll that there is no more pokemon to load
      if (numAdded < POKEMON_PER_LOAD) setHasMoreToLoad(false);
    }
  }, [
    currSearchInput,
    displayLimit,
    currFilters,
    getCurrentList,
    listLoaded,
    pokedexData,
    pokedexList,
  ]);

  /**
   * trigger loading into new list based when search input changes
   */
  useEffect(() => {
    setDisplayLimit(POKEMON_PER_LOAD);
    setHasMoreToLoad(true);
  }, [currSearchInput, currFilters]);

  /**
   * update display limit when display list is updated
   */
  useEffect(() => {
    const lenDisplayList = Object.keys(displayList).length;
    setDisplayLimit(lenDisplayList);
  }, [displayList]);

  /**
   * load display list for the first time when the component mounts and pokemon
   * list has loaded
   */
  useEffect(() => {
    if (listLoaded) {
      setDisplayList({});
      setHasMoreToLoad(true);
      setDisplayLimit(POKEMON_PER_LOAD);
      setCurrSearchInput("");
      setPrevSearchInput("");
      setCurrFilters([]);
      setPrevFilters([]);
    }
  }, [listLoaded]);

  return (
    <>
      {displaySearch && (
        <Searchbar input={currSearchInput} setInput={setCurrSearchInput} />
      )}

      <TypeFilter
        types={currFilters}
        setTypes={setCurrFilters}
        generation={generation}
      />
      <Divider />

      {listLoaded ? (
        <InfiniteScroll
          dataLength={displayLimit}
          next={handleNext}
          hasMore={hasMoreToLoad}
          scrollThreshold={0.9}
          loader={
            <Box sx={loadMoreContainer}>
              <CircularProgress />
            </Box>
          }
          style={{ overflowY: "hidden" }}
        >
          <Grid
            container
            columns={12}
            spacing="25px"
            marginTop="40px"
            overflow="visible"
            paddingRight="8px"
          >
            {listLoaded &&
              pokedexList.map((pokemonEntry, index) => (
                <PokemonCard
                  pokedexEntryNum={
                    generation === "kalos"
                      ? index + 1
                      : pokemonEntry.entry_number
                  }
                  generation={generation}
                  pokemonData={pokedexData[pokemonEntry.pokemon_species.name]}
                  inSearchList={
                    displayList[pokemonEntry.pokemon_species.name]
                      ? true
                      : false
                  }
                  setActivePokemon={setActivePokemon}
                  key={index}
                />
              ))}
          </Grid>
        </InfiniteScroll>
      ) : (
        <Box display="flex" justifyContent="center" marginTop="40px">
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
