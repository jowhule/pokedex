import React, { useEffect, useState } from "react";
import { sendGenericAPIRequest } from "../../../services/apiRequests";
import {
  NameUrlType,
  PokemonEvoChainType,
  PokemonEvoDetailsType,
  PokemonEvolutionResponseType,
  PokemonSpeciesResponseType,
} from "../../../services/apiRequestsTypes";
import { pokemonEvoDetailsDefault } from "../../../utils/defaults";

type EvolutionChainProps = {
  pokemon: string;
};

type EvoLineType = {
  name: string;
  evolvesToUrl: string;
  methods: Record<string, any>;
  trigger: NameUrlType;
};

export const EvolutionChain: React.FC<EvolutionChainProps> = ({ pokemon }) => {
  const [evolutionChain, setEvolutionChain] = useState<EvoLineType[]>([]);

  // const traverseEvoTree = (
  //   root: PokemonEvoChainType,
  //   returnVar: EvoLineType[]
  // ) => {};
  // const getPokemonEvos = () => {};

  useEffect(() => {
    if (pokemon)
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
      )
        .then((data) => {
          if (data) return data;
        })
        .then((chain) => {
          sendGenericAPIRequest<PokemonEvolutionResponseType>(
            `${chain?.evolution_chain.url}`
          ).then((data) => {
            if (data) {
              let nextEvo = data.chain;
              const evoChain: EvoLineType[] = [];

              while (nextEvo.species) {
                const nextEvoUrl: string = nextEvo.evolves_to[0].species.url;

                const details: PokemonEvoDetailsType =
                  nextEvo.evolution_details[0];

                const evolveMethods: Record<string, any> = {};
                Object.keys(details).forEach((key) => {
                  const keyTyped = key as keyof PokemonEvoDetailsType;
                  const keyString = key as string;

                  if (keyString !== "trigger" && details[keyTyped]) {
                    if (typeof evolveMethods[keyString] === "object") {
                      const nameUrlDetail: NameUrlType = details[
                        keyTyped
                      ] as NameUrlType;
                      evolveMethods[nameUrlDetail.name] = nameUrlDetail.url;
                    } else {
                      evolveMethods[keyString] = details[keyTyped];
                    }
                  }
                });

                const currEvo: EvoLineType = {
                  name: nextEvo.species.name,
                  evolvesToUrl: nextEvoUrl,
                  methods: evolveMethods,
                  trigger: details.trigger,
                };

                evoChain.push(currEvo);
                nextEvo = nextEvo.evolves_to[0] ?? [];
              }

              setEvolutionChain(evoChain);
            }
          });
        });
  }, [evolutionChain.length, pokemon]);

  useEffect(() => {
    if (evolutionChain?.length !== 0) {
      console.log(evolutionChain);
    }
  }, [evolutionChain]);

  return <>{}</>;
};
