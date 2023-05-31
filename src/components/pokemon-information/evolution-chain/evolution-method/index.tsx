import React from "react";
import { Box } from "@mui/material";
import { BodyText } from "../../../../utils/styledComponents";
import { NameUrlType } from "../../../../services/apiRequestsTypes";
import { primaryTextColour } from "../../../../utils/colours";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import { pokemonEvoMethodContainer } from "./style";
import { StageInfo } from "..";
import { requestLinks } from "../../../../services/apiRequests";

type EvolutionMethodType = {
  stageInfo: StageInfo;
};

export const EvolutionMethod: React.FC<EvolutionMethodType> = ({
  stageInfo,
}) => {
  const methodImage = (method: string, value: any) => {
    const valueTyped =
      typeof method === "object" ? (value as NameUrlType) : value;
    if (method === "min_level") {
      return (
        <BodyText fontWeight="bold" fontSize="12px">
          Lv.{value}
        </BodyText>
      );
    } else if (method === "held_item" || method === "item") {
      return (
        <Box
          component="img"
          src={requestLinks.getItemSprite(valueTyped.name)}
          alt={valueTyped.name}
        />
      );
    } else if (method === "min_affection" || method === "min_happiness") {
      return (
        <Box>
          <Box
            component="img"
            src={requestLinks.getItemSprite("soothe-bell")}
            alt="affection"
          />
          <BodyText
            fontWeight="bold"
            fontSize="10px"
            sx={{ marginTop: "-10px" }}
          >
            {value}
          </BodyText>
        </Box>
      );
    } else if (method === "time_of_day") {
      return (
        <BodyText fontWeight="bold" fontSize="10px">
          ({value})
        </BodyText>
      );
    } else if (method === "known_move_type") {
      return (
        <Box
          component="img"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${valueTyped.name}.png`}
          alt={`${valueTyped.name} TM`}
        />
      );
    } else if (method === "trade_species") {
      return (
        <BodyText fontWeight="bold" fontSize="12px">
          {valueTyped.name}
        </BodyText>
      );
    }

    return (
      <BodyText fontWeight="bold" fontSize="10px">
        {method}
      </BodyText>
    );
  };

  return (
    <>
      {stageInfo.stage > 0 && (
        <Box sx={pokemonEvoMethodContainer}>
          {Object.keys(stageInfo.methods).map((method, index_m) => (
            <Box key={index_m}>
              {methodImage(method, stageInfo.methods[method])}
            </Box>
          ))}
          {stageInfo.trigger.name === "trade" && (
            <LoopRoundedIcon style={{ color: `${primaryTextColour}` }} />
          )}
        </Box>
      )}
    </>
  );
};
