import { SxProps, Theme } from "@mui/material";

export const pageContainerStyle: SxProps<Theme> = {
  display: "flex",
  boxSizing: "border-box",
  width: "100%",
  gap: "30px",
  p: "0 120px",
  justifyContent: "center",
};

export const tabletPageContainerStyle: SxProps<Theme> = {
  display: "flex",
  boxSizing: "border-box",
  width: "100%",
  p: "0 30px",
  justifyContent: "center",
};
