import React, { useCallback, useEffect, useState } from "react";
import { CustomCard } from "../CustomCard";
import { Box, CircularProgress, Grid, Input } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonCard } from "./pokemon-card";
import { PokemonNameResponseType } from "../../services/apiRequestsTypes";
import { searchBarStyle } from "./style";

const POKEMON_PER_LOAD = 30;

type PokedexDisplayProps = {
  pokedexList: PokemonNameResponseType[];
  displaySearch?: boolean;
  listLoaded: boolean;
};
export const PokedexDisplay: React.FC<PokedexDisplayProps> = ({
  pokedexList,
  displaySearch,
  listLoaded,
}) => {
  const [displayLimit, setDisplayLimit] = useState<number>(POKEMON_PER_LOAD);

  const [prevSearchInput, setPrevSearchInput] = useState<string>("");
  const [currSearchInput, setCurrSearchInput] = useState<string>("");
  const [displayList, setDisplayList] = useState<Record<string, string>>({});
  const [hasMoreToLoad, setHasMoreToLoad] = useState<boolean>(true);

  // call to trigger adding more pokemon to display
  const handleNext = () => {
    setDisplayLimit(displayLimit + 1);
  };

  // update search field input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrSearchInput(e.target.value);
  };

  // add to display list
  const getCurrentList = useCallback((): Record<string, string> => {
    let currList: Record<string, string> = displayList;
    if (prevSearchInput !== currSearchInput) {
      currList = {};
      setPrevSearchInput(currSearchInput);
    }

    return currList;
  }, [currSearchInput, displayList, prevSearchInput]);

  useEffect(() => {
    const currList: Record<string, string> = getCurrentList();
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
        const { name, url } = pokedexList[currPokemon];
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

  useEffect(() => {
    setDisplayLimit(POKEMON_PER_LOAD);
    setHasMoreToLoad(true);
  }, [currSearchInput]);

  useEffect(() => {
    const lenDisplayList = Object.keys(displayList).length;
    setDisplayLimit(lenDisplayList);
  }, [displayList]);

  useEffect(() => {
    if (listLoaded) setDisplayLimit(POKEMON_PER_LOAD);
  }, [listLoaded]);
  return (
    <>
      {displaySearch && (
        <CustomCard sx={searchBarStyle}>
          <Input
            fullWidth
            placeholder="Search"
            disableUnderline
            value={currSearchInput}
            onChange={handleSearchChange}
            sx={{ height: "100%", padding: "0 20px" }}
          ></Input>
        </CustomCard>
      )}
      {listLoaded ? (
        <InfiniteScroll
          dataLength={displayLimit}
          next={handleNext}
          hasMore={hasMoreToLoad}
          scrollThreshold={0.9}
          loader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "50px",
              }}
            >
              <CircularProgress />
            </Box>
          }
          style={{ overflow: "hidden" }}
        >
          <Grid container columns={12} spacing="15px" marginTop="50px">
            {Array.from(pokedexList).map((pokemon, index) => (
              <PokemonCard
                pokemonUrl={pokemon.url}
                inDisplayList={displayList[pokemon.name] ? true : false}
                key={index}
              ></PokemonCard>
            ))}
          </Grid>
        </InfiniteScroll>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
