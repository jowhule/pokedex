type NameUrlType = {
  name: string;
  url: string;
};

type PokemonAbilityType = {
  ability: NameUrlType;
  is_hidden: boolean;
  slot: number;
};

type PokemonFormType = NameUrlType;

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

export type PokemonDataResponseType = {
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
  name: string;
  order: number;
  past_types: [];
  species: NameUrlType;
  sprites: PokemonSpriteType;
  stats: PokemonStatType[];
  types: PokemonTypeType[];
  weight: number;
};

export const pokemonDataDefault: PokemonDataResponseType = {
  abilities: [],
  base_experience: 0,
  forms: [],
  game_indices: [],
  height: 0,
  held_items: [],
  id: 0,
  is_default: false,
  location_area_encounters: "",
  moves: [],
  name: "",
  order: 0,
  past_types: [],
  species: {
    name: "",
    url: "",
  },
  sprites: {
    back_default: "",
    back_female: null,
    back_shiny: "",
    back_shiny_female: null,
    front_default: "",
    front_female: null,
    front_shiny: "",
    front_shiny_female: "",
    other: {
      dream_world: {
        front_default: "",
        front_female: "",
      },
      home: {
        front_default: "",
        front_female: "",
        front_shiny: "",
        front_shiny_female: "",
      },
      "official-artwork": {
        front_default: "",
        front_shiny: "",
      },
    },
    versions: {},
  },
  stats: [],
  types: [],
  weight: 0,
};

export type PokemonNameResponseType = NameUrlType;

export type PokemonApiResponseType = {
  count: number;
  next: string | null;
  prev: string | null;
  results: PokemonNameResponseType[];
};
