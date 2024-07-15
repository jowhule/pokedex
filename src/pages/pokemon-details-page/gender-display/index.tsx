import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BodyText, StatTitleText } from "../../../utils/styledComponents";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import {
  genderBarInnerStyle,
  genderBarOutterStyle,
  genderInfoContainer,
  genderStatContainer,
} from "./style";
import { GENDER_COLOURS } from "../../../utils/colours";
import { CustomCard } from "../../../components/custom-card/CustomCard";

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
      <CustomCard dark>
        {ratio >= 0 ? (
          <Box sx={genderInfoContainer}>
            <Box sx={genderBarOutterStyle(ratio)}>
              <Box sx={genderBarInnerStyle(borderRatio(ratio))} />
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
                <MaleRoundedIcon sx={{ color: GENDER_COLOURS["male_dark"] }} />
              </Box>
            </Box>
          </Box>
        ) : (
          <BodyText>Gender Unknown</BodyText>
        )}
      </CustomCard>
    </Stack>
  );
};
