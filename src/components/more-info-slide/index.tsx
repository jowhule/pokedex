import React, { useEffect, useState } from "react";
import { CustomCard } from "../custom-card/CustomCard";
import { PokemonDataResponseType } from "../../services/apiRequestsTypes";
import {
  requestLinks,
  sendGenericAPIRequest,
} from "../../services/apiRequests";
import { Box } from "@mui/material";
import {
  BodyText,
  SecondaryText,
  StatTitleText,
} from "../../utils/styledComponents";
import { TypeTag } from "../pokemon-information/type-tag";
import {
  abilitiesContainer,
  infoSlideContainer,
  infoSlideLoaderStyle,
  noActivePokemonCardStyle,
  outterPokemonInfoSlideContainer,
  pokemonInfoSlideContainer,
  pokemonSpriteStyle,
  statsContainer,
} from "./style";
import { AbilityTag } from "../pokemon-information/ability-tag";
import { StatBar } from "../pokemon-information/stat-bar";
import { EvolutionChain } from "../pokemon-information/evolution-chain";
import { pokemonDataDefault } from "../../utils/defaults";
import { capitalise } from "../../utils/helpers";

import defaultImage from "../../assets/default_pokemon_info.png";
import pokeballLoader from "../../assets/pokeball-icon.png";

type MoreInfoSlideType = {
  activePokemon: string | number;
  setActivePokemon: React.Dispatch<React.SetStateAction<string | number>>;
};

export const MoreInfoSlide: React.FC<MoreInfoSlideType> = ({
  activePokemon,
  setActivePokemon,
}) => {
  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);
  const [pokemonAnimation, setPokemonAnimation] =
    useState<string>(defaultImage);
  const [hasSelectedActive, setHasSelectedActive] = useState<boolean>(false);
  const [transition, setTransition] = useState<Record<string, string>>(
    pokemonInfoSlideContainer
  );

  useEffect(() => {
    // trigger translate
    if (activePokemon) {
      setTransition(noActivePokemonCardStyle);
      // get all pokemon data
      sendGenericAPIRequest<PokemonDataResponseType>(
        requestLinks.getData(activePokemon)
      ).then((data) => {
        if (data) setPokemonData(data);
      });
    } else {
      // set default state
      setHasSelectedActive(false);
      setPokemonData(pokemonDataDefault);
      setPokemonAnimation(defaultImage);
    }
  }, [activePokemon]);

  useEffect(() => {
    if (pokemonData.name) {
      // get animation sprite
      if (pokemonData.id > 650) {
        setPokemonAnimation(pokemonData.sprites.front_default);
      } else {
        setPokemonAnimation(requestLinks.getAnimatedSprite(pokemonData.id));
      }
      setHasSelectedActive(true);
    }
  }, [pokemonData]);

  return (
    <Box sx={outterPokemonInfoSlideContainer}>
      <CustomCard sx={transition}>
        <Box sx={infoSlideContainer}>
          <Box
            component="img"
            src={pokemonAnimation}
            alt={`${activePokemon ?? "Default"}'s Sprite`}
            sx={pokemonSpriteStyle}
          />
          {hasSelectedActive ? (
            <>
              <SecondaryText
                fontSize="12px"
                fontWeight="bold"
                marginBottom="-5px"
              >
                N# {pokemonData.id}
              </SecondaryText>
              <BodyText fontWeight="bold" fontSize="24px">
                {capitalise(pokemonData.species.name)}
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

              <EvolutionChain
                pokemonData={pokemonData}
                setActivePokemon={setActivePokemon}
                setTransition={setTransition}
              />
            </>
          ) : (
            <SecondaryText>Please select a Pokemon.</SecondaryText>
          )}
        </Box>
      </CustomCard>

      <Box
        component="img"
        src={pokeballLoader}
        alt="Loading"
        sx={infoSlideLoaderStyle}
      />
    </Box>
  );
};
