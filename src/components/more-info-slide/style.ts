export const pokemonInfoSlideContainer = {
  width: "350px",
  height: "80vh",
  position: "fixed",
  bottom: "-10px",
  transition: "transform 0.5s ease",
};

export const noActivePokemonCardStyle = {
  ...pokemonInfoSlideContainer,
  transform: "translateX(500px)",
};

export const pokemonSpriteStyle = {
  position: "absolute",
  bottom: "100%",
  imageRendering: "pixelated",
  overflowClipMargin: "content-box",
};

export const activePokemonSpriteStyle = {
  ...pokemonSpriteStyle,
  transform: "scale(3)",
};

export const noActivePokemonSpriteStyle = {
  ...pokemonSpriteStyle,
  width: "150px",
  marginBottom: "-50px",
  marginLeft: "50px",
};

export const infoSlideContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  padding: "20px",
  paddingTop: "90px",
  textAlign: "center",
  position: "relative",
  height: "100%",
};
