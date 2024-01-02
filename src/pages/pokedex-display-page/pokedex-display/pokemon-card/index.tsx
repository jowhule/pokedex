import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PokemonDataResponseType } from "../../../../services/apiRequestsTypes";
import {
  BodyText,
  Hoverable,
  SecondaryText,
} from "../../../../utils/styledComponents";
import {
  pokemonCardContainer,
  pokemonIdContainer,
  pokemonSpriteHover,
  pokemonSpriteStyle,
} from "./style";
import { CustomCard } from "../../../../components/custom-card/CustomCard";
import {
  capitalise,
  capitaliseDash,
  removeDash,
} from "../../../../utils/helpers";
import { Types } from "../../../../components/pokemon-information/types";

type PokemonCardProps = {
  pokedexEntryNum: number;
  pokemonData: PokemonDataResponseType;
  inSearchList: boolean;
  setActivePokemon: React.Dispatch<React.SetStateAction<string>>;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokedexEntryNum,
  pokemonData,
  inSearchList,
  setActivePokemon,
}) => {
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
    setActivePokemon(pokemonData?.species.name);
  };

  // get initial pokemon data if the card is supposed to be displayed
  useEffect(() => {
    if (pokemonData?.species && inSearchList) {
      const name = pokemonData.species.name;
      name.includes("iron-")
        ? setDisplayName(capitalise(removeDash(name), true))
        : setDisplayName(capitaliseDash(name));
    }
  }, [inSearchList, pokemonData]);

  // check if sprite has loaded
  useEffect(() => {
    if (pokemonData?.sprites?.front_default) setHasLoaded(true);
  }, [pokemonData]);

  return (
    <>
      {inSearchList && (
        <Grid item xs={6} sm={6} md={4} lg={4} xl={3} height="210px">
          <Hoverable
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
          >
            <CustomCard sx={pokemonCardContainer}>
              <Box sx={pokemonIdContainer}>
                <SecondaryText fontSize="12px" fontWeight="bold">
                  # {pokedexEntryNum}
                </SecondaryText>
              </Box>
              {hasLoaded ? (
                <>
                  <Box
                    component="img"
                    draggable="false"
                    src={pokemonData?.sprites?.front_default}
                    alt={`${displayName}'s sprite`}
                    sx={isMouseOver ? pokemonSpriteHover : pokemonSpriteStyle}
                  />
                  <BodyText fontWeight="bold" fontSize="18px">
                    {displayName}
                  </BodyText>
                  <Types typesData={pokemonData?.types} />
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
