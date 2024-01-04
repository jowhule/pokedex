import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BodyText,
  PokemonInfoBox,
  StatTitleText,
} from "../../../utils/styledComponents";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import {
  genderBarStyle,
  genderInfoContainer,
  genderStatContainer,
} from "./style";

type GenderDisplayType = {
  genderRatio: number;
};

const maleColor = "#afeeee";
const maleColorDarker = "#93d2db";
const femaleColor = "#ffc0cb";
const femaleColorDarker = "#f79fa0";

export const GenderDisplay: React.FC<GenderDisplayType> = ({ genderRatio }) => {
  const [ratio, setRatio] = useState<number>(0);
  useEffect(() => {
    setRatio((genderRatio / 8) * 100);
  }, [genderRatio]);

  return (
    <Stack flex="1">
      <StatTitleText>Gender Ratio</StatTitleText>
      {ratio ? (
        <PokemonInfoBox>
          <Box sx={genderInfoContainer}>
            <Box
              sx={{
                ...genderBarStyle,
                position: "relative",

                background: `linear-gradient(to right, ${femaleColorDarker} 0%, ${femaleColorDarker} ${
                  ratio + 0.5
                }%, ${maleColorDarker} ${
                  ratio + 0.5
                }%, ${maleColorDarker} 100%)`,
                width: "80%",
                p: "3px",
              }}
            >
              <Box
                sx={{
                  ...genderBarStyle,
                  position: "absolute",
                  height: "15px",
                  borderRadius: "15px",
                  m: "0 auto",
                  background: `linear-gradient(to right, ${femaleColor} 0%, ${femaleColor} ${ratio}%, ${maleColor} ${ratio}%, ${maleColor} 100%)`,
                  width: "calc(100% - 6px)",
                }}
              />
            </Box>
            <Box sx={genderStatContainer}>
              <BodyText>{ratio}%</BodyText>
              <FemaleRoundedIcon sx={{ color: `${femaleColorDarker}` }} />
              <BodyText>{100 - ratio}%</BodyText>
              <MaleRoundedIcon sx={{ color: `${maleColorDarker}` }} />
            </Box>
          </Box>
        </PokemonInfoBox>
      ) : (
        "Gender Unknown"
      )}
    </Stack>
  );
};
