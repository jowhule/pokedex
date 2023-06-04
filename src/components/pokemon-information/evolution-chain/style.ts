import { SxProps, Theme } from "@mui/material";
import { fontBgColour } from "../../../utils/colours";

export const pokemonEvoStageContainer: SxProps<Theme> = {
  display: "flex",
  flexFlow: "column wrap",
  justifyContent: "center",
  maxHeight: "333px",
  maxWidth: "280px",
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
