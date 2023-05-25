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
  const [allPokemonNames, setAllPokemonNames] = useState<
    PokemonNameResponseType[]
  >([]);

  const [currPage, setCurrPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<number>(0);
  const [visiblePokemonList, setVisiblePokemonList] = useState<
    PokemonNameResponseType[]
  >([]);
  const [lastList, setLastList] = useState<boolean>(false);

  /**
   * callback function to be called whenever current page number changes so that
   * more pokemon can be paginated into the page to emulate infinite scroll
   */
  const getNextPokemonPage = useCallback(() => {
    const fetchData = async () => {
      sendGenericAPIRequest<PokemonApiResponseType>(
        `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_PER_LOAD}&offset=${
          prevPage * POKEMON_PER_LOAD
        }`
      ).then((data) => {
        if (data) {
          if (data.results.length < POKEMON_PER_LOAD) {
            setLastList(true);
            return;
          }
          setPrevPage(currPage);
          setVisiblePokemonList([...visiblePokemonList, ...data.results]);
        }
      });
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, visiblePokemonList]);

  const handleNextPage = () => {
    setCurrPage(currPage + 1);
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
      dataLength={visiblePokemonList.length}
      next={handleNextPage}
      hasMore={true}
      loader={
        <Box sx={{ dispaly: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      }
      style={{ overflowY: "hidden" }}
    >
      <Box sx={homePageContainerStyle}>
        <Box>
          <CustomCard sx={searchBarStyle}></CustomCard>
          <Grid container columns={12} spacing="15px" marginTop="50px">
            {Array.from(visiblePokemonList).map((pokemon, index) => (
              <PokemonCard pokemonUrl={pokemon.url} key={index}></PokemonCard>
            ))}
          </Grid>
        </Box>
        <Box></Box>
      </Box>
    </InfiniteScroll>
  );
};
