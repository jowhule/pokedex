import { secondaryColour } from "../../../utils/colours";

export const detailsTabsContainer = {
  width: "calc(100% - 5px)",
  boxSizing: "border-box",
};

export const detailsTabPanelStyle = {
  bgcolor: `${secondaryColour}`,
  p: "5px 20px",
  minHeight: "40px",
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
  borderRadius: "15px 15px 0 0",
  boxShadow: `5px 0px ${secondaryColour}`,
  transform: "translateY(5px)",
  transition: "transform 0.5s ease, height 0.5s ease",
  display: "flex",
  alignItems: "center",
};
