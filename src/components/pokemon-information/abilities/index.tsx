import React from "react";
import { StatTitleText } from "../../../utils/styledComponents";
import { AbilityTag } from "./ability-tag";
import { PokemonAbilityType } from "../../../services/apiRequestsTypes";
import { CustomCard } from "../../custom-card/CustomCard";

type AbilitiesType = {
  abilitiesData: PokemonAbilityType[];
};

export const Abilities: React.FC<AbilitiesType> = ({ abilitiesData }) => {
  return (
    <>
      <StatTitleText fontSize="16px">Abilities</StatTitleText>
      <CustomCard
        dark
        sx={{
          flexFlow: "row wrap",
          gap: "20px",
          flex: 1,
        }}
      >
        {abilitiesData?.length > 0
          ? abilitiesData?.map((ability, index) => (
              <AbilityTag abilityInfo={ability} key={index} />
            ))
          : "This Pokémon has no abilities."}
      </CustomCard>
    </>
  );
};
