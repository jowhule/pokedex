import { fontBgColour } from "../../../utils/colours";

const STAT_BAR_HEIGHT = "15px";
const STAT_BAR_RADIUS = "60px";

export const statContainer = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
};

export const statBarContainer = {
  position: "relative",
  width: "100%",
  backgroundColor: `${fontBgColour}`,
  borderRadius: STAT_BAR_RADIUS,
  height: STAT_BAR_HEIGHT,
};

export const statBar = {
  borderRadius: STAT_BAR_RADIUS,
  height: STAT_BAR_HEIGHT,
  boxSizing: "border-box",
  transition: "width 0.8s ease-in",
};

export const statValue = {
  fontSize: "11px",
  fontWeight: "bold",
  position: "absolute",
  textAlign: "right",
  width: "100%",
  top: "0",
  right: "5px",
};

export const statTitle = {
  fontSize: "11px",
  fontWeight: "bold",
  position: "absolute",
  left: "5px",
  top: "0",
};
