import React, { useEffect, useState } from "react";
import { sendGenericAPIRequest } from "../../../services/apiRequests";
import {
  PokemonEvolutionResponseType,
  PokemonSpeciesResponseType,
  PokemonEvoChainType,
} from "../../../services/apiRequestsTypes";
import { PokemonEvoChainDefault } from "../../../utils/defaults";

type EvolutionChainProps = {
  pokemon: string;
};

export const EvolutionChain: React.FC<EvolutionChainProps> = ({ pokemon }) => {
  const [evolutionChain, setEvolutionChain] = useState<PokemonEvoChainType>(
    PokemonEvoChainDefault
  );

  useEffect(() => {
    if (pokemon)
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
      )
        .then((data) => {
          if (data) {
            return data.evolution_chain;
          }
        })
        .then((chainUrl) => {
          sendGenericAPIRequest<PokemonEvolutionResponseType>(
            `${chainUrl}`
          ).then((data) => {
            if (data) setEvolutionChain(data.chain);
          });
        });
  }, [pokemon]);
  return <>{evolutionChain.species.name}</>;
};
