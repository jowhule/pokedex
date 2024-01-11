export type NameUrlType = {
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

type PokemonDamageRelationsType = {
  double_damage_from: NameUrlType[];
  double_damage_to: NameUrlType[];
  half_damage_from: NameUrlType[];
  half_damage_to: NameUrlType[];
  no_damage_from: NameUrlType[];
  no_damage_to: NameUrlType[];
};

export type PokemonStatType = {
  base_stat: number;
  effort: number;
  stat: NameUrlType;
};

export type LanguageNameArrayType = { language: NameUrlType; name: string }[];

export type PokemonTypeType = {
  slot: number;
  type: NameUrlType;
};

export type PokemonPokedexEntryType = {
  entry_number: number;
  pokemon_species: NameUrlType;
};

export type PokemonEvoDetailsType = {
  gender: NameUrlType | null;
  held_item: NameUrlType | null;
  item: NameUrlType | null;
  known_move: NameUrlType | null;
  known_move_type: NameUrlType | null;
  location: NameUrlType | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: false;
  party_species: NameUrlType | null;
  party_type: NameUrlType | null;
  relative_physical_stats: NameUrlType | null;
  time_of_day: string;
  trade_species: NameUrlType | null;
  trigger: NameUrlType;
  turn_upside_down: boolean;
};

export type PokemonEvoChainType = {
  evolution_details: PokemonEvoDetailsType[];
  evolves_to: PokemonEvoChainType[];
  is_baby: boolean;
  species: NameUrlType;
};

export type PokemonVarietiesType = {
  is_default: boolean;
  pokemon: NameUrlType;
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
  names: LanguageNameArrayType;
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
  names: LanguageNameArrayType;
  order: number;
  pal_park_encounters: {
    area: NameUrlType;
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: { entry_number: number; pokedex: NameUrlType }[];
  shape: NameUrlType;
  varieties: PokemonVarietiesType[];
};

export type PokemonEvolutionResponseType = {
  baby_trigger_item: null | any;
  chain: PokemonEvoChainType;
  id: number;
};

export type PokemonAbilityResponseType = {
  effect_changes: [];
  effect_entries: {
    effect: string;
    language: NameUrlType;
    short_effect: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: NameUrlType;
    version_group: NameUrlType;
  }[];
  generation: NameUrlType;
  id: number;
  is_main_series: boolean;
  name: string;
  names: LanguageNameArrayType;
  pokemon: { is_hidden: boolean; pokemon: NameUrlType; slot: number }[];
};

export type PokemonFormResponseType = {
  form_name: string;
  form_names: LanguageNameArrayType;
  form_order: number;
  id: number;
  is_battle_only: boolean;
  is_default: boolean;
  is_mega: boolean;
  name: string;
  names: LanguageNameArrayType;
  order: number;
  pokemon: NameUrlType;
  sprites: PokemonSpriteType;
  types: PokemonTypeType[];
  version_group: NameUrlType;
};

export type PokemonTypeResponseType = {
  damage_relations: PokemonDamageRelationsType;
  game_indices: { game_index: 0; generation: NameUrlType }[];
  generation: NameUrlType;
  id: number;
  move_damage_class: NameUrlType;
  moves: NameUrlType[];
  name: string;
  names: LanguageNameArrayType;
  past_damage_relations: [];
  pokemon: { pokemon: NameUrlType; slot: number }[];
};
