import { SxProps, Theme } from "@mui/material";
import { fontBgColour } from "../../../utils/colours";

export const pokemonEvoStageContainer: SxProps<Theme> = {
  display: "flex",
  flexFlow: "column wrap",
  justifyContent: "center",
  maxHeight: "333px",
};

export const pokemonEvolutionContainer: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const pokemonEvoSpriteStyle: SxProps<Theme> = {
  wdith: "74px",
  height: "74px",
  borderRadius: "15px",
  margin: "0 5px",
  "&:hover": {
    bgcolor: `${fontBgColour}`,
  },
};
