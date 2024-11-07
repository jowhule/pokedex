import {
  PokemonDataResponseType,
  PokemonSpeciesResponseType,
  PokemonTypeType,
} from "../../../services/apiRequestsTypes";
import {
  pokemonDataDefault,
  pokemonSpeciesDefault,
  pokemonSpritesDefault,
} from "../../../utils/defaults";
import { ParsedMovesDataType } from "../../pokemon-details-page/moves/types";
import bearDefault from "./assets/bear-default.png";

export const formNames: string[] = ["Bear"];
export const formTypes: PokemonTypeType[][] = [
  [
    {
      slot: 1,
      type: { name: "normal", url: "https://pokeapi.co/api/v2/type/1/" },
    },
  ],
];

export const currPokemonData: PokemonDataResponseType = {
  ...pokemonDataDefault,
  species: { name: "bear", url: "" },
  id: 6431,
  sprites: { ...pokemonSpritesDefault, front_default: bearDefault },
  types: formTypes[0],
  stats: [
    {
      base_stat: 50,
      effort: 1,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
    {
      base_stat: 20,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 10,
      effort: 0,
      stat: {
        name: "defense",
        url: "https://pokeapi.co/api/v2/stat/3/",
      },
    },
    {
      base_stat: 90,
      effort: 0,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
    {
      base_stat: 85,
      effort: 0,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 70,
      effort: 0,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
      },
    },
  ],
};

export const about = {
  genera: "Pomeranian Terrier Pokémon",
  flavorText:
    "This Pokémon craves affection every waking moment, nudging its trainer's endlessly for pets and head rubs. It expresses its joy by licking its owner's feet and bed sheets.",
};

export const abilities = [
  {
    name: "Run Away",
    description:
      "This ability allows easy escape from wild encounters, which makes sense for a small, sprightly dog who can quickly dash away when needed.",
    is_hidden: false,
  },
  {
    name: "Cute Charm",
    description:
      "When a Pokémon with this ability is touched, there’s a chance the attacker will become infatuated, unable to bring themselves to attack due to your pup's overwhelming cuteness!",
    is_hidden: true,
  },
];

export const pokemonSpecies: PokemonSpeciesResponseType = {
  ...pokemonSpeciesDefault,
  gender_rate: 8,
  hatch_counter: 0,
  growth_rate: { name: "slow", url: "a" },
  egg_groups: [{ name: "field", url: "" }],
};

// Record<string, LevelUpRowInfoType[]>
export const parsedMovesData: ParsedMovesDataType = {
  "level-up": {
    "2025": [
      {
        level_learned_at: 0,
        name: "Baby-doll Eyes",
        url: "https://pokeapi.co/api/v2/move/608",
        accuracy: 100,
        pp: 30,
        damage: null,
        type: "fairy",
        damage_class: "status",
        effect: "Lowers the target's Attack by one stage.",
      },
      {
        level_learned_at: 1,
        name: "Tackle",
        url: "https://pokeapi.co/api/v2/move/tackle",
        accuracy: 100,
        pp: 35,
        damage: 40,
        type: "normal",
        damage_class: "physical",
        effect: "Inflicts regular damage.",
      },
      {
        level_learned_at: 3,
        name: "Howl",
        url: "https://pokeapi.co/api/v2/move/howl",
        accuracy: 100,
        pp: 40,
        damage: null,
        type: "normal",
        damage_class: "status",
        effect: "Raises the user's Attack by one stage.",
      },
      {
        level_learned_at: 2,
        name: "Charm",
        url: "https://pokeapi.co/api/v2/move/charm",
        accuracy: 100,
        pp: 20,
        damage: null,
        type: "fairy",
        damage_class: "status",
        effect: "Lowers the target's Attack by two stages.",
      },
      {
        level_learned_at: 0,
        name: "Rest",
        url: "https://pokeapi.co/api/v2/move/rest",
        accuracy: null,
        pp: 5,
        damage: null,
        type: "psychic",
        damage_class: "status",
        effect: "Works while asleep through sleep talk if not at full health.",
      },
      {
        level_learned_at: 4,
        name: "Nuzzle",
        url: "https://pokeapi.co/api/v2/move/nuzzle",
        accuracy: 100,
        pp: 20,
        damage: 20,
        type: "electric",
        damage_class: "physical",
        effect:
          "Inflicts regular damage.  Has a 100% chance to paralyze the target.",
      },
    ],
  },
  machine: {
    "2025": [
      {
        level_learned_at: -1,
        name: "Rest",
        url: "https://pokeapi.co/api/v2/move/rest",
        accuracy: null,
        pp: 5,
        damage: null,
        type: "psychic",
        damage_class: "status",
        effect: "Works while asleep through sleep talk if not at full health.",
      },
    ],
  },
  tutor: {},
  egg: {},
};
