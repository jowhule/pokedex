import { SxProps, Theme } from "@mui/material";
import { secondaryColour } from "../../../../utils/colours";

export const pokemonCardContainer = {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  height: "140px",
  paddingTop: "35px",
  paddingBottom: "20px",
  boxSizing: "border-box",
  transition: "transform 0.2s ease, boxShadow 0.2s ease",
  "&:active": {
    boxShadow: `7px 7px ${secondaryColour}`,
    transform: "translate(2px, 2px)",
  },
  "&:hover": {
    border: `2px solid ${secondaryColour}`,
  },
};

export const pokemonIdContainer: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: "0",
  left: "0",
  height: "25px",
  width: "55px",
  boxSizing: "border-box",
  borderRadius: "0 5px 0 10px",
  backgroundColor: secondaryColour,
};

export const pokemonSpriteStyle: SxProps<Theme> = {
  position: "absolute",
  top: "-50px",
  transition: "ease 0.2s",
  objectFit: "cover",
  imageRendering: "pixelated",
};

export const pokemonSpriteHover: SxProps<Theme> = {
  ...pokemonSpriteStyle,
  transform: "scale(1.1)",
};

export const pokemonTypesContainer: SxProps<Theme> = {
  display: "flex",
  gap: "10px",
  m: "10px",
  justifyContent: "center",
};
