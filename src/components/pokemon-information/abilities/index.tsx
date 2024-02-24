import React from "react";
import { StatTitleText } from "../../../utils/styledComponents";
import { AbilityTag } from "./ability-tag";
import { Box } from "@mui/material";
import { PokemonAbilityType } from "../../../services/apiRequestsTypes";
import { abilitiesContainerStyle } from "./style";

type AbilitiesType = {
  abilitiesData: PokemonAbilityType[];
};

export const Abilities: React.FC<AbilitiesType> = ({ abilitiesData }) => {
  return (
    <>
      <StatTitleText fontSize="16px">Abilities</StatTitleText>
      <Box sx={abilitiesContainerStyle}>
        {abilitiesData?.map((ability, index) => (
          <AbilityTag abilityInfo={ability} key={index} />
        ))}
      </Box>
    </>
  );
};
