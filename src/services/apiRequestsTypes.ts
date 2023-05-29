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

export type PokemonEvoDetailsType = {
  gender: null;
  held_item: null;
  item: null;
  known_move: null;
  known_move_type: null;
  location: null;
  min_affection: null;
  min_beauty: null;
  min_happiness: number;
  min_level: null;
  needs_overworld_rain: false;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: string;
  trade_species: null;
  trigger: NameUrlType;
  turn_upside_down: boolean;
};

export type PokemonEvoChainType = {
  evolution_details: PokemonEvoDetailsType[];
  evolves_to: PokemonEvoChainType[];
  is_baby: boolean;
  species: NameUrlType;
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

export type PokemonEvolutionResponseType = {
  baby_trigger_item: null | any;
  chain: PokemonEvoChainType;
  id: number;
};
