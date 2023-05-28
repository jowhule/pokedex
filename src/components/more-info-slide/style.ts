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
