import React, { useEffect, useState } from "react";
import {
  PokemonAbilityResponseType,
  PokemonAbilityType,
} from "../../../../services/apiRequestsTypes";
import { Box, Tooltip } from "@mui/material";
import { BodyText, SecondaryText } from "../../../../utils/styledComponents";
import { capitalise, removeDash } from "../../../../utils/helpers";
import { sendGenericAPIRequest } from "../../../../services/apiRequests";

type AbilityTagProps = {
  abilityInfo: PokemonAbilityType;
};

export const AbilityTag: React.FC<AbilityTagProps> = ({ abilityInfo }) => {
  const [abilityName, setAbilityName] = useState<string>("");
  const [abilityDesc, setAbilityDesc] = useState<string>("");

  useEffect(() => {
    if (abilityInfo.ability) {
      // set ability name
      const name = abilityInfo.ability.name;
      setAbilityName(capitalise(removeDash(name), true));
      // get ability description for tooltip
      sendGenericAPIRequest<PokemonAbilityResponseType>(
        abilityInfo.ability.url
      ).then((data) => {
        if (!data) return;
        for (const flavorText of data.flavor_text_entries) {
          if (flavorText.language.name === "en") {
            setAbilityDesc(flavorText.flavor_text);
            break;
          }
        }
      });
    }
  }, [abilityInfo]);

  return (
    <Tooltip title={abilityDesc} arrow>
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
    </Tooltip>
  );
};
