import { SxProps, Theme } from "@mui/material";
import { fontBgColour } from "../../../../utils/colours";

export const pokemonEvoMethodContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: fontBgColour,
  padding: "5px 10px",
  borderRadius: "20px",
};
