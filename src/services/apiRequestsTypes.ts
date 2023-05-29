type NameUrlType = {
  name: string;
  url: string;
};

export type PokemonAbilityType = {
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

export type PokemonPokedexEntryType = {
  entry_number: number;
  pokemon_species: NameUrlType;
};

/* -------------------------------- response -------------------------------- */

export type PokemonNameResponseType = NameUrlType;

export type PokemonApiResponseType = {
  count: number;
  next: string | null;
  prev: string | null;
  results: PokemonNameResponseType[];
};

export type PokemonDexResponseType = {
  descriptions: { description: string; language: NameUrlType }[];
  id: number;
  is_main_series: boolean;
  name: string;
  names: { language: NameUrlType; name: string }[];
  pokemon_entries: PokemonPokedexEntryType[];
  region: null | NameUrlType;
  version_groups: NameUrlType[];
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

export type PokemonSpeciesResponseType = {
  base_happiness: number;
  capture_rate: number;
  color: NameUrlType;
  egg_groups: NameUrlType[];
  evolution_chain: { url: string };
  evolves_from_species: null | NameUrlType;
  flavor_text_entries: {
    flavor_text: string;
    language: NameUrlType;
    version: NameUrlType;
  }[];
  form_descriptions: { description: string; language: NameUrlType }[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: { genus: string; language: NameUrlType }[];
  generation: NameUrlType;
  growth_rate: NameUrlType;
  habitat: null | NameUrlType;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: { language: NameUrlType; name: string }[];
  order: number;
  pal_park_encounters: {
    area: NameUrlType;
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: { entry_number: number; pokedex: NameUrlType }[];
  shape: NameUrlType;
  varieties: { is_default: boolean; pokemon: NameUrlType }[];
};

/* -------------------------------- defaults -------------------------------- */
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

export const pokemonSpeciesDefault: PokemonSpeciesResponseType = {
  base_happiness: 0,
  capture_rate: 0,
  color: { name: "", url: "" },
  egg_groups: [],
  evolution_chain: { url: "" },
  evolves_from_species: null,
  flavor_text_entries: [],
  form_descriptions: [],
  forms_switchable: false,
  gender_rate: 0,
  genera: [],
  generation: { name: "", url: "" },
  growth_rate: { name: "", url: "" },
  habitat: null,
  has_gender_differences: false,
  hatch_counter: 0,
  id: 0,
  is_baby: false,
  is_legendary: false,
  is_mythical: false,
  name: "",
  names: [],
  order: 0,
  pal_park_encounters: [],
  pokedex_numbers: [],
  shape: { name: "", url: "" },
  varieties: [],
};
