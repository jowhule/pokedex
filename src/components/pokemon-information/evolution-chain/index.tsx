import React, { useCallback, useEffect, useState } from "react";
import {
  requestLinks,
  sendGenericAPIRequest,
} from "../../../services/apiRequests";
import {
  NameUrlType,
  PokemonEvoChainType,
  PokemonEvoDetailsType,
  PokemonEvolutionResponseType,
  PokemonSpeciesResponseType,
} from "../../../services/apiRequestsTypes";
import { pokemonEvoDetailsDefault } from "../../../utils/defaults";
import { Box, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { PokemonDataResponseType } from "../../../services/apiRequestsTypes";
import { Hoverable, StatTitleText } from "../../../utils/styledComponents";
import { EvolutionMethod } from "./evolution-method";
import {
  largePokeEvoSpriteStyle,
  largePokeEvoStageContainer,
  pokemonEvoSpriteStyle,
  pokemonEvoStageContainer,
  pokemonEvolutionContainer,
} from "./style";
import {
  mobilePokemonInfoSlideContainer,
  pokemonInfoSlideContainer,
} from "../../../pages/pokedex-display-page/more-info-slide/style";
import { capitalise, getIdFromLink } from "../../../utils/helpers";
import { useNavigate } from "react-router";

type EvoStages = StageInfo[][];

export type StageInfo = {
  name: string;
  sprite: string;
  methods: Record<string, any>;
  trigger: NameUrlType;
};

type EvolutionChainProps = {
  pokedexData?: Record<string, PokemonDataResponseType>;
  pokemonData: PokemonDataResponseType;
  setActivePokemon?: React.Dispatch<React.SetStateAction<string>>;
  setTransition?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  large?: boolean;
  noEvoText?: boolean;
};

export const EvolutionChain: React.FC<EvolutionChainProps> = ({
  pokedexData,
  pokemonData,
  setActivePokemon,
  setTransition,
  large,
  noEvoText,
}) => {
  const [evolutionStages, setEvolutionStages] = useState<EvoStages>([]);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  // recursively traverse the evolution tree and add it to per level array
  const evoTreeTraverse = useCallback(
    (root: PokemonEvoChainType, level: number, evoStages: EvoStages) => {
      if (!root.species) return;
      const details: PokemonEvoDetailsType =
        root.evolution_details.length !== 0
          ? root.evolution_details[0]
          : pokemonEvoDetailsDefault;

      const evolveMethods: Record<string, any> = {};
      Object.keys(details).forEach((key) => {
        const keyTyped = key as keyof PokemonEvoDetailsType;
        const keyString = key as string;

        if (keyString !== "trigger" && details[keyTyped]) {
          if (typeof evolveMethods[keyString] === "object") {
            const nameUrlDetail = details[keyTyped] as NameUrlType;
            evolveMethods[nameUrlDetail.name] = nameUrlDetail.url;
          } else {
            evolveMethods[keyString] = details[keyTyped];
          }
        }
      });

      const pokemonName = root.species.name;

      const currStage: StageInfo = {
        name: pokemonName,
        sprite: "",
        methods: evolveMethods,
        trigger: details.trigger,
      };

      if (!evoStages[level]) evoStages.push([]);
      if (pokedexData && pokedexData[pokemonName]) {
        currStage.sprite = pokedexData[pokemonName].sprites.front_default;
      } else {
        currStage.sprite = requestLinks.getStillSprite(
          parseInt(getIdFromLink(root.species.url))
        );
      }
      evoStages[level].push(currStage);

      // traverse tree
      root.evolves_to.forEach((evolveTo) => {
        evoTreeTraverse(evolveTo, level + 1, evoStages);
      });
    },
    [pokedexData]
  );

  /**
   * click on an evo to change active pokemon (slide change)
   * @param name name of pokem on clicked on
   */
  const handleEvoClick = (name: string) => {
    if (!pokedexData) {
      navigate(`/pokemon/${name}`);
    } else if (setActivePokemon && name !== pokemonData.species.name) {
      setActivePokemon(name);
    }
  };

  // get evolution data
  useEffect(() => {
    if (pokemonData)
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        requestLinks.getSpecies(pokemonData.species.name),
        () => setEvolutionStages([])
      ).then((data) => {
        if (data && data?.evolution_chain?.url) {
          sendGenericAPIRequest<PokemonEvolutionResponseType>(
            `${data.evolution_chain.url}`
          ).then((data) => {
            if (data) {
              const evoStagesTemp: EvoStages = [];
              evoTreeTraverse(data.chain, 0, evoStagesTemp);
              // get rid of any unnecessary methods/trigger if there is not prev evo
              for (let i = 1; i < evoStagesTemp.length; i++) {
                if (evoStagesTemp[i - 1].length === 0)
                  for (const evo of evoStagesTemp[i]) {
                    evo.methods = {};
                    evo.trigger = { name: "", url: "" };
                  }
              }
              setEvolutionStages(evoStagesTemp);
            }
          });
        }
      });
  }, [evoTreeTraverse, pokemonData]);

  useEffect(() => {
    let transitionInTimer: ReturnType<typeof setTimeout> | null = null;

    if (evolutionStages.length > 0 && setTransition)
      transitionInTimer = setTimeout(() => {
        setTransition(
          isTablet ? mobilePokemonInfoSlideContainer : pokemonInfoSlideContainer
        );
      }, 400);

    return () => {
      if (transitionInTimer) clearTimeout(transitionInTimer);
    };
  }, [evolutionStages, isTablet, setTransition]);

  useEffect(() => {
    setEvolutionStages([]);
  }, [pokemonData]);

  return (
    <>
      {evolutionStages.length > 1 ? (
        <>
          <StatTitleText
            sx={
              large
                ? { fontSize: "20px", textAlign: "center" }
                : { fontSize: "16px" }
            }
          >
            Evolution
          </StatTitleText>
          <Box display="flex" justifyContent="center">
            {evolutionStages.map((stage, index_i) => (
              <Box
                key={index_i}
                sx={
                  large ? largePokeEvoStageContainer : pokemonEvoStageContainer
                }
              >
                {stage.map((evo, index_j) => (
                  <Box sx={pokemonEvolutionContainer} key={index_j}>
                    <EvolutionMethod stageInfo={evo} />
                    <Tooltip title={capitalise(evo.name)}>
                      <Hoverable onClick={() => handleEvoClick(evo.name)}>
                        <Box
                          component="img"
                          src={evo.sprite}
                          alt={`${evo.name}'s sprite`}
                          sx={
                            large
                              ? largePokeEvoSpriteStyle
                              : pokemonEvoSpriteStyle
                          }
                        />
                      </Hoverable>
                    </Tooltip>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </>
      ) : (
        noEvoText && (
          <StatTitleText textAlign="center">
            This Pokemon does not evolve.
          </StatTitleText>
        )
      )}
    </>
  );
};
