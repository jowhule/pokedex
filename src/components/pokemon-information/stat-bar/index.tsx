import { Box } from "@mui/material";
import React from "react";
import { statColours } from "../../../utils/colours";
import { BodyText } from "../../../utils/styledComponents";
import { STAT_BAR_HEIGHT, statBarContainer, statContainer } from "./style";

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

const MAX_STAT_VALUE = 252;

export const StatBar: React.FC<StatBarProps> = ({ stat, value }) => {
  return (
    <Box sx={statContainer}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="60px"
        marginRight="5px"
      >
        <BodyText fontSize="14px" fontWeight="bold">
          {statAbbrv[stat]}:
        </BodyText>
        <BodyText fontSize="14px" fontWeight="bold">
          {value}
        </BodyText>
      </Box>
      <Box sx={statBarContainer}>
        <Box
          sx={{
            borderRadius: "10px",
            height: STAT_BAR_HEIGHT,
            width: `${(value / MAX_STAT_VALUE) * 100}%`,
            backgroundColor: `${statColours[stat]}`,
            fontSize: "10px",
            fontWeight: "bold",
            textAlign: "right",
            boxSizing: "border-box",
            padding: "0 5px",
          }}
        ></Box>
      </Box>
    </Box>
  );
};
