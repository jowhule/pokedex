import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLoadPageContext } from "../context-providers/load-provider";
import { loadPageStyle, loaderOff } from "./style";
import { BodyText } from "../../utils/styledComponents";
import { ReactTyped } from "react-typed";
import { pokemonMessages } from "./load_messages";

export const Loader: React.FC = () => {
  const { loadPage } = useLoadPageContext();
  const [random, setRandom] = useState<number>(0);
  const [hideLoad, setHideLoad] = useState<boolean>(false);

  const getRandom = (previousNumber: number): number => {
    let newNumber = Math.floor(Math.random() * pokemonMessages.length);
    while (newNumber === previousNumber) {
      newNumber = Math.floor(Math.random() * pokemonMessages.length);
    }
    return newNumber;
  };

  useEffect(() => {
    if (!loadPage) {
      setRandom((prev) => getRandom(prev));
      setHideLoad(false);
    } else {
      setTimeout(() => {
        setHideLoad((prev) => (prev === true ? false : true));
      }, 500);
    }
  }, [loadPage]);

  return (
    <Box sx={[loadPageStyle, loadPage && loaderOff]}>
      {!hideLoad && (
        <>
          <Box
            width="300px"
            component="img"
            src="https://64.media.tumblr.com/tumblr_mdta50e8IX1rlbw7io1_500.gifv"
            alt="Pikachu Running for Loading..."
          />
          <BodyText p="0 15px" textAlign="center">
            <ReactTyped
              strings={[pokemonMessages[random]]}
              cursorChar="|"
              typeSpeed={20}
              startDelay={950}
            />
          </BodyText>
        </>
      )}
    </Box>
  );
};
