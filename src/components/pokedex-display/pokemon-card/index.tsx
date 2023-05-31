import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PokemonDataResponseType } from "../../../services/apiRequestsTypes";
import {
  requestLinks,
  sendGenericAPIRequest,
} from "../../../services/apiRequests";
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
import { TypeTag } from "../../pokemon-information/type-tag";
import { CustomCard } from "../../custom-card/CustomCard";
import { pokemonDataDefault } from "../../../utils/defaults";

type PokemonCardProps = {
  pokemonName: string;
  inDisplayList: boolean;
  setActivePokemonName: React.Dispatch<React.SetStateAction<string>>;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemonName,
  inDisplayList,
  setActivePokemonName,
}) => {
  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);
  const [displayName, setDisplayName] = useState<string>("");
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  /**
   * when card clicked set as active pokemon for the info slide
   */
  const handleCardClick = () => {
    setActivePokemonName(pokemonName);
  };

  // get initial pokemon data if the card is supposed to be displayed
  useEffect(() => {
    if (inDisplayList && displayName) {
      sendGenericAPIRequest<PokemonDataResponseType>(
        requestLinks.getData(pokemonName)
      ).then((data) => {
        if (data) setPokemonData(data);
      });
    }
  }, [pokemonName, inDisplayList, displayName]);

  // get pokemon name and capitalise first letter
  useEffect(() => {
    if (pokemonName) {
      setDisplayName(pokemonName[0].toUpperCase() + pokemonName.slice(1));
      setHasLoaded(true);
    }
  }, [pokemonName]);

  return (
    <>
      {inDisplayList && (
        <Grid item sm={6} md={6} lg={4} xl={3} height="210px">
          <Hoverable
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
          >
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
                    draggable="false"
                    src={pokemonData.sprites.front_default}
                    alt={`${displayName}'s sprite`}
                    sx={isMouseOver ? pokemonSpriteHover : pokemonSpriteStyle}
                  />
                  <BodyText fontWeight="bold" fontSize="18px">
                    {displayName}
                  </BodyText>
                  <Box display="flex" gap="10px" marginTop="5px">
                    {pokemonData.types.map((type, index) => (
                      <TypeTag type={type.type.name} key={index} />
                    ))}
                  </Box>
                </>
              ) : (
                <CircularProgress />
              )}
            </CustomCard>
          </Hoverable>
        </Grid>
      )}
    </>
  );
};
