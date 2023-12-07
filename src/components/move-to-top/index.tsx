import React, { useState, useEffect } from "react";
import { primaryTextColour } from "../../utils/colours";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Hoverable } from "../../utils/styledComponents";
import { moveToTopContainer } from "./style";

export const MoveToTop: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const handleMoveToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {scrollPosition > 1080 && (
        <Hoverable onClick={handleMoveToTopClick} sx={moveToTopContainer}>
          <KeyboardArrowUpRoundedIcon
            sx={{
              width: "50px",
              height: "50px",
              marginTop: "2px",
              color: primaryTextColour,
            }}
          />
        </Hoverable>
      )}
    </>
  );
};
