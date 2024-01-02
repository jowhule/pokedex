import { Box, List, ListItem } from "@mui/material";
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
  largeStatText,
  largeStatContainer,
  largeStatTotalContainer,
} from "./style";
import { STAT_ABBRV } from "../../../utils/helpers";
import { PokemonStatType } from "../../../services/apiRequestsTypes";

type StatBarProps = {
  statsData: PokemonStatType[];
  detailed?: boolean;
};

const FULL_STATNAME: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const MAX_STAT_VALUE = 211;

export const StatBars: React.FC<StatBarProps> = ({ statsData, detailed }) => {
  const [totalStat, setTotalStat] = useState<number>(0);

  const minStat = (stat: string, baseStat: number): number => {
    // minimum values are based on a hindering nature, 0 EVs, 0 IVs, lvl 100
    const mainVal = Math.floor(2 * baseStat);
    return stat === "hp" ? mainVal + 100 + 10 : Math.floor((mainVal + 5) * 0.9);
  };

  const maxStat = (stat: string, baseStat: number): number => {
    // minimum values are based on a beneficial nature, 252 EVs, 31 IVs lvl 100
    const mainVal = Math.floor(2 * baseStat + 31 + 252 / 4);
    return stat === "hp" ? mainVal + 100 + 10 : Math.floor((mainVal + 5) * 1.1);
  };

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
      {detailed ? (
        <List sx={statsContainer}>
          {statsData.map((statInfo, index) => (
            <>
              <ListItem key={index} sx={largeStatContainer}>
                <BodyText minWidth="45px" sx={largeStatText}>
                  {FULL_STATNAME[statInfo.stat.name]}
                </BodyText>
                <BodyText minWidth="35px" sx={largeStatText}>
                  {statInfo.base_stat}
                </BodyText>
                <Box flex="15" marginLeft="10px" sx={statBarContainer}>
                  <Box
                    sx={{
                      ...statBar,
                      width: `${(statInfo.base_stat / MAX_STAT_VALUE) * 100}%`,
                      backgroundColor: `${STAT_COLOURS[statInfo.stat.name]}`,
                    }}
                  />
                </Box>
                <BodyText
                  minWidth="35px"
                  sx={{ ...largeStatText, opacity: "0.8" }}
                >
                  {minStat(statInfo.stat.name, statInfo.base_stat)}
                </BodyText>
                <BodyText
                  minWidth="35px"
                  sx={{ ...largeStatText, opacity: "0.8" }}
                >
                  {maxStat(statInfo.stat.name, statInfo.base_stat)}
                </BodyText>
              </ListItem>
            </>
          ))}
        </List>
      ) : (
        <Box sx={statsContainer}>
          {statsData.map((statInfo, index) => (
            <Box key={index} sx={statContainer}>
              <Box sx={statBarContainer}>
                <BodyText sx={statTitle}>
                  {STAT_ABBRV[statInfo.stat.name]}
                </BodyText>
                <Box
                  sx={{
                    ...statBar,
                    width: `${(statInfo.base_stat / MAX_STAT_VALUE) * 100}%`,
                    backgroundColor: `${STAT_COLOURS[statInfo.stat.name]}`,
                  }}
                />
                <BodyText sx={statValue}>{statInfo.base_stat}</BodyText>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      {detailed ? (
        <Box sx={largeStatTotalContainer}>
          <BodyText minWidth="45px" fontSize="15px" fontWeight="bold">
            Total:
          </BodyText>
          <BodyText minWidth="35px" fontSize="15px" fontWeight="bold">
            {totalStat}
          </BodyText>
          <Box width="100%" />
          <BodyText minWidth="35px" fontSize="15px">
            Min
          </BodyText>
          <BodyText minWidth="35px" fontSize="15px">
            Max
          </BodyText>
        </Box>
      ) : (
        <Box sx={statTotalContainer}>
          <BodyText fontSize="15px" fontWeight="bold">
            Total:
          </BodyText>
          <BodyText fontSize="15px">{totalStat}</BodyText>
        </Box>
      )}
    </>
  );
};
