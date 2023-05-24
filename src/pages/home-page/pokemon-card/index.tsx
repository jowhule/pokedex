import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  PokemonDataResponseType,
  pokemonDataDefault,
} from "../../../services/apiRequestsTypes";
import { sendGenericAPIRequest } from "../../../services/apiRequests";
import { BodyText, Hoverable } from "../../../utils/styledComponents";
import { pokemonCardContainer, pokemonIdContainer } from "./style";

type PokemonCardProps = {
  pokemonUrl: string;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonUrl }) => {
  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);
  const [pokemonName, setPokemonName] = useState<string>("");

  // get initial pokemon data
  useEffect(() => {
    sendGenericAPIRequest<PokemonDataResponseType>(pokemonUrl).then((data) => {
      if (data) setPokemonData(data);
    });
  }, [pokemonUrl]);

  useEffect(() => {
    if (pokemonData.name)
      setPokemonName(
        pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)
      );
  }, [pokemonData]);

  return (
    <Grid item sm={6} md={4} lg={3} xl={2} height="165px">
      <Hoverable sx={pokemonCardContainer}>
        <Box sx={pokemonIdContainer}>
          <BodyText fontSize="12px"># {pokemonData.id}</BodyText>
        </Box>

        <Box
          component="img"
          src={pokemonData.sprites.front_default}
          alt={`${pokemonName}'s sprite`}
          position="absolute"
          top="-48px"
        />
        <BodyText fontWeight="bold">{pokemonName}</BodyText>
        <Box display="flex">
          {Array.from(pokemonData.types).map((type, index) => (
            <Box key={index}>
              <BodyText>{type.type.name}</BodyText>
            </Box>
          ))}
        </Box>
      </Hoverable>
    </Grid>
  );
};
