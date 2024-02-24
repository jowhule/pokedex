import { Box } from "@mui/material";
import React from "react";
import { useLoadPageContext } from "../context-providers/load-provider";
import { loadPageStyle, loaderOff } from "./style";

export const Loader: React.FC = () => {
  const { loadPage } = useLoadPageContext();
  return (
    <>
      <Box sx={loadPage ? loaderOff : loadPageStyle}>
        <Box
          width="300px"
          component="img"
          src="https://64.media.tumblr.com/tumblr_mdta50e8IX1rlbw7io1_500.gifv"
          alt="Loading..."
        />
      </Box>
    </>
  );
};
