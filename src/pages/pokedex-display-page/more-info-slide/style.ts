import { keyframes } from "@emotion/react";
import { fontBgColour } from "../../../utils/colours";

export const outterPokemonInfoSlideContainer = {
  width: "350px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const pokemonInfoSlideContainer = {
  width: "350px",
  height: "78vh",
  position: "fixed",
  bottom: "0px",
  transition: "transform 0.5s ease-out",
  display: "flex",
  justifyContent: "center",
  borderBottomLeftRadius: "0 !important",
  borderBottomRightRadius: "0 !important",
};

export const infoSlideScrollContainer = {
  display: "flex",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
};

export const infoSlideContainer = {
  display: "flex",
  flexDirection: "column",
  width: "calc(100% + 15px)",
  height: "100%",
  boxSizing: "border-box",
  padding: "90px 20px 50px 20px",
  textAlign: "center",
  overflow: "scroll",
  overflowX: "hidden",
  position: "absolute",
};

export const noActivePokemonCardStyle = {
  ...pokemonInfoSlideContainer,
  transform: "translateX(40vw)",
};

export const pokemonSpriteStyle = {
  position: "absolute",
  bottom: "100%",
  imageRendering: "pixelated",
  overflowClipMargin: "content-box",
  transform: "scale(3)",
  zIndex: "1",
};

export const abilitiesContainer = {
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: `${fontBgColour}`,
  borderRadius: "15px",
  width: "100%",
  padding: "15px 0",
};

export const statsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
  justifyContent: "center",
  padding: "0 12px",
  width: "100%",
};

export const statTotalContainer = {
  display: "flex",
  justifyContent: "space-between",
  bgcolor: "#f0f3f8",
  borderRadius: "5px",
  p: "2px 15px",
  m: "5px auto",
  width: "80%",
};

const spinAnimate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const infoSlideLoaderStyle = {
  position: "fixed",
  animation: `${spinAnimate} 2s linear infinite`,
  width: "70px",
  top: "50vh",
  zIndex: "-1",
};

export const indicateScrollableStyle = {
  width: "50px",
  height: "50px",
  opacity: "0.5",
  m: "0 auto",
  position: "fixed",
  "@media (min-height: 970px)": {
    display: "none",
  },
  bottom: 0,
};
