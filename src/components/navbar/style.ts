import { SxProps, Theme } from "@mui/material";
import { secondaryColour } from "../../utils/colours";

export const NAVBAR_HEIGHT = "60px";

export const navbarContainer: React.CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: "3",
  height: NAVBAR_HEIGHT,
  width: "100%",
  backgroundColor: "white",
  boxShadow: `0 5px 5px ${secondaryColour}`,
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
