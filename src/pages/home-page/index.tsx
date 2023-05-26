import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Input } from "@mui/material";
import {
  PokemonApiResponseType,
  PokemonNameResponseType,
} from "../../services/apiRequestsTypes";
import { PokemonCard } from "./pokemon-card";
import { homePageContainerStyle, searchBarStyle } from "./style";
import { CustomCard } from "../../components/CustomCard";
import { sendGenericAPIRequest } from "../../services/apiRequests";
import InfiniteScroll from "react-infinite-scroll-component";

export const POKEMON_MAX_NUM = 1010;
export const POKEMON_PER_LOAD = 30;

export const HomePage: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [allPokemonNames, setAllPokemonNames] = useState<
    PokemonNameResponseType[]
  >([]);
  const [displayLimit, setDisplayLimit] = useState<number>(POKEMON_PER_LOAD);

  const [searchInput, setSearchInput] = useState<string>("");
  const [displayList, setDisplayList] = useState<Record<string, string>>({});
  const [hasMoreToLoad, setHasMoreToLoad] = useState<boolean>(true);

  // call to trigger adding more pokemon to display
  const handleNext = () => {
    setDisplayLimit(displayLimit + 1);
  };

  // name of all pokemon received
  useEffect(() => {
    if (Object.keys(allPokemonNames).length !== 0) setHasLoaded(true);
  }, [allPokemonNames]);

  // get all pokemon names (for search bar)
  useEffect(() => {
    sendGenericAPIRequest<PokemonApiResponseType>(
      `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_MAX_NUM}&offset=0`
    ).then((data) => {
      if (data) setAllPokemonNames(data.results);
    });
  }, []);

  // update search field input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // add to display list
  useEffect(() => {
    // if not 30 load -> go thru all names until 30 is loaded
    // need to update curr display limit to where the 30th was found
    const lenCurrDisplayList = Object.keys(displayList).length;

    if (allPokemonNames.length !== 0 && lenCurrDisplayList < displayLimit) {
      const nextSearchPage: Record<string, string> = {};
      let currPokemon = lenCurrDisplayList;
      let numAdded = 0;
      while (numAdded < POKEMON_PER_LOAD && currPokemon < POKEMON_MAX_NUM) {
        if (!allPokemonNames[currPokemon]) break;
        const { name, url } = allPokemonNames[currPokemon];
        if (name.includes(searchInput) && !displayList[name]) {
          nextSearchPage[name] = url;
          numAdded += 1;
        }
        currPokemon += 1;
      }

      if (numAdded < POKEMON_PER_LOAD) {
        setHasMoreToLoad(false);
      }

      setDisplayList({ ...displayList, ...nextSearchPage });
    }
  }, [allPokemonNames, searchInput, displayList, displayLimit]);

  useEffect(() => {
    setDisplayLimit(POKEMON_PER_LOAD);
    setDisplayList({});
    setHasMoreToLoad(true);
  }, [searchInput]);

  useEffect(() => {
    const lenDisplayList = Object.keys(displayList).length;

    if (lenDisplayList > 0) setDisplayLimit(lenDisplayList);
  }, [displayList]);

  return (
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
      <Box sx={homePageContainerStyle}>
        <Box width="100%">
          <CustomCard sx={searchBarStyle}>
            <Input
              fullWidth
              placeholder="Search"
              disableUnderline
              value={searchInput}
              onChange={handleSearchChange}
              sx={{ height: "100%", padding: "0 20px" }}
            ></Input>
          </CustomCard>
          {hasLoaded ? (
            <Grid container columns={12} spacing="15px" marginTop="50px">
              {Array.from(allPokemonNames).map((pokemon, index) => (
                <PokemonCard
                  pokemonUrl={pokemon.url}
                  inDisplayList={displayList[pokemon.name] ? true : false}
                  key={index}
                ></PokemonCard>
              ))}
            </Grid>
          ) : (
            <CircularProgress />
          )}
        </Box>
        <Box></Box>
      </Box>
    </InfiniteScroll>
  );
};
