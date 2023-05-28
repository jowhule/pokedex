import React, { useEffect, useState } from "react";
import { CustomCard } from "../custom-card/CustomCard";
import {
  PokemonDataResponseType,
  pokemonDataDefault,
} from "../../services/apiRequestsTypes";
import { sendGenericAPIRequest } from "../../services/apiRequests";

type MoreInfoSlideType = {
  activePokemonUrl: string;
};

export const MoreInfoSlide: React.FC<MoreInfoSlideType> = ({
  activePokemonUrl,
}) => {
  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);

  useEffect(() => {
    // trigger translate
    sendGenericAPIRequest<PokemonDataResponseType>(activePokemonUrl).then(
      (data) => {
        if (data) setPokemonData(data);
      }
    );
  }, [activePokemonUrl]);

  return (
    <CustomCard
      sx={{
        width: "350px",
        height: "85vh",
        position: "fixed",
        bottom: "-10px",
      }}
    >
      {pokemonData.name}
    </CustomCard>
  );
};
