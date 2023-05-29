import { Box } from "@mui/material";
import React from "react";
import { fontBgColour, statColours } from "../../utils/colours";
import { BodyText } from "../../utils/styledComponents";

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

const MAX_STAT_VALUE = 256;

export const StatBar: React.FC<StatBarProps> = ({ stat, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <BodyText fontSize="14px" fontWeight="bold">
        {statAbbrv[stat]}
      </BodyText>
      <Box
        sx={{
          position: "relative",
          width: "250px",
          backgroundColor: `${fontBgColour}`,
          borderRadius: "10px",
          height: "8px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            borderRadius: "10px",
            height: "8px",
            width: `${(value / MAX_STAT_VALUE) * 100}%`,
            backgroundColor: `${statColours[stat]}`,
          }}
        ></Box>
      </Box>
    </Box>
  );
};
