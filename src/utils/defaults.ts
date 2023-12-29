import {
  PokemonDataResponseType,
  PokemonEvoChainType,
  PokemonEvoDetailsType,
  PokemonFormResponseType,
  PokemonSpeciesResponseType,
} from "../services/apiRequestsTypes";

const pokemonSpritesDefault = {
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
  sprites: pokemonSpritesDefault,
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

export const pokemonEvoChainDefault: PokemonEvoChainType = {
  evolution_details: [],
  evolves_to: [],
  is_baby: false,
  species: { name: "", url: "" },
};

export const pokemonEvoDetailsDefault: PokemonEvoDetailsType = {
  gender: null,
  held_item: null,
  item: null,
  known_move: null,
  known_move_type: null,
  location: null,
  min_affection: null,
  min_beauty: null,
  min_happiness: null,
  min_level: null,
  needs_overworld_rain: false,
  party_species: null,
  party_type: null,
  relative_physical_stats: null,
  time_of_day: "",
  trade_species: null,
  trigger: {
    name: "",
    url: "",
  },
  turn_upside_down: false,
};

export const pokemonFormDefault: PokemonFormResponseType = {
  form_name: "",
  form_names: [],
  form_order: -1,
  id: -1,
  is_battle_only: false,
  is_default: false,
  is_mega: false,
  name: "",
  names: [],
  order: -1,
  pokemon: { name: "", url: "" },
  sprites: pokemonSpritesDefault,
  types: [],
  version_group: { name: "", url: "" },
};
