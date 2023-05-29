import React, { useEffect, useState } from "react";
import { CustomCard } from "../custom-card/CustomCard";
import {
  PokemonDataResponseType,
  pokemonDataDefault,
} from "../../services/apiRequestsTypes";
import { sendGenericAPIRequest } from "../../services/apiRequests";
import { Box } from "@mui/material";
import {
  BodyText,
  SecondaryText,
  StatTitleText,
} from "../../utils/styledComponents";
import { TypeTag } from "../type-tag";
import {
  abilitiesContainer,
  activePokemonSpriteStyle,
  infoSlideContainer,
  noActivePokemonCardStyle,
  noActivePokemonSpriteStyle,
  pokemonInfoSlideContainer,
  statsContainer,
} from "./style";
import defaultImage from "../../assets/default_pokemon_info.png";
import { AbilityTag } from "../ability-tag";
import { StatBar } from "../stat-bar";

type MoreInfoSlideType = {
  activePokemonUrl: string;
};

export const MoreInfoSlide: React.FC<MoreInfoSlideType> = ({
  activePokemonUrl,
}) => {
  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);
  const [pokemonAnimation, setPokemonAnimation] =
    useState<string>(defaultImage);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [transition, setTransition] = useState<Record<string, string>>(
    pokemonInfoSlideContainer
  );

  useEffect(() => {
    // trigger translate
    if (activePokemonUrl) setTransition(noActivePokemonCardStyle);
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
      // timer to setTransition so previous transition has time to slide out
      setHasLoaded(true);
      transitionTimer = setTimeout(() => {
        setTransition(pokemonInfoSlideContainer);
      }, 500);
    }

    return () => {
      if (transitionTimer) clearTimeout(transitionTimer);
    };
  }, [pokemonData]);

  return (
    <CustomCard sx={transition}>
      <>
        <Box sx={infoSlideContainer}>
          <Box
            component="img"
            src={pokemonAnimation}
            alt={`${pokemonName ?? "Default"}'s Sprite`}
            sx={
              pokemonName
                ? activePokemonSpriteStyle
                : noActivePokemonSpriteStyle
            }
          />
          {hasLoaded ? (
            <>
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
                {pokemonData.types.map((type, index) => (
                  <TypeTag type={type.type.name} key={index} />
                ))}
              </Box>

              <StatTitleText fontSize="16px">Abilities</StatTitleText>
              <Box sx={abilitiesContainer}>
                {pokemonData.abilities.map((ability, index) => (
                  <AbilityTag abilityInfo={ability} key={index} />
                ))}
              </Box>

              <StatTitleText fontSize="16px">Base Stats</StatTitleText>
              <Box sx={statsContainer}>
                {pokemonData.stats.map((statInfo, index) => (
                  <StatBar
                    stat={statInfo.stat.name}
                    value={statInfo.base_stat}
                    key={index}
                  />
                ))}
              </Box>
            </>
          ) : (
            <SecondaryText>Please select a Pokemon.</SecondaryText>
          )}
        </Box>
      </>
    </CustomCard>
  );
};
