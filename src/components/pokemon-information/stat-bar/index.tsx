import { Box } from "@mui/material";
import React from "react";
import { statColours } from "../../../utils/colours";
import { BodyText } from "../../../utils/styledComponents";
import { statBarContainer, statContainer, statBar } from "./style";

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

const MAX_STAT_VALUE = 250;

export const StatBar: React.FC<StatBarProps> = ({ stat, value }) => {
  return (
    <Box sx={statContainer}>
      <BodyText fontSize="14px" fontWeight="bold">
        {statAbbrv[stat]}
      </BodyText>
      <Box sx={statBarContainer}>
        <Box
          sx={{
            ...statBar,
            width: `${(value / MAX_STAT_VALUE) * 100}%`,
            backgroundColor: `${statColours[stat]}`,
          }}
        ></Box>
        <BodyText
          fontSize="10px"
          fontWeight="bold"
          position="absolute"
          textAlign="right"
          width="100%"
          top="-1px"
          right="3px"
        >
          {value}
        </BodyText>
      </Box>
    </Box>
  );
};
