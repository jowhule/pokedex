import { Box } from "@mui/material";
import React from "react";
import { statColours } from "../../../utils/colours";
import { BodyText } from "../../../utils/styledComponents";
import {
  statBarContainer,
  statContainer,
  statBar,
  statValue,
  statTitle,
} from "./style";

type StatBarProps = {
  stat: string;
  value: number;
};

const statAbbrv: Record<string, string> = {
  hp: "hp",
  attack: "atk",
  defense: "def",
  "special-attack": "spA",
  "special-defense": "spD",
  speed: "spd",
};

const MAX_STAT_VALUE = 211;

export const StatBar: React.FC<StatBarProps> = ({ stat, value }) => {
  return (
    <Box sx={statContainer}>
      <Box sx={statBarContainer}>
        <BodyText sx={statTitle}>{statAbbrv[stat]}</BodyText>
        <Box
          sx={{
            ...statBar,
            width: `${(value / MAX_STAT_VALUE) * 100}%`,
            backgroundColor: `${statColours[stat]}`,
          }}
        ></Box>
        <BodyText sx={statValue}>{value}</BodyText>
      </Box>
    </Box>
  );
};
