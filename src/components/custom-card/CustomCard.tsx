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
        padding: "15px",
        boxShadow: dark ? theme.shadows[4] : theme.shadows[2],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
