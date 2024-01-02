import React from "react";
import { BodyText, StatTitleText } from "../../../utils/styledComponents";
import { Box } from "@mui/material";
import { PokemonStatType } from "../../../services/apiRequestsTypes";
import { effortTagContainer, effortTagTitle } from "./style";
import { STAT_COLOURS } from "../../../utils/colours";
import { STAT_ABBRV } from "../../../utils/helpers";

type EffortValuesType = {
  statsData: PokemonStatType[];
};
export const EffortValues: React.FC<EffortValuesType> = ({ statsData }) => {
  return (
    <>
      <StatTitleText fontSize="16px">EV Yield</StatTitleText>
      <Box display="flex" justifyContent="center" gap="10px">
        {statsData.map((statInfo, index) => (
          <Box key={index} sx={effortTagContainer}>
            <BodyText
              sx={{
                ...effortTagTitle,
                bgcolor: `${STAT_COLOURS[statInfo.stat.name]}`,
              }}
            >
              {STAT_ABBRV[statInfo.stat.name]}
            </BodyText>
            <BodyText fontSize="12px" textAlign="center">
              {statInfo.effort}
            </BodyText>
          </Box>
        ))}
      </Box>
    </>
  );
};
