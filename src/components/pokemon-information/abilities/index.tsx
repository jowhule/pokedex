import React from "react";
import { PokemonInfoBox, StatTitleText } from "../../../utils/styledComponents";
import { AbilityTag } from "./ability-tag";
import { PokemonAbilityType } from "../../../services/apiRequestsTypes";

type AbilitiesType = {
  abilitiesData: PokemonAbilityType[];
};

export const Abilities: React.FC<AbilitiesType> = ({ abilitiesData }) => {
  return (
    <>
      <StatTitleText fontSize="16px">Abilities</StatTitleText>
        <PokemonInfoBox
          sx={{ flexFlow: "row wrap", gap: "20px", p: "15px 25px" }}
        >
          {abilitiesData?.map((ability, index) => (
            <AbilityTag abilityInfo={ability} key={index} />
          ))}
      </PokemonInfoBox>
    </>
  );
};
