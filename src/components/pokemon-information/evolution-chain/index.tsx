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

type EvolutionChainProps = {
  pokemon: string;
};

type EvoStages = StageInfo[][];

type StageInfo = {
  name: string;
  trigger: NameUrlType;
  methods: Record<string, any>;
  sprite: string;
};

// need to traverse chain structure like a tree to print out pokemons
// maybe have a data structure that contains all levels of the tree, each level contains a React Component
// have a way to manage trigger + methods to know which image to print
//    will need to call pokemon/{name} cos i can't get the fking sprite with name only

export const EvolutionChain: React.FC<EvolutionChainProps> = ({ pokemon }) => {
  const [evolutionStages, setEvolutionStages] = useState<EvoStages>([]);

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
        name: pokemonName,
        trigger: details.trigger,
        methods: evolveMethods,
        sprite: "",
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

  const getSprites = (stages: EvoStages) => {
    stages.forEach((stage) => {
      stage.forEach((pokemon) => {
        sendGenericAPIRequest<PokemonDataResponseType>(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        ).then((data) => {
          if (data) pokemon.sprite = data.sprites.front_default;
        });
      });
    });
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
  }, [evoTreeTraverse, pokemon]);

  useEffect(() => {
    if (evolutionStages?.length !== 0) {
      console.log(evolutionStages);
    }
  }, [evolutionStages]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
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
            <Box key={index_j}>
              <Box component="img" src={evo.sprite} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
