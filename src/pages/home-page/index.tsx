import React, { useEffect, useState } from "react";
import { sendGenericAPIRequest } from "../../services/apiRequests";
import { Box, CircularProgress } from "@mui/material";
import { POKEMON_MAX_NUM } from "../../App";
import { PokemonNameResponseType } from "../../services/apiRequestsTypes";

type PokemonCardDataType = {
  name: string;
  id: number;
  front_sprite: string;
};

export const HomePage: React.FC = () => {
  const [isNameListLoaded, setIsNameListLoaded] = useState<boolean>(false);
  const [pokemonNameList, setPokemonNameList] = useState<
    PokemonNameResponseType[]
  >([]);
  const [currentPokemonLimit, setCurrentPokemonLimit] = useState<number>(30);
  const [visiblePokemonList, setVisiblePokemonList] = useState<
    PokemonCardDataType[]
  >([]);

  const getPokemonNameList = async () => {
    sendGenericAPIRequest<PokemonNameResponseType[]>(
      `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_MAX_NUM}`
    ).then((data) => {
      if (data) setPokemonNameList(data);
    });
  };

  useEffect(() => {
    if (pokemonNameList) setIsNameListLoaded(true);
  }, [pokemonNameList]);

  getPokemonNameList();

  return <>{isNameListLoaded ? <Box></Box> : <CircularProgress />}</>;
};
