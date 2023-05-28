import React, { useEffect, useState } from "react";
import { CustomCard } from "../custom-card/CustomCard";
import {
  PokemonDataResponseType,
  pokemonDataDefault,
} from "../../services/apiRequestsTypes";
import { sendGenericAPIRequest } from "../../services/apiRequests";
import { Box } from "@mui/material";
import { BodyText, SecondaryText } from "../../utils/styledComponents";
import { TypeTag } from "../type-tag";
import { Transition } from "react-transition-group";
import { noActivePokemonCardStyle, pokemonInfoSlideContainer } from "./style";

type MoreInfoSlideType = {
  activePokemonUrl: string;
};

export const MoreInfoSlide: React.FC<MoreInfoSlideType> = ({
  activePokemonUrl,
}) => {
  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);
  const [pokemonAnimation, setPokemonAnimation] = useState<string>("");
  const [pokemonName, setPokemonName] = useState<string>("");
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);

  useEffect(() => {
    // trigger translate
    setTransition(false);
    // get all pokemon data
    const timer = setTimeout(() => {
      sendGenericAPIRequest<PokemonDataResponseType>(activePokemonUrl).then(
        (data) => {
          if (data) setPokemonData(data);
        }
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [activePokemonUrl]);

  useEffect(() => {
    let transitionTimer: ReturnType<typeof setTimeout> | null = null;

    if (pokemonData.name) {
      // get name
      setPokemonName(
        pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)
      );
      // get animation sprite
      if (pokemonData.id > 650) {
        setPokemonAnimation(pokemonData.sprites.front_default);
      } else {
        setPokemonAnimation(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonData.id}.gif`
        );
      }
      setHasLoaded(true);
      transitionTimer = setTimeout(() => {
        setTransition(true);
      }, 500);
    }
    return () => {
      if (transitionTimer) clearTimeout(transitionTimer);
    };
  }, [pokemonData]);

  return (
    <CustomCard
      sx={transition ? pokemonInfoSlideContainer : noActivePokemonCardStyle}
    >
      <>
        {hasLoaded && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              boxSizing: "border-box",
              padding: "20px",
              paddingTop: "90px",
              textAlign: "center",
              position: "relative",
              height: "100%",
            }}
          >
            {pokemonAnimation && (
              <Box
                component="img"
                src={pokemonAnimation}
                alt={`${pokemonName}'s Sprite`}
                sx={{
                  position: "absolute",
                  bottom: "100%",
                  transform: "scale(3)",
                  imageRendering: "pixelated",
                }}
              />
            )}
            <SecondaryText
              fontSize="12px"
              fontWeight="bold"
              marginBottom="-5px"
            >
              # {pokemonData.id}
            </SecondaryText>
            <BodyText fontWeight="bold" fontSize="24px">
              {pokemonName}
            </BodyText>
            <Box display="flex" gap="10px" m="10px">
              {Array.from(pokemonData.types).map((type, index) => (
                <TypeTag type={type.type.name} key={index} />
              ))}
            </Box>
            <BodyText
              fontWeight="bold"
              fontSize="16px"
              sx={{ marginTop: "15px" }}
            >
              Abilities
            </BodyText>
            {Array.from(pokemonData.abilities).map((ability, index) => (
              <Box key={index}>{ability.ability.name}</Box>
            ))}
          </Box>
        )}
      </>
    </CustomCard>
  );
};
