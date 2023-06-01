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
import { Box, Tooltip } from "@mui/material";
import { PokemonDataResponseType } from "../../../services/apiRequestsTypes";
import { Hoverable, StatTitleText } from "../../../utils/styledComponents";
import { EvolutionMethod } from "./evolution-method";
import {
  pokemonEvoSpriteStyle,
  pokemonEvoStageContainer,
  pokemonEvolutionContainer,
} from "./style";
import { pokemonInfoSlideContainer } from "../../more-info-slide/style";
import { capitalise } from "../../../utils/helpers";

type EvoStages = StageInfo[][];

export type StageInfo = {
  stage: number;
  name: string;
  methods: Record<string, any>;
  trigger: NameUrlType;
};

type EvolutionChainProps = {
  pokemonData: PokemonDataResponseType;
  setActivePokemon?: React.Dispatch<React.SetStateAction<string | number>>;
  setTransition?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const EvolutionChain: React.FC<EvolutionChainProps> = ({
  pokemonData,
  setActivePokemon,
  setTransition,
}) => {
  const [evolutionStages, setEvolutionStages] = useState<EvoStages>([]);
  const [evolutionSprites, setEvolutionSprites] = useState<string[][]>([]);
  const [isEeveeLine, setIsEeveeLine] = useState<boolean>(false);

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
            const nameUrlDetail: NameUrlType = details[keyTyped] as NameUrlType;
            evolveMethods[nameUrlDetail.name] = nameUrlDetail.url;
          } else {
            evolveMethods[keyString] = details[keyTyped];
          }
        }
      });

      const pokemonName = root.species.name;

      const currStage: StageInfo = {
        stage: level,
        name: pokemonName,
        methods: evolveMethods,
        trigger: details.trigger,
      };

      if (!evoStages[level]) evoStages.push([]);
      evoStages[level].push(currStage);
      // traverse tree
      root.evolves_to.forEach((evolveTo) => {
        evoTreeTraverse(evolveTo, level + 1, evoStages);
      });
    },
    []
  );

  /**
   * in the same structure as the stages, get the sprites to display
   */
  const getSprites = useCallback(async (stages: EvoStages) => {
    const evoSprites: string[][] = [];
    for (const stage of stages) {
      const evoSprite: string[] = [];
      for (const currEvo of stage) {
        const url = await getSpritePromise(currEvo.name);
        evoSprite.push(url);
      }
      evoSprites.push(evoSprite);
    }
    setEvolutionSprites([...evoSprites]);
  }, []);

  /**
   * a promise to ensure the url is received
   * @param name of pokemon to get sprite of
   * @returns url of the sprite
   */
  const getSpritePromise = (name: string): Promise<string> => {
    return new Promise((resolve) => {
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        requestLinks.getSpecies(name)
      ).then((species) => {
        if (species) {
          sendGenericAPIRequest<PokemonDataResponseType>(
            requestLinks.getData(species.id),
            () => setEvolutionStages([])
          ).then((data) => {
            if (data) resolve(data.sprites.front_default);
          });
        }
      });
    });
  };

  /**
   * displays the sprite of the pokemon onto th eapp
   * @param i ith stage of evolution
   * @param j jth evolution
   * @param name name of pokemon
   * @returns sprite of said pokemon
   */
  const getSprite = (i: number, j: number, name: string) => {
    if (evolutionSprites[i] && evolutionSprites[i][j]) {
      return (
        <Box
          component="img"
          src={evolutionSprites[i][j]}
          alt={`${name}'s sprite`}
          sx={pokemonEvoSpriteStyle}
        />
      );
    }
  };

  /**
   * click on an evo to change active pokemon (slide change)
   * @param name name of pokem on clicked on
   */
  const handleEvoClick = (name: string) => {
    if (setActivePokemon && name !== pokemonData.species.name)
      setActivePokemon(name);
  };

  useEffect(() => {
    if (pokemonData)
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        requestLinks.getSpecies(pokemonData.species.name),
        () => setEvolutionStages([])
      ).then((data) => {
        if (data) {
          data?.evolution_chain.url.split("/").at(-2) === "67"
            ? setIsEeveeLine(true)
            : setIsEeveeLine(false);

          sendGenericAPIRequest<PokemonEvolutionResponseType>(
            `${data?.evolution_chain.url}`
          ).then((data) => {
            const evoStagesTemp: EvoStages = [];
            if (data) {
              evoTreeTraverse(data.chain, 0, evoStagesTemp);
              getSprites(evoStagesTemp);
              setEvolutionStages(evoStagesTemp);
            }
          });
        }
      });
  }, [evoTreeTraverse, getSprites, pokemonData]);

  useEffect(() => {
    if (
      evolutionStages.length > 0 &&
      evolutionSprites.length > 0 &&
      setTransition
    ) {
      setTimeout(() => {
        setTransition(pokemonInfoSlideContainer);
      }, 400);
    }
  }, [evolutionSprites.length, evolutionStages, setTransition]);

  useEffect(() => {
    setEvolutionSprites([]);
    setEvolutionStages([]);
  }, [pokemonData]);

  return (
    <>
      {evolutionStages.length > 1 && (
        <>
          <StatTitleText fontSize="16px">Evolution</StatTitleText>
          <Box display="flex" sx={isEeveeLine ? { marginLeft: "-130px" } : {}}>
            {evolutionStages.map((stage, index_i) => (
              <Box key={index_i} sx={pokemonEvoStageContainer}>
                {stage.map((evo, index_j) => (
                  <Box sx={pokemonEvolutionContainer} key={index_j}>
                    <EvolutionMethod stageInfo={evo} />
                    <Tooltip title={capitalise(evo.name)}>
                      <Hoverable onClick={() => handleEvoClick(evo.name)}>
                        {getSprite(index_i, index_j, evo.name)}
                      </Hoverable>
                    </Tooltip>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </>
      )}
    </>
  );
};
