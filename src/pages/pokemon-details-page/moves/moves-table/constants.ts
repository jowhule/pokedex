import { LearnMethodNames } from "../types";
import { HeadCell } from "./enhanced-table-head/types";

export const methodToName: Record<LearnMethodNames, string> = {
  "level-up": "By Leveling Up",
  machine: "By TM",
  tutor: "By Tutor",
  egg: "By Breeding",
};

export const headCells: readonly HeadCell[] = [
  {
    id: "level_learned_at",
    center: false,
    label: "Level",
  },
  {
    id: "name",
    center: false,
    label: "Move",
  },
  {
    id: "type",
    center: true,
    label: "Type",
  },
  {
    id: "damage_class",
    center: true,
    label: "Category",
  },
  {
    id: "damage",
    center: true,
    label: "Power",
  },
  {
    id: "accuracy",
    center: false,
    label: "Accuracy",
  },
  {
    id: "pp",
    center: true,
    label: "PP",
  },
];
