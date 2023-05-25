import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import {
  PokemonApiResponseType,
  PokemonNameResponseType,
} from "../../services/apiRequestsTypes";
import { PokemonCard } from "./pokemon-card";
import { homePageContainerStyle, searchBarStyle } from "./style";
import { CustomCard } from "../../components/CustomCard";
import { sendGenericAPIRequest } from "../../services/apiRequests";

export const POKEMON_MAX_NUM = 1010;
export const POKEMON_PER_LOAD = 30;

type HomePageProps = {
  ref?: any;
};

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const [allPokemonNames, setAllPokemonNames] = useState<
    PokemonNameResponseType[]
  >([]);

  const [currPage, setCurrPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<number>(0);
  const [visiblePokemonList, setVisiblePokemonList] = useState<
    PokemonNameResponseType[]
  >([]);
  const [lastList, setLastList] = useState<boolean>(false);

  // get names of pokemon to be displayed page by page
  useEffect(() => {
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

  // get all pokemon names
  useEffect(() => {
    sendGenericAPIRequest<PokemonApiResponseType>(
      `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_MAX_NUM}&offset=0`
    ).then((data) => {
      if (data) setAllPokemonNames(data.results);
    });
  }, []);

  const handleScroll = () => {
    console.log("hi");

    // if (scrollTop + clientHeight === scrollHeight) {
    //   setCurrPage(currPage + 1);
    // }
  };

  return (
    <>
      <Box sx={homePageContainerStyle} onScroll={handleScroll}>
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
    </>
  );
};
