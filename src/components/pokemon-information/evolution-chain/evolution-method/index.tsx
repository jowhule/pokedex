import React from "react";
import { Box, Tooltip } from "@mui/material";
import { BodyText } from "../../../../utils/styledComponents";
import { NameUrlType } from "../../../../services/apiRequestsTypes";
import { primaryTextColour } from "../../../../utils/colours";
import { pokemonEvoMethodContainer } from "./style";
import { StageInfo } from "..";
import { requestLinks } from "../../../../services/apiRequests";

import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import femaleIcon from "../../../../assets/female_symbol.png";
import maleIcon from "../../../../assets/male_symbol.png";
import { capitalise, removeDash } from "../../../../utils/helpers";

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
        <Tooltip title={`${capitalise(removeDash(valueTyped.name), true)}`}>
          <Box
            component="img"
            src={requestLinks.getItemSprite(valueTyped.name)}
            alt={capitalise(removeDash(valueTyped.name), true)}
          />
        </Tooltip>
      );
    } else if (method === "min_affection" || method === "min_happiness") {
      return (
        <Tooltip title={`${capitalise(removeDash(method))}: ${value}`}>
          <Box
            component="img"
            src={requestLinks.getItemSprite("soothe-bell")}
            alt={`${capitalise(removeDash(method))}}`}
            m="-8px 0"
          />
        </Tooltip>
      );
    } else if (method === "time_of_day") {
      return (
        <BodyText fontWeight="bold" fontSize="10px">
          ({value})
        </BodyText>
      );
    } else if (method === "known_move_type") {
      return (
        <Tooltip title={`Know ${capitalise(valueTyped.name)}-move`}>
          <Box
            component="img"
            src={requestLinks.getTMType(valueTyped.name)}
            alt={`${capitalise(valueTyped.name)} TM`}
          />
        </Tooltip>
      );
    } else if (method === "trade_species") {
      return (
        <BodyText fontWeight="bold" fontSize="12px">
          {capitalise(valueTyped.name)}
        </BodyText>
      );
    } else if (method === "gender") {
      if (value === 1) {
        return <Box component="img" src={femaleIcon} alt="Female icon" />;
      } else if (value === 2)
        return <Box component="img" src={maleIcon} alt="male icon" />;
    } else if (method === "known_move") {
      return (
        <BodyText fontWeight="bold" fontSize="10px">
          {capitalise(removeDash(valueTyped.name), true)}
        </BodyText>
      );
    }

    return (
      <BodyText fontWeight="bold" fontSize="10px">
        {capitalise(method)}
      </BodyText>
    );
  };

  const triggerImage = (trigger: NameUrlType) => {
    switch (trigger.name) {
      case "trade":
        return <LoopRoundedIcon style={{ color: `${primaryTextColour}` }} />;
      case "level-up":
        if (
          !Object.keys(stageInfo.methods).includes("min_level") &&
          !Object.keys(stageInfo.methods).includes("item")
        )
          return (
            <BodyText fontWeight="bold" fontSize="10px">
              Lvl up
            </BodyText>
          );
        break;
      default:
        if (!Object.keys(stageInfo.methods).includes("item"))
          return (
            <BodyText fontWeight="bold" fontSize="10px">
              {capitalise(removeDash(trigger.name))}
            </BodyText>
          );
    }
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
          {triggerImage(stageInfo.trigger)}
        </Box>
      )}
    </>
  );
};
