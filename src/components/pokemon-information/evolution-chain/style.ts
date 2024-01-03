import { SxProps, Theme } from "@mui/material";
import { fontBgColour } from "../../../utils/colours";

export const pokemonEvoStageContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: "280px",
};

export const largePokeEvoStageContainer: SxProps<Theme> = {
  ...pokemonEvoStageContainer,
  maxWidth: "100%",
};

export const pokemonEvolutionContainer: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "1",
};

export const pokemonEvoSpriteStyle: SxProps<Theme> = {
  width: "74px",
  height: "74px",
  borderRadius: "15px",
  margin: "0 5px",
  "&:hover": {
    bgcolor: `${fontBgColour}`,
  },
};

export const largePokeEvoSpriteStyle: SxProps<Theme> = {
  ...pokemonEvoSpriteStyle,
  width: "calc(100% - 10px)",
  height: "calc(100% - 10px)",
};
