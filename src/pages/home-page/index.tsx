import React, { useCallback, useEffect, useState } from "react";
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

  const handleNext = () => {
    setDisplayLimit(displayLimit + POKEMON_PER_LOAD);
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

  useEffect(() => {
    if (searchInput) {
    } else {
      setDisplayLimit(POKEMON_PER_LOAD);
    }
  }, [searchInput]);

  return (
    <InfiniteScroll
      dataLength={displayLimit}
      next={handleNext}
      hasMore={displayLimit < POKEMON_MAX_NUM}
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
      style={{ overflowY: "hidden" }}
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
                  inDisplayLimit={index < displayLimit}
                  matchesSearchInput={
                    searchInput ? pokemon.name.includes(searchInput) : true
                  }
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
