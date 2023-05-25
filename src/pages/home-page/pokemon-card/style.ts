import { SxProps, Theme } from "@mui/material";
import { secondaryColour } from "../../../utils/colours";

export const pokemonCardContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  alignItems: "center",
  height: "60px",
  paddingTop: "35px",
  paddingBottom: "20px",
};

export const pokemonIdContainer: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: "0",
  left: "0",
  height: "20px",
  width: "50px",
  boxSizing: "border-box",
  paddingTop: "5px",
  borderRadius: "0 5px 0 10px",
  bgcolor: `${secondaryColour}`,
};

export const pokemonSpriteStyle: SxProps<Theme> = {
  position: "absolute",
  top: "-50px",
  transition: "ease 0.1s",
  objectFit: "cover",
};

export const pokemonSpriteHover: SxProps<Theme> = {
  ...pokemonSpriteStyle,
  transform: "scale(1.1)",
};
