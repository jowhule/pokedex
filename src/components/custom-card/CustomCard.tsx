import { Box, SxProps } from "@mui/material";
import React from "react";
import { secondaryColour } from "../../utils/colours";
import { Theme } from "@emotion/react";

type CustomCardProp = {
  sx?: SxProps<Theme> | React.CSSProperties;
  children?: JSX.Element | JSX.Element[] | string | string[];
};

export const CustomCard: React.FC<CustomCardProp> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "15px",
        boxSizing: "border-box",
        boxShadow: `8px 8px  ${secondaryColour}`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
