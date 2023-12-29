import React from "react";
import { STAT_ABBRV } from "../../../utils/helpers";
import { Box } from "@mui/system";
import { STAT_COLOURS, fontBgColour } from "../../../utils/colours";
import { BodyText } from "../../../utils/styledComponents";

type EVTagProps = {
  stat: string;
  value: number;
};

export const EffortValueTag: React.FC<EVTagProps> = ({ stat, value }) => {
  return (
    <Box bgcolor={fontBgColour} p="3px" borderRadius="25px">
      <BodyText
        fontSize="12px"
        fontWeight="bold"
        bgcolor={STAT_COLOURS[stat]}
        height="25px"
        width="25px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
      >
        {STAT_ABBRV[stat]}
      </BodyText>
      <BodyText fontSize="12px" textAlign="center">
        {value}
      </BodyText>
    </Box>
  );
};
