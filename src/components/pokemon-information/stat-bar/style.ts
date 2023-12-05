import { fontBgColour } from "../../../utils/colours";

export const STAT_BAR_HEIGHT = "9px";
export const statContainer = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
};

export const statBarContainer = {
  position: "relative",
  width: "230px",
  backgroundColor: `${fontBgColour}`,
  borderRadius: "10px",
  height: STAT_BAR_HEIGHT,
};
