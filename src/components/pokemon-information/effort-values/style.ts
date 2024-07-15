import { Theme } from "@mui/material";

export const effortTagContainer = (theme: Theme) => {
  return {
    bgcolor: "primary.light",
    p: "4px",
    borderRadius: "25px",
    boxShadow: theme.shadows[3],
  };
};
export const effortTagTitle = {
  fontSize: "12px",
  fontWeight: "bold",
  height: "25px",
  width: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
};
