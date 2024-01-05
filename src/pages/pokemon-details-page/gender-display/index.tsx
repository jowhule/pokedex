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

  const borderRatio = (ratio: number): number => {
    if (ratio < 50) {
      return ratio - 1;
    } else if (ratio > 50) {
      return ratio + 1;
    } else {
      return ratio;
    }
  };

  useEffect(() => {
    setRatio((genderRatio / 8) * 100);
  }, [genderRatio]);

  return (
    <Stack width="100%" height="100%">
      <StatTitleText>Gender Ratio</StatTitleText>
      <PokemonInfoBox>
        {ratio ? (
          <Box sx={genderInfoContainer}>
            <Box
              sx={{
                ...genderBarStyle,
                position: "relative",

                background: `linear-gradient(to right, ${femaleColorDarker} 0%, ${femaleColorDarker} ${ratio}%, ${maleColorDarker} ${ratio}%, ${maleColorDarker} 100%)`,
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
                  background: `linear-gradient(to right, ${femaleColor} 0%, ${femaleColor} ${borderRatio(
                    ratio
                  )}%, ${maleColor} ${borderRatio(ratio)}%, ${maleColor} 100%)`,
                  width: "calc(100% - 6px)",
                }}
              />
            </Box>
            <Box sx={genderStatContainer}>
              <Box display="flex" alignItems="center">
                <BodyText fontSize="14px">{ratio}%</BodyText>
                <FemaleRoundedIcon sx={{ color: `${femaleColorDarker}` }} />
              </Box>
              <Box display="flex" alignItems="center">
                <BodyText fontSize="14px">{100 - ratio}%</BodyText>
                <MaleRoundedIcon sx={{ color: `${maleColorDarker}` }} />
              </Box>
            </Box>
          </Box>
        ) : (
          <BodyText>Gender Unknown</BodyText>
        )}
      </PokemonInfoBox>
    </Stack>
  );
};
