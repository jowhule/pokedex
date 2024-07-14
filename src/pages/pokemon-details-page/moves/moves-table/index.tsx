import { Stack, Tooltip } from "@mui/material";
import React from "react";
import { LevelUpType, VersionsOptionsType } from "../types";
import { BodyText } from "../../../../utils/styledComponents";

type MovesTableType = {
  data: LevelUpType;
  versions: VersionsOptionsType;
};

export const MovesTable: React.FC<MovesTableType> = ({ data, versions }) => {
  return (
    <Stack>
      {data[versions.versionsList[versions.active]] &&
        data[versions.versionsList[versions.active]].map((moves, i) => (
          <Tooltip key={i} title={moves.effect} arrow>
            <BodyText>
              {moves.level_learned_at} {moves.name} {moves.type}{" "}
              {moves.damage_class} {moves.damage ?? "--"}{" "}
              {moves.accuracy ?? "--"} {moves.pp}
            </BodyText>
          </Tooltip>
        ))}
    </Stack>
  );
};
