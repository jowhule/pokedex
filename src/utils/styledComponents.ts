import { Box, Typography, styled } from "@mui/material";

export const BodyText = styled(Typography)({
  color: "#0c214a",
});

export const SecondaryText = styled(Typography)({
  color: "#2f4c72",
});

export const Hoverable = styled(Box)({
  "&:hover": { cursor: "pointer" },
});
