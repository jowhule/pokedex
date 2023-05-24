import { SxProps, Theme } from "@mui/material";
import { secondaryColour } from "../../../utils/colours";

export const pokemonCardContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  alignItems: "center",
  bgcolor: "white",
  borderRadius: "15px",
  height: "60px",
  paddingTop: "35px",
  paddingBottom: "15px",
  boxShadow: `0 5px ${secondaryColour}`,
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
  borderRadius: "0 5px 0 15px",
  bgcolor: `${secondaryColour}`,
};
