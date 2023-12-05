import React, { useEffect, useState } from "react";
import { PokemonAbilityType } from "../../../services/apiRequestsTypes";
import { Box } from "@mui/material";
import { BodyText, SecondaryText } from "../../../utils/styledComponents";
import { capitalise, removeDash } from "../../../utils/helpers";

type AbilityTagProps = {
  abilityInfo: PokemonAbilityType;
};

export const AbilityTag: React.FC<AbilityTagProps> = ({ abilityInfo }) => {
  const [abilityName, setAbilityName] = useState<string>("");

  useEffect(() => {
    if (abilityInfo.ability) {
      const name = abilityInfo.ability.name;
      setAbilityName(capitalise(removeDash(name), true));
    }
  }, [abilityInfo]);

  return (
    <Box
      sx={{
        width: "120px",
        height: "35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BodyText fontSize="16px" lineHeight="100%">
        {abilityName}
      </BodyText>
      {abilityInfo.is_hidden && (
        <SecondaryText fontSize="12px" sx={{ marginTop: "-1px" }}>
          hidden ability
        </SecondaryText>
      )}
    </Box>
  );
};
