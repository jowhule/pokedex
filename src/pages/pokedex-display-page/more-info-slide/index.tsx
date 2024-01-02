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
} from "../../../utils/styledComponents";
import {
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
  mobileInfoSlideContainer,
  mobileInfoSlideScrollContainer,
  mobileInfoCloseButtonStyle,
  expandPokemonButtonStyle,
  mobileExpandPokemonButtonStyle,
} from "./style";
import { StatBars } from "../../../components/pokemon-information/stat-bars";
import { EvolutionChain } from "../../../components/pokemon-information/evolution-chain";
import { pokemonDataDefault } from "../../../utils/defaults";
import { capitalise } from "../../../utils/helpers";

import defaultImage from "../../../assets/default_pokemon_info.png";
import pokeballLoader from "../../../assets/pokeball-icon.png";
import { TYPE_COLOURS, primaryTextColour } from "../../../utils/colours";
import { useNavigate } from "react-router-dom";
import { Abilities } from "../../../components/pokemon-information/abilities";
import { Types } from "../../../components/pokemon-information/types";
import { EffortValues } from "../../../components/pokemon-information/effort-values";

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
    if (pokemonData.id) {
      setPokemonAnimation(requestLinks.getSprite(pokemonData.id));
      setHasSelectedActive(true);
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
      // hide scroll on tablet
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [hasSelectedActive, isTablet]);

  return (
    <>
      {isTablet ? (
        <>
          {hasSelectedActive && (
            <Box
              sx={{
                ...mobileOutterPokemonInfoSlideContainer,
                bgcolor: hasClosedMobile
                  ? "transparent"
                  : `${TYPE_COLOURS[pokemonData?.types[0]?.type.name]}99`,
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

                      <Abilities abilitiesData={pokemonData?.abilities} />

                      <StatBars statsData={pokemonData?.stats} />

                      <EvolutionChain
                        pokedexData={pokedexData}
                        pokemonData={pokemonData}
                        setActivePokemon={setActivePokemon}
                        setTransition={setTransition}
                      />

                      <EffortValues statsData={pokemonData?.stats} />
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
            <>
              {hasSelectedActive && (
                <Tooltip title="More">
                  <Fab sx={expandPokemonButtonStyle} onClick={handleMoreClick}>
                    <OpenInFullRoundedIcon />
                  </Fab>
                </Tooltip>
              )}
            </>
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

                    <Types typesData={pokemonData?.types} />

                    <Abilities abilitiesData={pokemonData?.abilities} />

                    <StatBars statsData={pokemonData?.stats} />

                    <EvolutionChain
                      pokedexData={pokedexData}
                      pokemonData={pokemonData}
                      setActivePokemon={setActivePokemon}
                      setTransition={setTransition}
                    />

                    <EffortValues statsData={pokemonData?.stats} />
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
