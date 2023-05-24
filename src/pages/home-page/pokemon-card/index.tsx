import { Card, CardActionArea } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  PokemonDataResponseType,
  pokemonDataDefault,
} from "../../../services/apiRequestsTypes";
import { sendGenericAPIRequest } from "../../../services/apiRequests";

type PokemonCardProps = {
  pokemonUrl: string;
};

type PokemonCardDataType = {
  name: string;
  id: number;
  front_sprite: string;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonUrl }) => {
  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);

  const getPokemonData = useCallback(
    () => async () => {
      sendGenericAPIRequest<PokemonDataResponseType>(pokemonUrl).then(
        (data) => {
          if (data) setPokemonData(data);
        }
      );
    },
    [pokemonUrl]
  );

  useEffect(() => {
    getPokemonData();
  }, [getPokemonData]);

  return (
    <Card>
      <CardActionArea>a</CardActionArea>
    </Card>
  );
};
