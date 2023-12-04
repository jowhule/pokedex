import { fontBgColour } from "../../../utils/colours";

export const STAT_BAR_HEIGHT = "15px";
export const statContainer = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
};

export const statBarContainer = {
  position: "relative",
  width: "250px",
  backgroundColor: `${fontBgColour}`,
  borderRadius: "10px",
  height: STAT_BAR_HEIGHT,
};
