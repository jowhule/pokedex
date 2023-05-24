import { Card, CardActionArea, CardContent } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  PokemonDataResponseType,
  pokemonDataDefault,
} from "../../../services/apiRequestsTypes";
import { sendGenericAPIRequest } from "../../../services/apiRequests";

type PokemonCardProps = {
  pokemonUrl: string;
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
      <CardActionArea>
        <CardContent></CardContent>
      </CardActionArea>
    </Card>
  );
};
