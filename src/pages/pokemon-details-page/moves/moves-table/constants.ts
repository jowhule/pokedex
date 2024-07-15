import { LearnMethodNames, LevelUpRowInfoType } from "../types";

export interface HeadCell {
  id: keyof LevelUpRowInfoType;
  label: string;
  short_label: string;
  center: boolean;
}

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
    short_label: "Lvl",
  },
  {
    id: "name",
    center: false,
    label: "Move",
    short_label: "Move",
  },
  {
    id: "type",
    center: true,
    label: "Type",
    short_label: "Type",
  },
  {
    id: "damage_class",
    center: true,
    label: "Category",
    short_label: "Cat.",
  },
  {
    id: "damage",
    center: true,
    label: "Power",
    short_label: "Pow.",
  },
  {
    id: "accuracy",
    center: true,
    label: "Accuracy",
    short_label: "Acc.",
  },
  {
    id: "pp",
    center: true,
    label: "PP",
    short_label: "PP",
  },
];
