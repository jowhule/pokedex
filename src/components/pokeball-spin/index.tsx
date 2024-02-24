import React from "react";
import pokeballLoader from "../../assets/pokeball-icon.png";
import { Box, SxProps, Theme } from "@mui/material";
import { spin } from "./style";

type PokeballLoaderType = {
  sx?: SxProps<Theme>;
};

export const PokeballSpin: React.FC<PokeballLoaderType> = ({ sx }) => {
  return (
    <Box
      sx={{ ...spin, ...sx }}
      component="img"
      src={pokeballLoader}
      alt="Loading..."
    />
  );
};
