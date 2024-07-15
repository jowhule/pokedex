import React from "react";
import { BodyText, StatTitleText } from "../../../utils/styledComponents";
import { Stack } from "@mui/material";
import { CustomCard } from "../../../components/custom-card/CustomCard";

type HatchTimeType = {
  hatchCycle: number;
};

export const HatchTime: React.FC<HatchTimeType> = ({ hatchCycle }) => {
  return (
    <Stack width="100%" height="100%">
      <StatTitleText>Hatch Time</StatTitleText>
      <CustomCard dark>
        <Stack textAlign="center">
          <BodyText>{hatchCycle} cycles</BodyText>
          <BodyText fontSize="12px" sx={{ opacity: "0.6" }}>{`(max ${
            hatchCycle * 257
          } steps)`}</BodyText>
        </Stack>
      </CustomCard>
    </Stack>
  );
};
