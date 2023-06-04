import React, { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Divider, Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonCard } from "./pokemon-card";
import { PokemonPokedexEntryType } from "../../../services/apiRequestsTypes";
import { loadMoreContainer } from "./style";
import { Searchbar } from "./searchbar";

import { TypeFilter } from "./type-filter";

const POKEMON_PER_LOAD = 30;

type PokedexDisplayProps = {
  pokedexList: PokemonPokedexEntryType[];
  displaySearch?: boolean;
  listLoaded: boolean;
  setActivePokemon: React.Dispatch<React.SetStateAction<number | string>>;
};

export const PokedexDisplay: React.FC<PokedexDisplayProps> = ({
  pokedexList,
  displaySearch,
  listLoaded,
  setActivePokemon,
}) => {
  const [displayLimit, setDisplayLimit] = useState<number>(POKEMON_PER_LOAD);
  const [displayList, setDisplayList] = useState<Record<string, string>>({});

  const [prevSearchInput, setPrevSearchInput] = useState<string>("");
  const [currSearchInput, setCurrSearchInput] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

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
    if (prevSearchInput !== currSearchInput) {
      currList = {};
      setPrevSearchInput(currSearchInput);
    }

    return currList;
  }, [currSearchInput, displayList, prevSearchInput]);

  /**
   * loads at most 30 more items into display list based on search input
   */
  useEffect(() => {
    const currList: Record<string, string> = { ...getCurrentList() };
    const lenCurrDisplayList = Object.keys(currList).length;

    if (
      pokedexList.length !== 0 &&
      Object.keys(currList).length < displayLimit
    ) {
      const nextSearchPage: Record<string, string> = {};
      let currPokemon = lenCurrDisplayList;
      let numAdded = 0;

      // load 30 pokemon into display list
      while (numAdded < POKEMON_PER_LOAD && currPokemon < pokedexList.length) {
        const { name, url } = pokedexList[currPokemon].pokemon_species;
        if (name.includes(currSearchInput) && !currList[name]) {
          nextSearchPage[name] = url;
          numAdded += 1;
        }
        currPokemon += 1;
      }
      setDisplayList({ ...currList, ...nextSearchPage });
      // tell infinite scroll that there is no more pokemon to load
      if (numAdded < POKEMON_PER_LOAD) setHasMoreToLoad(false);
    }
  }, [pokedexList, currSearchInput, displayList, displayLimit, getCurrentList]);

  /**
   * trigger loading into new list based when search input changes
   */
  useEffect(() => {
    setDisplayLimit(POKEMON_PER_LOAD);
    setHasMoreToLoad(true);
  }, [currSearchInput]);

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
    }
  }, [listLoaded]);

  return (
    <>
      {displaySearch && (
        <Searchbar input={currSearchInput} setInput={setCurrSearchInput} />
      )}

      <TypeFilter types={filters} setTypes={setFilters} />
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
            {pokedexList.map((pokemonEntry, index) => (
              <PokemonCard
                entryNum={pokemonEntry.entry_number}
                pokemonEntry={pokemonEntry}
                filterList={filters}
                inDisplayList={
                  displayList[pokemonEntry.pokemon_species.name] ? true : false
                }
                setActivePokemon={setActivePokemon}
                key={index}
              />
            ))}
          </Grid>
        </InfiniteScroll>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
