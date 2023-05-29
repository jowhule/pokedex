import React, { useEffect, useState } from "react";
import { PokemonAbilityType } from "../../services/apiRequestsTypes";
import { Box } from "@mui/material";
import { BodyText, SecondaryText } from "../../utils/styledComponents";

type AbilityTagProps = {
  abilityInfo: PokemonAbilityType;
};

export const AbilityTag: React.FC<AbilityTagProps> = ({ abilityInfo }) => {
  const [abilityName, setAbilityName] = useState<string>("");

  useEffect(() => {
    if (abilityInfo.ability) {
      const name = abilityInfo.ability.name;
      setAbilityName(name[0].toUpperCase() + name.slice(1));
    }
  }, [abilityInfo]);

  return (
    <Box
      sx={{
        padding: "0 10px",
        width: "120px",
        height: "35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BodyText fontSize="16px">{abilityName}</BodyText>
      {abilityInfo.is_hidden && (
        <SecondaryText fontSize="12px" sx={{ marginTop: "-5px" }}>
          hidden ability
        </SecondaryText>
      )}
    </Box>
  );
};
