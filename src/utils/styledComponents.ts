import { Box, Typography, styled } from "@mui/material";

export const BodyText = styled(Typography)({
  color: "#0c214a",
});

export const StatTitleText = styled(BodyText)({
  marginTop: "20px",
  marginBottom: "5px",
  fontWeight: "bold",
});

export const SecondaryText = styled(Typography)({
  color: "#213d62",
});

export const Hoverable = styled(Box)({
  "&:hover": { cursor: "pointer" },
});
