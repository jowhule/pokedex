import { LearnMethodNames, LevelUpRowInfoType } from "../types";

export type Order = "asc" | "desc";

export type MovesTableType = {
  data: LevelUpRowInfoType[];
  method: LearnMethodNames;
};
