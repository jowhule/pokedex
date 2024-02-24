import { Box } from "@mui/material";
import React from "react";
import { useLoadPageContext } from "../context-providers/load-provider";
import { PokeballLoader } from "../pokeball-loader";

const loadPageStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  zIndex: "5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 2s ease-out",
};

const loadPageOff = {
  ...loadPageStyle,
  transform: "translateY(-100vh)",
};

export const Loader: React.FC = () => {
  const { loadPage } = useLoadPageContext();
  return (
    <>
      <Box sx={loadPage ? loadPageStyle : loadPageOff}>
        <PokeballLoader />
      </Box>
    </>
  );
};
