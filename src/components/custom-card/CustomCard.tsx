import { Box, SxProps } from "@mui/material";
import React from "react";
import { Theme, useTheme } from "@mui/material";

interface CustomCardProps {
  dark?: boolean;
  sx?: SxProps<Theme> | React.CSSProperties;
  children?: JSX.Element | JSX.Element[] | string | string[];
}

export const CustomCard: React.FC<CustomCardProps> = ({
  dark,
  children,
  sx,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: dark ? "primary.light" : "primary.100",
        borderRadius: "15px",
        boxSizing: "border-box",
        padding: "15px",
        boxShadow: dark ? theme.shadows[3] : theme.shadows[2],
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
