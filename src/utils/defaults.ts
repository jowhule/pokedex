import {
  PokemonDataResponseType,
  PokemonEvoChainType,
  PokemonSpeciesResponseType,
} from "../services/apiRequestsTypes";

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

export const PokemonEvoChainDefault: PokemonEvoChainType = {
  evolution_details: [],
  evolves_to: [],
  is_baby: false,
  species: { name: "", url: "" },
};
