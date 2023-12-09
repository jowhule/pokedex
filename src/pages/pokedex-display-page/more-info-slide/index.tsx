import React, { useEffect, useRef, useState } from "react";
import { CustomCard } from "../../../components/custom-card/CustomCard";
import { PokemonDataResponseType } from "../../../services/apiRequestsTypes";
import { requestLinks } from "../../../services/apiRequests";
import {
  Box,
  Fab,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import {
  BodyText,
  Hoverable,
  SecondaryText,
  StatTitleText,
} from "../../../utils/styledComponents";
import { TypeTag } from "../../../components/pokemon-information/type-tag";
import {
  abilitiesContainer,
  hideScrollableStyle,
  indicateScrollContainer,
  indicateScrollableStyle,
  infoSlideContainer,
  infoSlideLoaderStyle,
  infoSlideScrollContainer,
  mobileOutterPokemonInfoSlideContainer,
  mobileNoActivePokemonCardStyle,
  noActivePokemonCardStyle,
  outterPokemonInfoSlideContainer,
  pokemonInfoSlideContainer,
  pokemonSpriteStyle,
  statTotalContainer,
  statsContainer,
  mobileInfoSlideContainer,
  mobileInfoSlideScrollContainer,
  mobileInfoCloseButtonStyle,
  expandPokemonButtonStyle,
  mobileExpandPokemonButtonStyle,
} from "./style";
import { AbilityTag } from "../../../components/pokemon-information/ability-tag";
import { StatBar } from "../../../components/pokemon-information/base-stat-bar";
import { EvolutionChain } from "../../../components/pokemon-information/evolution-chain";
import { pokemonDataDefault } from "../../../utils/defaults";
import { capitalise } from "../../../utils/helpers";

import defaultImage from "../../../assets/default_pokemon_info.png";
import pokeballLoader from "../../../assets/pokeball-icon.png";
import { EffortValueTag } from "../../../components/pokemon-information/effort-value-tag";
import { TYPE_COLOURS, primaryTextColour } from "../../../utils/colours";
import { useNavigate } from "react-router-dom";

type MoreInfoSlideType = {
  pokedexData: Record<string, PokemonDataResponseType>;
  activePokemonData: PokemonDataResponseType;
  setActivePokemon: React.Dispatch<React.SetStateAction<string>>;
};

export const MoreInfoSlide: React.FC<MoreInfoSlideType> = ({
  pokedexData,
  activePokemonData,
  setActivePokemon,
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);
  const [totalStat, setTotalStat] = useState<number>(0);
  const [pokemonAnimation, setPokemonAnimation] =
    useState<string>(defaultImage);
  const [hasSelectedActive, setHasSelectedActive] = useState<boolean>(false);
  const [transition, setTransition] = useState<Record<string, string>>(
    pokemonInfoSlideContainer
  );

  const infoRef = useRef<HTMLDivElement>(null);
  const [showScrollable, setShowScrollable] = useState<boolean>(true);

  const [hasClosedMobile, setHasClosedMobile] = useState<boolean>(true);

  /**
   * handle close button for more info slide in tablet mode
   */
  const handleCloseClick = () => {
    setTransition(mobileNoActivePokemonCardStyle);
    setHasClosedMobile(true);
    setTimeout(() => {
      setActivePokemon("");
    }, 400);
  };

  const handleMoreClick = () => {
    navigate(`/pokemon/${activePokemonData.name}`);
  };

  useEffect(() => {
    let dataTimer: ReturnType<typeof setTimeout> | null = null;
    // trigger translate
    if (activePokemonData) {
      setTransition(
        isTablet ? mobileNoActivePokemonCardStyle : noActivePokemonCardStyle
      );
      setHasClosedMobile(false);

      // get all pokemon data
      dataTimer = setTimeout(() => {
        setPokemonData(activePokemonData);
        if (isTablet) document.body.style.overflow = "hidden";
        if (infoRef.current)
          infoRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
      }, 200);
    } else {
      // set default state
      setHasSelectedActive(false);
      setPokemonData(pokemonDataDefault);
      setPokemonAnimation(defaultImage);
    }
    return () => {
      if (dataTimer) clearTimeout(dataTimer);
    };
  }, [activePokemonData, isTablet]);

  /**
   * prepare active pokemon sprite and its stat total
   */
  useEffect(() => {
    if (pokemonData.name) {
      if (pokemonData.id > 650) {
        setPokemonAnimation(pokemonData.sprites.front_default);
      } else {
        setPokemonAnimation(requestLinks.getAnimatedSprite(pokemonData.id));
      }
      setHasSelectedActive(true);
    }

    if (pokemonData.stats) {
      let totalStatCalc = 0;
      for (const stat of pokemonData.stats) {
        totalStatCalc += stat.base_stat;
      }
      setTotalStat(totalStatCalc);
    }
  }, [pokemonData]);

  // add can scroll indicator
  useEffect(() => {
    if (transition !== pokemonInfoSlideContainer) return;
    const ref: HTMLDivElement | null = infoRef?.current;
    if (ref && ref.offsetHeight !== ref.scrollHeight) {
      setShowScrollable(true);
      // add listener to disappear when scroll
      ref.addEventListener("scroll", () => setShowScrollable(false));
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        infoRef.current?.removeEventListener("scroll", () =>
          setShowScrollable(false)
        );
      };
    } else {
      setShowScrollable(false);
    }
  }, [transition]);

  // add animation for blank info slide to slide up when changing resolution
  useEffect(() => {
    if (!isTablet && !hasSelectedActive) {
      setTransition(pokemonInfoSlideContainer);
    } else if (isTablet && hasSelectedActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [hasSelectedActive, isTablet]);

  return (
    <>
      {isTablet ? (
        <>
          {hasSelectedActive ? (
            <Box
              sx={{
                ...mobileOutterPokemonInfoSlideContainer,
                bgcolor: hasClosedMobile
                  ? "transparent"
                  : `${TYPE_COLOURS[pokemonData?.types[0].type.name]}99`,
              }}
            >
              <Hoverable
                onClick={handleCloseClick}
                sx={{
                  ...mobileInfoCloseButtonStyle,
                  opacity: hasClosedMobile ? "0" : "1",
                }}
              >
                <CloseRoundedIcon
                  sx={{
                    width: "50px",
                    height: "50px",
                    marginTop: "2px",
                    color: primaryTextColour,
                  }}
                />
              </Hoverable>
              <CustomCard sx={transition}>
                <Box
                  component="img"
                  src={pokemonAnimation}
                  alt={`${
                    activePokemonData?.species.name ?? "Default"
                  }'s Sprite`}
                  sx={pokemonSpriteStyle}
                />
                <Tooltip title="More">
                  <Fab
                    sx={{
                      ...expandPokemonButtonStyle,
                      ...mobileExpandPokemonButtonStyle,
                    }}
                    onClick={handleMoreClick}
                  >
                    <OpenInFullRoundedIcon
                      sx={{ width: "30px", height: "30px" }}
                    />
                  </Fab>
                </Tooltip>
                <Box sx={mobileInfoSlideScrollContainer}>
                  <Box sx={mobileInfoSlideContainer} ref={infoRef}>
                    <Stack
                      maxWidth="450px"
                      width="100%"
                      display="flex"
                      alignItems="center"
                      m="0 auto"
                    >
                      <SecondaryText
                        fontSize="12px"
                        fontWeight="bold"
                        marginBottom="-5px"
                      >
                        N# {pokemonData.id}
                      </SecondaryText>
                      <BodyText fontWeight="bold" fontSize="24px">
                        {capitalise(pokemonData?.species.name)}
                      </BodyText>

                      <Box
                        display="flex"
                        gap="10px"
                        m="10px"
                        justifyContent="center"
                      >
                        {pokemonData?.types.map((type, index) => (
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

                        <Box sx={statTotalContainer}>
                          <BodyText fontSize="15px" fontWeight="bold">
                            Total:
                          </BodyText>
                          <BodyText fontSize="15px"> {totalStat}</BodyText>
                        </Box>
                      </Box>

                      <EvolutionChain
                        pokedexData={pokedexData}
                        pokemonData={pokemonData}
                        setActivePokemon={setActivePokemon}
                        setTransition={setTransition}
                      />

                      <StatTitleText fontSize="16px">EV Yield</StatTitleText>
                      <Box display="flex" justifyContent="center" gap="10px">
                        {pokemonData.stats.map((statInfo, index) => (
                          <EffortValueTag
                            stat={statInfo.stat.name}
                            value={statInfo.effort}
                            key={index}
                          />
                        ))}
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </CustomCard>
              {hasClosedMobile ? (
                <></>
              ) : (
                <Box
                  component="img"
                  src={pokeballLoader}
                  alt="Loading"
                  sx={infoSlideLoaderStyle}
                />
              )}
            </Box>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Box sx={outterPokemonInfoSlideContainer}>
          <CustomCard sx={transition}>
            <Box
              component="img"
              src={pokemonAnimation}
              alt={`${activePokemonData?.species.name ?? "Default"}'s Sprite`}
              sx={pokemonSpriteStyle}
            />
            {hasSelectedActive ? (
              <Tooltip title="More">
                <Fab sx={expandPokemonButtonStyle} onClick={handleMoreClick}>
                  <OpenInFullRoundedIcon />
                </Fab>
              </Tooltip>
            ) : (
              <></>
            )}
            <Box sx={infoSlideScrollContainer}>
              <Box sx={infoSlideContainer} ref={infoRef}>
                {hasSelectedActive ? (
                  <Stack width="100%" display="flex" alignItems="center">
                    <Box
                      sx={
                        showScrollable
                          ? indicateScrollContainer
                          : hideScrollableStyle
                      }
                    >
                      <KeyboardDoubleArrowDownRoundedIcon
                        sx={indicateScrollableStyle}
                      />
                    </Box>

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

                    <Box
                      display="flex"
                      gap="10px"
                      m="10px"
                      justifyContent="center"
                    >
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

                      <Box sx={statTotalContainer}>
                        <BodyText fontSize="15px" fontWeight="bold">
                          Total:
                        </BodyText>
                        <BodyText fontSize="15px"> {totalStat}</BodyText>
                      </Box>
                    </Box>

                    <EvolutionChain
                      pokedexData={pokedexData}
                      pokemonData={pokemonData}
                      setActivePokemon={setActivePokemon}
                      setTransition={setTransition}
                    />

                    <StatTitleText fontSize="16px">EV Yield</StatTitleText>
                    <Box display="flex" justifyContent="center" gap="10px">
                      {pokemonData.stats.map((statInfo, index) => (
                        <EffortValueTag
                          stat={statInfo.stat.name}
                          value={statInfo.effort}
                          key={index}
                        />
                      ))}
                    </Box>
                  </Stack>
                ) : (
                  <SecondaryText fontWeight="bold">
                    Please select a Pokemon.
                  </SecondaryText>
                )}
              </Box>
            </Box>
          </CustomCard>
          <Box
            component="img"
            src={pokeballLoader}
            alt="Loading"
            sx={infoSlideLoaderStyle}
          />
        </Box>
      )}
    </>
  );
};
