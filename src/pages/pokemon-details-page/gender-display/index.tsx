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
import { GENDER_COLOURS } from "../../../utils/colours";

type GenderDisplayType = {
  genderRatio: number;
};

export const GenderDisplay: React.FC<GenderDisplayType> = ({ genderRatio }) => {
  const [ratio, setRatio] = useState<number>(0);

  const borderRatio = (ratio: number): number => {
    if (ratio < 0 || ratio > 100) {
      return -1;
    } else if (ratio < 50) {
      return ratio - 1;
    } else if (ratio > 50) {
      return ratio + 1;
    }
    return ratio;
  };

  useEffect(() => {
    setRatio((genderRatio / 8) * 100);
  }, [genderRatio]);

  return (
    <Stack width="100%" height="100%">
      <StatTitleText>Gender Ratio</StatTitleText>
      <PokemonInfoBox>
        {ratio >= 0 ? (
          <Box sx={genderInfoContainer}>
            <Box
              sx={{
                ...genderBarStyle,
                position: "relative",
                background: `linear-gradient(to right, ${GENDER_COLOURS["female_dark"]} 0%, ${GENDER_COLOURS["female_dark"]} ${ratio}%, ${GENDER_COLOURS["male_dark"]} ${ratio}%, ${GENDER_COLOURS["male_dark"]} 100%)`,
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
                  background: `linear-gradient(to right, ${
                    GENDER_COLOURS["female"]
                  } 0%, ${GENDER_COLOURS["female"]} ${borderRatio(ratio)}%, ${
                    GENDER_COLOURS["male"]
                  } ${borderRatio(ratio)}%, ${GENDER_COLOURS["male"]} 100%)`,
                  width: "calc(100% - 6px)",
                }}
              />
            </Box>
            <Box sx={genderStatContainer}>
              <Box display="flex" alignItems="center">
                <BodyText fontSize="14px">{ratio}%</BodyText>
                <FemaleRoundedIcon
                  sx={{ color: `${GENDER_COLOURS["female_dark"]}` }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <BodyText fontSize="14px">{100 - ratio}%</BodyText>
                <MaleRoundedIcon
                  sx={{ color: `${GENDER_COLOURS["male_dark"]}` }}
                />
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
