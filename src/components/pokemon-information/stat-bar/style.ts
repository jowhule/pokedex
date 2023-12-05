import { fontBgColour } from "../../../utils/colours";

const STAT_BAR_HEIGHT = "13px";
const STAT_BAR_RADIUS = "50px";

export const statContainer = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
};

export const statBarContainer = {
  position: "relative",
  width: "255px",
  backgroundColor: `${fontBgColour}`,
  borderRadius: STAT_BAR_RADIUS,
  height: STAT_BAR_HEIGHT,
};

export const statBar = {
  borderRadius: STAT_BAR_RADIUS,
  height: STAT_BAR_HEIGHT,
  boxSizing: "border-box",
};

export const statValue = {
  fontSize: "10px",
  fontWeight: "bold",
  position: "absolute",
  textAlign: "right",
  width: "100%",
  top: "-1px",
  right: "4px",
};
