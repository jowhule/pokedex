import { Box, Stack } from "@mui/material";
import React from "react";
import {
  BodyText,
  PokemonInfoBox,
  StatTitleText,
} from "../../../utils/styledComponents";
import { capitalise } from "../../../utils/helpers";
import { NameUrlType } from "../../../services/apiRequestsTypes";

type EggGroupsType = {
  groupData: NameUrlType[];
};

export const EggGroups: React.FC<EggGroupsType> = ({ groupData }) => {
  return (
    <Stack width="100%" height="100%">
      <StatTitleText>Egg Group</StatTitleText>
      <PokemonInfoBox>
        <Box display="flex" gap="4px">
          {groupData.map((grp, i) => (
            <BodyText key={i}>
              {i !== 0 && (
                <>
                  {i === groupData.length - 1
                    ? groupData.length !== 0 && " and "
                    : ", "}
                </>
              )}
              {capitalise(grp.name)}
            </BodyText>
          ))}
        </Box>
      </PokemonInfoBox>
    </Stack>
  );
};
