type NameUrlType = {
  name: "string";
  url: "string";
};

type PokemonAbilityType = {
  ability: NameUrlType;
  is_hidden: boolean;
  slot: number;
};

type PokemonFormType = {
  name: "string";
  url: "string";
};

type PokemonGameIndexType = {
  game_index: number;
  version: NameUrlType;
};

type PokemonHeldItemType = {
  item: NameUrlType;
  version_details: {
    rarity: number;
    version: NameUrlType;
  };
};

type PokemonVersionGroupType = {
  level_learned_at: number;
  move_learn_method: NameUrlType;
  version_group: NameUrlType;
};

type PokemonMoveType = {
  move: NameUrlType;
  version_group_details: PokemonVersionGroupType[];
};

type PokemonSpriteType = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string;
      front_female: string | null;
    };
    home: {
      front_default: string;
      front_female: string | null;
      front_shiny: string;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
  };
  versions: Record<any, any>;
};

type PokemonStatType = {
  base_stat: number;
  effort: number;
  stat: NameUrlType;
};

type PokemonTypeType = {
  slot: number;
  type: NameUrlType;
};

export type PokemonApiResponseType = {
  abilities: PokemonAbilityType[];
  base_experience: number;
  forms: PokemonFormType[];
  game_indices: PokemonGameIndexType[];
  height: number;
  held_items: PokemonHeldItemType[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMoveType[];
  name: "string";
  order: number;
  past_types: [];
  species: NameUrlType;
  sprites: PokemonSpriteType;
  stats: PokemonStatType[];
  types: PokemonTypeType[];
  weight: number;
};
