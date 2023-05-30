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
import { fontBgColour } from "../../../utils/colours";
import { BodyText } from "../../../utils/styledComponents";

type EvolutionChainProps = {
  pokemon: string;
};

type EvoStages = StageInfo[][];

type StageInfo = {
  stage: number;
  name: string;
  sprite: string;
  methods: Record<string, any>;
  trigger: NameUrlType;
};

// need to traverse chain structure like a tree to print out pokemons
// maybe have a data structure that contains all levels of the tree, each level contains a React Component
// have a way to manage trigger + methods to know which image to print
//    will need to call pokemon/{name} cos i can't get the fking sprite with name only

export const EvolutionChain: React.FC<EvolutionChainProps> = ({ pokemon }) => {
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
        sprite: "",
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
      for (const pokemon of stage) {
        const url = await getSpritePromise(pokemon.name);
        pokemon.sprite = url;
        evoSprite.push(url);
      }
      evoSprites.push(evoSprite);
    }
    setEvolutionSprites([...evoSprites]);
  }, []);

  const getSpritePromise = (name: string): Promise<string> => {
    return new Promise((resolve) => {
      sendGenericAPIRequest<PokemonDataResponseType>(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      ).then((data) => {
        if (data) resolve(data.sprites.front_default);
      });
    });
  };

  const methodImage = (method: string, value: any) => {
    if (method === "min_level") {
      return (
        <BodyText fontWeight="bold" fontSize="12px">
          Lv.{value}
        </BodyText>
      );
    } else if (method === "item") {
      const valueTyped = value as NameUrlType;
      return (
        <Box
          component="img"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${valueTyped.name}.png`}
          alt={valueTyped.name}
        />
      );
    }
    return <>{`${method}: ${value}`}</>;
  };

  const getSprite = (i: number, j: number, name: string) => {
    if (evolutionSprites[i] && evolutionSprites[i][j]) {
      return (
        <Box
          component="img"
          src={evolutionSprites[i][j] ?? ""}
          alt={`${name}'s sprite`}
          sx={{ wdith: "74px", height: "74px" }}
        />
      );
    }
  };

  useEffect(() => {
    if (pokemon)
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
      ).then((data) => {
        if (data) {
          sendGenericAPIRequest<PokemonEvolutionResponseType>(
            `${data?.evolution_chain.url}`
          ).then((data) => {
            const evoStagesTemp: EvoStages = [];
            if (data) evoTreeTraverse(data.chain, 0, evoStagesTemp);
            getSprites(evoStagesTemp);
            setEvolutionStages(evoStagesTemp);
          });
        }
      });
  }, [evoTreeTraverse, getSprites, pokemon]);

  useEffect(() => {
    if (evolutionStages) console.log(evolutionStages);
  }, [evolutionStages]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {evolutionStages.map((stage, index_i) => (
        <Box
          key={index_i}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {stage.map((evo, index_j) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={index_j}
            >
              {evo.stage > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexFlow: "column warp",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: fontBgColour,
                    padding: "5px 10px",
                    borderRadius: "20px",
                    maxHeight: "222px",
                  }}
                >
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
  );
};

// {
//   Object.keys(evo.methods).map((method) => (
//     <Box>{method as string}</Box>
//   ));
// }
