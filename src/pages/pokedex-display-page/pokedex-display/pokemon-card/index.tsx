import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  PokemonDataResponseType,
  PokemonPokedexEntryType,
} from "../../../../services/apiRequestsTypes";
import {
  requestLinks,
  sendGenericAPIRequest,
} from "../../../../services/apiRequests";
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
import { TypeTag } from "../../../../components/pokemon-information/type-tag";
import { CustomCard } from "../../../../components/custom-card/CustomCard";
import { pokemonDataDefault } from "../../../../utils/defaults";
import { capitalise } from "../../../../utils/helpers";

type PokemonCardProps = {
  pokemonEntry: PokemonPokedexEntryType;
  inSearchList: boolean;
  filterList: string[];
  setActivePokemon: React.Dispatch<React.SetStateAction<number | string>>;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemonEntry,
  inSearchList,
  filterList,
  setActivePokemon,
}) => {
  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);
  const [displayName, setDisplayName] = useState<string>("");
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [hasImgLoaded, setHasImgLoaded] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);

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
    setActivePokemon(pokemonData.id);
  };

  // get initial pokemon data if the card is supposed to be displayed
  useEffect(() => {
    if (pokemonEntry && inSearchList) {
      setDisplayName(capitalise(pokemonEntry.pokemon_species.name));
      const id = parseInt(pokemonEntry.pokemon_species.url.split("/")[6]);

      if (id) {
        sendGenericAPIRequest<PokemonDataResponseType>(
          requestLinks.getData(id)
        ).then((data) => {
          if (data) setPokemonData(data);
        });
      }
    }
  }, [inSearchList, pokemonEntry]);

  // check if sprite has loaded
  useEffect(() => {
    if (pokemonData.sprites.front_default) setHasImgLoaded(true);

    if (pokemonData.types && filterList.length > 0 && inSearchList) {
      const pokemonTypes = [
        pokemonData.types[0]?.type?.name,
        pokemonData.types[1]?.type?.name,
      ];
      console.log("hi");

      if (filterList.length === 1 && pokemonTypes.includes(filterList[0])) {
        setDisplay(inSearchList && true);
      } else if (
        filterList.length === 2 &&
        pokemonTypes.includes(filterList[0]) &&
        pokemonTypes.includes(filterList[1])
      ) {
        setDisplay(inSearchList && true);
      } else {
        setDisplay(false);
      }
    } else {
      setDisplay(inSearchList);
    }
  }, [filterList, pokemonData, inSearchList]);

  return (
    <>
      {inSearchList && display && (
        <Grid item sm={6} md={6} lg={4} xl={3} height="210px">
          <Hoverable
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
          >
            <CustomCard sx={pokemonCardContainer}>
              <Box sx={pokemonIdContainer}>
                <SecondaryText fontSize="12px" fontWeight="bold">
                  # {pokemonEntry?.entry_number}
                </SecondaryText>
              </Box>

              {hasImgLoaded ? (
                <Box
                  component="img"
                  draggable="false"
                  src={pokemonData.sprites.front_default}
                  alt={`${displayName}'s sprite`}
                  sx={isMouseOver ? pokemonSpriteHover : pokemonSpriteStyle}
                />
              ) : (
                <CircularProgress />
              )}
              <BodyText fontWeight="bold" fontSize="18px">
                {displayName}
              </BodyText>
              <Box display="flex" gap="10px" marginTop="5px">
                {pokemonData.types.map((type, index) => (
                  <TypeTag type={type.type.name} key={index} />
                ))}
              </Box>
            </CustomCard>
          </Hoverable>
        </Grid>
      )}
    </>
  );
};
