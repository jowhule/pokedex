import { secondaryColour } from "../../../utils/colours";

export const detailsTabsContainer = {
  width: "100%",
  boxSizing: "border-box",
  height: "45px",
  position: "relative",
  marginBottom: "-5px",
};

export const detailsTabPanelStyle = {
  bgcolor: `${secondaryColour}`,
  p: "0 20px",
  height: "40px",
  borderRadius: "15px 15px 0 0",
  boxShadow: "5px 0px #b6b9be",
  transform: "translateY(0px)",
  transition: "transform 0.5s ease, height 0.5s ease",
  display: "flex",
  alignItems: "center",
};

export const activeDetailsPanelStyle = {
  bgcolor: "white",
  p: "0 20px",
  height: "35px",
  borderRadius: "15px 15px 0 0",
  boxShadow: `5px 0px ${secondaryColour}`,
  transform: "translateY(5px)",
  transition: "transform 0.5s ease, height 0.5s ease",
  display: "flex",
  alignItems: "center",
};
