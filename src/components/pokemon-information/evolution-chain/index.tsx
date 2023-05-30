import React, { useCallback, useEffect, useState } from "react";
import { sendGenericAPIRequest } from "../../../services/apiRequests";
import {
  NameUrlType,
  PokemonEvoChainType,
  PokemonEvoDetailsType,
  PokemonEvolutionResponseType,
  PokemonSpeciesResponseType,
} from "../../../services/apiRequestsTypes";
import { pokemonEvoDetailsDefault } from "../../../utils/defaults";
import { Box } from "@mui/material";
import { PokemonDataResponseType } from "../../../services/apiRequestsTypes";
import { BodyText, StatTitleText } from "../../../utils/styledComponents";
import {
  pokemonEvoMethodContainer,
  pokemonEvoStageContainer,
  pokemonEvolutionContainer,
} from "./style";

type EvolutionChainProps = {
  pokemonId: number;
};

type EvoStages = StageInfo[][];

type StageInfo = {
  stage: number;
  name: string;
  methods: Record<string, any>;
  trigger: NameUrlType;
};

export const EvolutionChain: React.FC<EvolutionChainProps> = ({
  pokemonId,
}) => {
  const [evolutionStages, setEvolutionStages] = useState<EvoStages>([]);
  const [evolutionSprites, setEvolutionSprites] = useState<string[][]>([]);

  // revursively traverse the evolution tree and add it to per level
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

  const getSpritePromise = (name: string): Promise<string> => {
    return new Promise((resolve) => {
      sendGenericAPIRequest<PokemonDataResponseType>(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
        () => setEvolutionStages([])
      ).then((data) => {
        if (data) resolve(data.sprites.front_default);
      });
    });
  };

  const methodImage = (method: string, value: any) => {
    const valueTyped =
      typeof method === "object" ? (value as NameUrlType) : value;
    switch (method) {
      case "min_level":
        return (
          <BodyText fontWeight="bold" fontSize="12px">
            Lv.{value}
          </BodyText>
        );
      case "item":
        return (
          <Box
            component="img"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${valueTyped.name}.png`}
            alt={valueTyped.name}
          />
        );
      case "min_affection":
        return (
          <Box>
            <Box
              component="img"
              src={
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/soothe-bell.png"
              }
              alt="affection"
            />
            <BodyText
              fontWeight="bold"
              fontSize="10px"
              sx={{ marginTop: "-10px" }}
            >
              {value}
            </BodyText>
          </Box>
        );
      case "min_happiness":
        return (
          <Box>
            <Box
              component="img"
              src={
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/soothe-bell.png"
              }
              alt="friendship"
            />
            <BodyText
              fontWeight="bold"
              fontSize="10px"
              sx={{ marginTop: "-10px" }}
            >
              {value}
            </BodyText>
          </Box>
        );
      case "time_of_day":
        return (
          <BodyText fontWeight="bold" fontSize="10px">
            ({value})
          </BodyText>
        );
      case "known_move_type":
        return (
          <Box
            component="img"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${valueTyped.name}.png`}
            alt={`${valueTyped.name} TM`}
          />
        );
    }

    return (
      <BodyText fontWeight="bold" fontSize="10px">
        {method}
      </BodyText>
    );
  };

  const getSprite = (i: number, j: number, name: string) => {
    if (evolutionSprites[i] && evolutionSprites[i][j]) {
      return (
        <Box
          component="img"
          src={evolutionSprites[i][j]}
          alt={`${name}'s sprite`}
          sx={{ wdith: "74px", height: "74px" }}
        />
      );
    }
  };

  useEffect(() => {
    if (pokemonId)
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
        () => setEvolutionStages([])
      ).then((data) => {
        if (data) {
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
  }, [evoTreeTraverse, getSprites, pokemonId]);

  return (
    <>
      {evolutionStages.length > 1 && (
        <>
          <StatTitleText fontSize="16px" sx={{ marginBottom: "-5px" }}>
            Evolution
          </StatTitleText>

          <Box
            display="flex"
            sx={pokemonId === 133 ? { marginLeft: "-130px" } : {}}
          >
            {evolutionStages.map((stage, index_i) => (
              <Box key={index_i} sx={pokemonEvoStageContainer}>
                {stage.map((evo, index_j) => (
                  <Box sx={pokemonEvolutionContainer} key={index_j}>
                    {evo.stage > 0 && (
                      <Box sx={pokemonEvoMethodContainer}>
                        {Object.keys(evo.methods).map((method, index_m) => (
                          <Box key={index_m}>
                            {methodImage(method, evo.methods[method])}
                          </Box>
                        ))}
                      </Box>
                    )}
                    <>{getSprite(index_i, index_j, evo.name)}</>
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

// {
//   Object.keys(evo.methods).map((method) => (
//     <Box>{method as string}</Box>
//   ));
// }
