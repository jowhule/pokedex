import { fontBgColour } from "../../../utils/colours";

const STAT_BAR_HEIGHT = "15px";
const STAT_BAR_RADIUS = "60px";

export const statsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
  justifyContent: "center",
  padding: "0 12px",
  width: "100%",
  boxSizing: "border-box",
};

export const statContainer = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
};

export const largeStatContainer = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  p: "2px 0",
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
  transition: "width 0.8s ease",
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

export const largeStatText = {
  fontSize: "13px",
  fontWeight: "bold",
  textAlign: "right",
};

export const statTotalContainer = {
  display: "flex",
  justifyContent: "space-between",
  bgcolor: "#f0f3f8",
  borderRadius: "5px",
  p: "2px 15px",
  m: "5px auto",
  width: "80%",
  boxSizing: "border-box",
};

export const largeStatTotalContainer = {
  display: "flex",
  bgcolor: "#f0f3f8",
  borderRadius: "5px",
  p: "2px 15px",
  m: "5px auto",
  width: "100%",
  textAlign: "right",
  boxSizing: "border-box",
};
