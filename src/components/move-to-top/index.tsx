import React, { useState, useEffect } from "react";
import { secondaryColour } from "../../utils/colours";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Hoverable } from "../../utils/styledComponents";

export const MoveToTop: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
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
        <Hoverable
          onClick={handleMoveToTopClick}
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "white",
            boxShadow: `5px 5px 10px ${secondaryColour}`,
            height: "60px",
            width: "60px",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyboardArrowUpRoundedIcon
            sx={{
              width: "50px",
              height: "50px",
              marginTop: "2px",
            }}
          />
        </Hoverable>
      )}
    </>
  );
};
