import { secondaryColour } from "../../utils/colours";

export const pokemonDetailsBgWrapper = {
  bgcolor: "white",
  p: "20px 40px",
  borderRadius: "0 20px 20px 20px",
  marginTop: "-29px",
};

export const detailsMainInfoContainer = {
  display: "flex",
  gap: "30px",
  width: "100%",
  maxWidth: "1000px",
  m: "0 auto",
};

export const pokemonDetailsSpriteStyle = {
  imageRendering: "pixelated",
  width: "100%",
  height: "100%",
  m: "auto",
};

export const gigantamaxButtonStyle = {
  width: "120px",
  bgcolor: "grey",
  p: "5px 50px",
  position: "absolute",
};

export const detailsTabPanelStyle = {
  bgcolor: `${secondaryColour}`,
  p: "0 20px",
  height: "40px",
  borderRadius: "15px 15px 0 0",
  boxShadow: "5px 0px #b6b9be",
  transform: "translateY(0px)",
  transition:
    "background-color 0.5s ease, transform 0.5s ease, height 0.5s ease",
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
  transition:
    "background-color 0.5s ease, transform 0.5s ease, height 0.5s ease",
  display: "flex",
  alignItems: "center",
};
