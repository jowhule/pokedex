import { primaryTextColour } from "../../utils/colours";

export const pokemonDetailsBgWrapper = {
  bgcolor: "white",
  p: "40px",
  borderRadius: "0 20px 20px 20px",
  position: "relative",
  top: "-5px",
};

export const detailsMainInfoContainer = {
  display: "flex",
  gap: "30px",
  width: "100%",
  maxWidth: "1000px",
  m: "auto",
};

export const mobileDetailsMainInfoContainer = {
  display: "flex",
  width: "100%",
  maxWidth: "1000px",
  m: "0 auto",
  flexDirection: "column",
};

export const pokemonDetailsSpriteStyle = {
  imageRendering: "pixelated",
  width: "100%",
  height: "100%",
  m: "auto",
  flex: "1",
};

export const detailsInfoContainer = {
  flex: "1",
  m: "30px auto,",
  justifyContent: "center",
};

export const infoPokemonNameStyle = {
  textAlign: "center",
  fontWeight: "bold",
  color: primaryTextColour,
  fontSize: "22px",
};

export const generaTextStyle = {
  textAlign: "center",
  fontSize: "17px",
  fontWeight: "bold",
  opacity: "0.8",
};
