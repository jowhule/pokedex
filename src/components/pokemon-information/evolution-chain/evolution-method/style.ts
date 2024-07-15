import { SxProps, Theme } from "@mui/material";
import { fontBgColour } from "../../../../utils/colours";
import theme from "../../../../utils/theme";

export const pokemonEvoMethodContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: fontBgColour,
  padding: "5px 10px",
  borderRadius: "20px",
  boxShadow: theme.shadows[3],
};
