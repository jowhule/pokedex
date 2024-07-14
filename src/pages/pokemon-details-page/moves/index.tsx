import React, { useEffect, useMemo, useState } from "react";
import { PokemonMoveType } from "../../../services/apiRequestsTypes";
import { LearnMethodNames, ParsedMovesDataType } from "./types";
import { parsedMovesDataDefault } from "./default";
import { Box, Grid, Stack } from "@mui/material";
import { BodyText, StatTitleText } from "../../../utils/styledComponents";
import { capitaliseDash, removeDash } from "../../../utils/helpers";

type MovesProps = {
  data: PokemonMoveType[];
};

export const Moves: React.FC<MovesProps> = ({ data }) => {
  const learnMethodNamesSet: Set<LearnMethodNames> = useMemo(
    () =>
      new Set([
        "level-up" as LearnMethodNames,
        "machine" as LearnMethodNames,
        "tutor" as LearnMethodNames,
        "egg" as LearnMethodNames,
      ]),
    []
  );

  const [parsedMovesData, setParsedMovesData] = useState<ParsedMovesDataType>(
    parsedMovesDataDefault
  );
  const [versions, setVersions] = useState<{
    versionsList: string[];
    active: number;
  }>({ versionsList: [], active: -1 });

  useEffect(() => {
    const parsedData: ParsedMovesDataType = parsedMovesDataDefault;
    const setOfVersions = new Set<string>();
    const addMove = (
      parsedData: ParsedMovesDataType,
      name: string,
      learnMethod: LearnMethodNames,
      version: string,
      url: string,
      levelLearnedAt?: number
    ) => {
      if (!(version in parsedData[learnMethod]))
        parsedData[learnMethod][version] = [];

      parsedData[learnMethod][version].push({
        level_learned_at: levelLearnedAt ?? -1,
        name,
        url,
      });
    };
    if (
      data.length > 0 &&
      Object.keys(parsedMovesData["level-up"]).length === 0 &&
      Object.keys(parsedMovesData.egg).length === 0 &&
      Object.keys(parsedMovesData.machine).length === 0 &&
      Object.keys(parsedMovesData.tutor).length === 0
    ) {
      for (const moveData of data) {
        for (const version of moveData.version_group_details) {
          const moveLearnMethod = version.move_learn_method
            .name as LearnMethodNames;
          if (learnMethodNamesSet.has(moveLearnMethod))
            addMove(
              parsedData,
              moveData.move.name,
              moveLearnMethod,
              version.version_group.name,
              moveData.move.url
            );
          setOfVersions.add(version.version_group.name);
        }
      }

      setVersions({ versionsList: Array.from(setOfVersions), active: 0 });
      setParsedMovesData(parsedData);
      console.log(parsedData);
    }
  }, [data, learnMethodNamesSet, parsedMovesData]);

  return (
    <Grid container>
      <Grid item>
        <StatTitleText>By Leveling Up</StatTitleText>
        <Stack>
          {parsedMovesData["level-up"][
            versions.versionsList[versions.active]
          ] &&
            parsedMovesData["level-up"][
              versions.versionsList[versions.active]
            ].map((moves, i) => (
              <Box key={i}>
                <BodyText>{removeDash(capitaliseDash(moves.name))}</BodyText>
              </Box>
            ))}
        </Stack>
      </Grid>

      <Grid item>
        <StatTitleText>By TM</StatTitleText>
        <Stack>
          {parsedMovesData.machine[versions.versionsList[versions.active]] &&
            parsedMovesData.machine[versions.versionsList[versions.active]].map(
              (moves, i) => (
                <Box key={i}>
                  <BodyText>{removeDash(capitaliseDash(moves.name))}</BodyText>
                </Box>
              )
            )}
        </Stack>
      </Grid>

      <Grid item>
        <StatTitleText>By Tutor</StatTitleText>
        <Stack>
          {parsedMovesData.tutor[versions.versionsList[versions.active]] &&
            parsedMovesData.tutor[versions.versionsList[versions.active]].map(
              (moves, i) => (
                <Box key={i}>
                  <BodyText>{removeDash(capitaliseDash(moves.name))}</BodyText>
                </Box>
              )
            )}
        </Stack>
      </Grid>

      <Grid item>
        <StatTitleText>By Breeding</StatTitleText>
        <Stack>
          {parsedMovesData.egg[versions.versionsList[versions.active]] &&
            parsedMovesData.egg[versions.versionsList[versions.active]].map(
              (moves, i) => (
                <Box key={i}>
                  <BodyText>{removeDash(capitaliseDash(moves.name))}</BodyText>
                </Box>
              )
            )}
        </Stack>
      </Grid>
    </Grid>
  );
};
