import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  PokemonDataResponseType,
  pokemonDataDefault,
} from "../../../services/apiRequestsTypes";
import { sendGenericAPIRequest } from "../../../services/apiRequests";
import {
  BodyText,
  Hoverable,
  SecondaryText,
} from "../../../utils/styledComponents";
import {
  pokemonCardContainer,
  pokemonIdContainer,
  pokemonSpriteHover,
  pokemonSpriteStyle,
} from "./style";
import { TypeTag } from "../type-tag";
import { CustomCard } from "../../../components/CustomCard";

type PokemonCardProps = {
  pokemonUrl: string;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonUrl }) => {
  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  // get initial pokemon data
  useEffect(() => {
    sendGenericAPIRequest<PokemonDataResponseType>(pokemonUrl).then((data) => {
      if (data) setPokemonData(data);
    });
  }, [pokemonUrl]);

  // get pokemon name
  useEffect(() => {
    if (pokemonData.name) {
      setPokemonName(
        pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)
      );
      setHasLoaded(true);
    }
  }, [pokemonData]);

  return (
    <Grid item sm={6} md={4} lg={3} xl={2} height="180px">
      <Hoverable
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      ></Hoverable>
      <CustomCard sx={pokemonCardContainer}>
        <Box sx={pokemonIdContainer}>
          <SecondaryText fontSize="12px" fontWeight="bold">
            # {pokemonData.id}
          </SecondaryText>
        </Box>

        {hasLoaded ? (
          <>
            <Box
              component="img"
              src={pokemonData.sprites.front_default}
              alt={`${pokemonName}'s sprite`}
              sx={isMouseOver ? pokemonSpriteHover : pokemonSpriteStyle}
            />
            <BodyText fontWeight="bold" fontSize="18px">
              {pokemonName}
            </BodyText>
            <Box display="flex" gap="10px" marginTop="5px">
              {Array.from(pokemonData.types).map((type, index) => (
                <TypeTag type={type.type.name} key={index} />
              ))}
            </Box>
          </>
        ) : (
          <CircularProgress />
        )}
      </CustomCard>
    </Grid>
  );
};
