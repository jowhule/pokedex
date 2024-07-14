type LevelUpType = Record<
  string,
  { level_learned_at: number; name: string; url: string }[]
>;

export type LearnMethodNames = "level-up" | "machine" | "tutor" | "egg";

export type ParsedMovesDataType = Record<LearnMethodNames, LevelUpType>;
