import { Box, Typography, styled } from "@mui/material";
import { fontBgColour, primaryTextColour } from "./colours";

export const BodyText = styled(Typography)({
  color: primaryTextColour,
  "&:hover": {
    cursor: "default",
  },
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

export const PokemonInfoBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: `${fontBgColour}`,
  borderRadius: "15px",
  width: "100%",
  flexGrow: "1",
  padding: "15px 0",
  boxSizing: "border-box",
  boxShadow: "5px 5px #e0e3e9",
});
