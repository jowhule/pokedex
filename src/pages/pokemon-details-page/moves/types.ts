/*

{
"level-up" : {
  version1: [
    { level_learned_at: number; name: string; url: string, accuracy: number | null, pp: number, damage: number | null, type:string, damage_class: string, effect: string }
  ],
  version2: 
  [
    { level_learned_at: number; name: string; url: string }
  ]
  ...
},
"machine" : {},
"tutor" : {},
"egg": {}
}

*/

export type LevelUpType = Record<string, LevelUpRowInfoType[]>;

export type LevelUpRowInfoType = {
  level_learned_at: number;
  name: string;
  url: string;
  accuracy: number | null;
  pp: number;
  damage: number | null;
  type: string;
  damage_class: string;
  effect: string;
};

export type LearnMethodNames = "level-up" | "machine" | "tutor" | "egg";

export type ParsedMovesDataType = Record<LearnMethodNames, LevelUpType>;

export type VersionsOptionsType = {
  versionsList: string[];
  active: number;
};
