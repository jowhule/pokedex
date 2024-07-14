/*

{
"level-up" : {
  version1: [
    { level_learned_at: number; name: string; url: string }
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

type LevelUpType = Record<
  string,
  { level_learned_at: number; name: string; url: string }[]
>;

export type LearnMethodNames = "level-up" | "machine" | "tutor" | "egg";

export type ParsedMovesDataType = Record<LearnMethodNames, LevelUpType>;
