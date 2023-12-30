import { Box } from "@mui/material";
import React from "react";
import { STAT_COLOURS } from "../../../utils/colours";
import { BodyText } from "../../../utils/styledComponents";
import {
  statBarContainer,
  statContainer,
  statBar,
  statValue,
  statTitle,
} from "./style";
import { STAT_ABBRV } from "../../../utils/helpers";

type StatBarProps = {
  stat: string;
  value: number;
  large?: boolean;
};

const MAX_STAT_VALUE = 211;

export const StatBar: React.FC<StatBarProps> = ({ stat, value, large }) => {
  return (
    <>
      {large ? (
        <Box sx={statContainer}>
          <Box sx={statBarContainer}>
            <BodyText sx={statTitle}>{STAT_ABBRV[stat]}</BodyText>
            <Box
              sx={{
                ...statBar,
                width: `${(value / MAX_STAT_VALUE) * 100}%`,
                backgroundColor: `${STAT_COLOURS[stat]}`,
              }}
            ></Box>
            <BodyText sx={statValue}>{value}</BodyText>
          </Box>
        </Box>
      ) : (
        <Box sx={statContainer}>
          <Box sx={statBarContainer}>
            <BodyText sx={statTitle}>{STAT_ABBRV[stat]}</BodyText>
            <Box
              sx={{
                ...statBar,
                width: `${(value / MAX_STAT_VALUE) * 100}%`,
                backgroundColor: `${STAT_COLOURS[stat]}`,
              }}
            ></Box>
            <BodyText sx={statValue}>{value}</BodyText>
          </Box>
        </Box>
      )}
    </>
  );
};
