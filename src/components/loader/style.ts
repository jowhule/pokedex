export const loadPageStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  zIndex: "5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 1s ease",
};

export const loaderOff = {
  ...loadPageStyle,
  transform: "translateY(-100vh)",
};
