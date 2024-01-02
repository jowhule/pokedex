import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { STAT_COLOURS } from "../../../utils/colours";
import { BodyText, StatTitleText } from "../../../utils/styledComponents";
import {
  statBarContainer,
  statContainer,
  statBar,
  statValue,
  statTitle,
  statsContainer,
  statTotalContainer,
  largeStatTitle,
} from "./style";
import { STAT_ABBRV } from "../../../utils/helpers";
import { PokemonStatType } from "../../../services/apiRequestsTypes";

type StatBarProps = {
  statsData: PokemonStatType[];
  large?: boolean;
};

const MAX_STAT_VALUE = 211;

export const StatBars: React.FC<StatBarProps> = ({ statsData, large }) => {
  const [totalStat, setTotalStat] = useState<number>(0);

  useEffect(() => {
    if (statsData.length > 0) {
      let totalStatCalc = 0;
      for (const stat of statsData) {
        totalStatCalc += stat.base_stat;
      }
      setTotalStat(totalStatCalc);
    }
  }, [statsData]);
  return (
    <>
      <StatTitleText fontSize="16px">Base Stats</StatTitleText>
      <Box sx={statsContainer}>
        {statsData.map((statInfo, index) => (
          <Box key={index} sx={statContainer}>
            <Box sx={statBarContainer}>
              <BodyText sx={large ? largeStatTitle : statTitle}>
                {STAT_ABBRV[statInfo.stat.name]}
              </BodyText>
              <Box
                sx={{
                  ...statBar,
                  width: `${(statInfo.base_stat / MAX_STAT_VALUE) * 100}%`,
                  backgroundColor: `${STAT_COLOURS[statInfo.stat.name]}`,
                }}
              ></Box>
              <BodyText sx={statValue}>{statInfo.base_stat}</BodyText>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={statTotalContainer}>
        <BodyText fontSize="15px" fontWeight="bold">
          Total:
        </BodyText>
        <BodyText fontSize="15px"> {totalStat}</BodyText>
      </Box>
    </>
  );
};
