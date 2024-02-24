import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLoadPageContext } from "../context-providers/load-provider";
import { loadPageStyle, loaderOff } from "./style";
import { BodyText } from "../../utils/styledComponents";
import { ReactTyped } from "react-typed";

const pokemonMessages = [
  "Loading... Professor Oak is still deciding if he wants to give you a Pokédex.",
  "Waiting for the wild Pokémon to appear... and the loading to finish.",
  "Gathering Poké Balls and potions... Just a moment longer!",
  "Team Rocket may be causing trouble, but we're loading your application!",
  "Hold onto your hats! The Pokémon League awaits... after this loading screen.",
  "Loading... because even Pokémon Centers need a moment to rest.",
  "Waiting for the Pokémon to gather at the tall grass... and for the application to load.",
  "Loading... just like training your Magikarp to jump higher. It'll be worth it!",
  "Harnessing the power of Pikachu's thunderbolt, one loading screen at a time.",
  "Loading up the Pokédex, because knowledge is power!",
  "Hang tight, Trainer! Pikachu's charging up the loading progress.",
  "Snorlax is taking a nap... Zzz...",
  "Jigglypuff is singing a lullaby...",
  "Charmander's tail is heating up...",
  "Bulbasaur is planting seeds...",
  "Team Rocket is blasting off...",
  "Pidgey is flying in with the data...",
  "Professor Oak is researching faster loading methods...",
  "Hatching Pokémon eggs...",
  "Harvesting apricots for Pokéballs...",
  "Catching 'em all, one byte at a time...",
  "Syncing up with the Pokédex...",
  "Searching for rare candies...",
  "Paying respects to Raticate...",
];

export const Loader: React.FC = () => {
  const { loadPage } = useLoadPageContext();
  const [random, setRandom] = useState<number>(0);

  const getRandom = (previousNumber: number): number => {
    let newNumber = Math.floor(Math.random() * pokemonMessages.length);
    while (newNumber === previousNumber) {
      newNumber = Math.floor(Math.random() * pokemonMessages.length);
    }
    return newNumber;
  };

  useEffect(() => {
    if (!loadPage) setRandom(getRandom(random));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadPage]);
  return (
    <>
      <Box sx={loadPage ? loaderOff : loadPageStyle}>
        <Box
          width="300px"
          component="img"
          src="https://64.media.tumblr.com/tumblr_mdta50e8IX1rlbw7io1_500.gifv"
          alt="Loading..."
        />
        <BodyText>
          <ReactTyped
            strings={[pokemonMessages[random]]}
            cursorChar="|"
            typeSpeed={20}
            startDelay={950}
          />
        </BodyText>
      </Box>
    </>
  );
};
