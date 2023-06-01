import { SxProps, Theme } from "@mui/material";

export const NAVBAR_HEIGHT = "60px";

export const navbarContainer: React.CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: "3",
  height: NAVBAR_HEIGHT,
  width: "100%",
  backgroundColor: "#FFFFFF90",
  transition: "transform 0.5s ease",
};

export const navbarWrapper: SxProps<Theme> = {
  display: "flex",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  padding: "0 10px",
  justifyContent: "space-between",
  alignItems: "center",
};

export const hideNavbar: React.CSSProperties = {
  ...navbarContainer,
  transform: "translateY(-65px)",
};
