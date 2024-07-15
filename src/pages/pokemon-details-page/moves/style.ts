import { Theme } from "@mui/material";

export const movesTitleStyle = { fontSize: "20px", textAlign: "center" };

export const moveListSyle = {
  maxHeight: "350px",
  overflowY: "auto",
  "&::-webkit-scrollbar-track": {
    background: "white",
    borderRadius: "10px",
  },
};

export const categoryLegendContainer = (theme: Theme) => {
  return {
    bgcolor: "primary.light",
    display: "flex",
    direction: "row",
    gap: "20px",
    p: "10px 20px",
    borderRadius: "15px",
    boxShadow: theme.shadows[4],
  };
};

export const movesTablesGridContainer = {
  alignItems: "center",
  justifyContent: "center",
  direction: "column",
  marginBottom: "40px",
};
