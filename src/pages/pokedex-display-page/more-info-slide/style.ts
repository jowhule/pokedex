import { keyframes } from "@emotion/react";
import {
  fontBgColour,
  primaryTextColour,
  secondaryColour,
} from "../../../utils/colours";

export const MORE_INFO_SLIDE_WIDTH = "350px";

export const outterPokemonInfoSlideContainer = {
  width: MORE_INFO_SLIDE_WIDTH,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const pokemonInfoSlideContainer = {
  width: MORE_INFO_SLIDE_WIDTH,
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
  width: "calc(100% + 10px)",
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

// style for mobile version
export const mobileOutterPokemonInfoSlideContainer = {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  left: "0",
  bottom: "0",
  zIndex: "3",
  paddingTop: "22vh",
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  transition: "all 0.7s ease",
};

export const mobilePokemonInfoSlideContainer = {
  width: "100vw",
  height: "78vh",
  transition: "transform 0.5s ease-out",
  display: "flex",
  justifyContent: "center",
  borderBottomLeftRadius: "0 !important",
  borderBottomRightRadius: "0 !important",
};

export const mobileNoActivePokemonCardStyle = {
  ...mobilePokemonInfoSlideContainer,
  transform: "translateY(100vh)",
};

export const mobileInfoSlideScrollContainer = {
  display: "flex",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  paddingTop: "15px",
};

export const mobileInfoSlideContainer = {
  display: "flex",
  flexDirection: "column",
  minWidth: "calc(100vw + 10px)",
  height: "100%vh",
  boxSizing: "border-box",
  padding: "90px 20px 50px 20px",
  textAlign: "center",
  overflow: "scroll",
  overflowX: "hidden",
};

export const mobileInfoCloseButtonStyle = {
  position: "fixed",
  top: "15px",
  right: "20px",
  backgroundColor: "white",
  boxShadow: `5px 5px ${secondaryColour}`,
  height: "50px",
  width: "50px",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "1",
  "&:active": {
    boxShadow: `2px 2px ${secondaryColour}`,
    transform: "translateX(3px) translateY(3px)",
  },
  transition: "opacity 0.7s ease",
};

export const pokemonSpriteStyle = {
  position: "absolute",
  bottom: "72vh",
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

const bobAnimate = keyframes`
  0% { transform: translate(0,  0px); }
  50%  { transform: translate(0, 10px); }
  100%   { transform: translate(0, 0px); }    
`;

export const indicateScrollableStyle = {
  width: "40px",
  height: "40px",
  m: "0 auto",
  "@media (min-height: 1025px)": {
    display: "none",
  },
  animation: `${bobAnimate} 2s ease-in-out infinite`,
  color: primaryTextColour,
  paddingBottom: "5px",
  transition: "opacity 2s ease",
};

export const indicateScrollContainer = {
  width: MORE_INFO_SLIDE_WIDTH,
  background: "linear-gradient(to bottom, transparent, white)",
  bottom: "0px",
  position: "fixed",
};

export const hideScrollableStyle = {
  ...indicateScrollContainer,
  transition: "opacity 0.5s ease",
  opacity: "0",
};
