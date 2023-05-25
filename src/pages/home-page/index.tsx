import React, { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
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

  const [currDisplayLimit, setCurrDisplayLimit] =
    useState<number>(POKEMON_PER_LOAD);
  const [prevDisplayLimit, setPrevDisplayLimit] = useState<number>(0);

  /**
   * callback function to be called whenever current page number changes so that
   * more pokemon can be paginated into the page to emulate infinite scroll
   */
  const getNextPokemonPage = useCallback(() => {
    setPrevDisplayLimit(currDisplayLimit);

    if (
      currDisplayLimit < POKEMON_MAX_NUM &&
      prevDisplayLimit !== currDisplayLimit
    ) {
      console.log("hi");
    }
  }, [currDisplayLimit, prevDisplayLimit]);

  const handleNextPage = () => {
    setCurrDisplayLimit(currDisplayLimit + POKEMON_PER_LOAD);
  };

  // get names of pokemon to be displayed page by page
  useEffect(() => {
    getNextPokemonPage();
  }, [getNextPokemonPage]);

  // get all pokemon names (for search bar)
  useEffect(() => {
    sendGenericAPIRequest<PokemonApiResponseType>(
      `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_MAX_NUM}&offset=0`
    ).then((data) => {
      if (data) setAllPokemonNames(data.results);
    });
  }, []);

  return (
    <InfiniteScroll
      dataLength={currDisplayLimit}
      next={handleNextPage}
      hasMore={currDisplayLimit < POKEMON_MAX_NUM}
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
        <Box>
          <CustomCard sx={searchBarStyle}></CustomCard>
          <Grid container columns={12} spacing="15px" marginTop="50px">
            {Array.from(allPokemonNames).map((pokemon, index) => (
              <PokemonCard
                pokemonUrl={pokemon.url}
                displayLimit={currDisplayLimit}
                key={index}
              ></PokemonCard>
            ))}
          </Grid>
        </Box>
        <Box></Box>
      </Box>
    </InfiniteScroll>
  );
};
