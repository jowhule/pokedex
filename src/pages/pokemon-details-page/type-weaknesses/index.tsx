import React, { useEffect, useState } from "react";
import { PokemonInfoBox, StatTitleText } from "../../../utils/styledComponents";
import { Box, Stack } from "@mui/material";
import {
  PokemonTypeResponseType,
  PokemonTypeType,
} from "../../../services/apiRequestsTypes";
import { sendGenericAPIRequest } from "../../../services/apiRequests";

type TypeWeaknessesType = {
  types: PokemonTypeType[];
};

export const TypeWeaknesses: React.FC<TypeWeaknessesType> = ({ types }) => {
  const [weaknesses, setWeaknesses] = useState<Record<string, number>>({});
  useEffect(() => {
    // if (types) {
    //   const typePromiseHolder =
    //   for (const type of types) {
    //     sendGenericAPIRequest<PokemonTypeResponseType>(type.type.url).then(
    //       (data) => {
    //         if (data)
    //       }
    //     );
    //   }
    // }
  }, [types]);
  return (
    <Stack width="100%" height="100%">
      <StatTitleText>Weaknesses</StatTitleText>
      <PokemonInfoBox></PokemonInfoBox>
    </Stack>
  );
};
