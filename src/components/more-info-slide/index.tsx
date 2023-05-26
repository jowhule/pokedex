import React from "react";
import { CustomCard } from "../custom-card/CustomCard";

type MoreInfoSlideType = {
  activePokemonUrl: string;
};
export const MoreInfoSlide: React.FC<MoreInfoSlideType> = () => {
  return (
    <CustomCard
      sx={{
        width: "350px",
        height: "85vh",
        position: "fixed",
        bottom: "-10px",
      }}
    >
      a
    </CustomCard>
  );
};
