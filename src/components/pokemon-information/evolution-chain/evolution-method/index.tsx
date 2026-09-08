import React from "react";
import { Box, Tooltip } from "@mui/material";
import { BodyText } from "../../../../utils/styledComponents";
import { NameUrlType } from "../../../../services/apiRequestsTypes";
import { pokemonEvoMethodContainer } from "./style";
import { StageInfo } from "..";
import { requestLinks } from "../../../../services/apiRequests";

import tradingIcon from "../../../../assets/trading.png";
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
      typeof value === "object" ? (value as NameUrlType) : value;

    const capName = (name: string) => capitalise(removeDash(name), true);
    // do not add words for method classification
    if (["is_default", "version_group", "base_form"].includes(method))
      return null;
    // match evolution method to respective display method
    switch (method) {
      case "min_level":
        return (
          <BodyText fontWeight="bold" fontSize="12px">
            Lv.{value}
          </BodyText>
        );

      case "held_item":
      case "item":
        return (
          <Tooltip title={capName(valueTyped.name)}>
            <Box
              component="img"
              src={requestLinks.getItemSprite(valueTyped.name)}
              alt={capName(valueTyped.name)}
            />
          </Tooltip>
        );

      case "min_affection":
      case "min_happiness":
        return (
          <Tooltip title={`${capitalise(removeDash(method))}: ${value}`}>
            <Box
              component="img"
              src={requestLinks.getItemSprite("soothe-bell")}
              alt={capitalise(removeDash(method))}
              m="-8px 0"
            />
          </Tooltip>
        );

      case "time_of_day":
        return (
          <BodyText fontWeight="bold" fontSize="10px">
            ({value})
          </BodyText>
        );

      case "known_move_type":
        return (
          <Tooltip title={`Know ${capitalise(valueTyped.name)}-move`}>
            <Box
              component="img"
              src={requestLinks.getTMType(valueTyped.name)}
              alt={`${capitalise(valueTyped.name)} TM`}
            />
          </Tooltip>
        );

      case "trade_species":
        return (
          <BodyText fontWeight="bold" fontSize="12px">
            {capitalise(valueTyped.name)}
          </BodyText>
        );

      case "gender":
        if (value === 1) {
          return <Box component="img" src={femaleIcon} alt="Female icon" />;
        } else if (value === 2) {
          return <Box component="img" src={maleIcon} alt="Male icon" />;
        }
        return null;

      case "known_move":
        return (
          <BodyText fontWeight="bold" fontSize="10px">
            {capName(valueTyped.name)}
          </BodyText>
        );

      default:
        return (
          <Tooltip title={`${capName(method)}: ${value}`}>
            <BodyText fontWeight="bold" fontSize="10px">
              {capName(method)}
            </BodyText>
          </Tooltip>
        );
    }
  };

  const triggerImage = (trigger: NameUrlType) => {
    switch (trigger.name) {
      case "trade":
        return (
          <Box
            component="img"
            src={tradingIcon}
            alt="Trading"
            sx={{ width: "25px" }}
          />
        );
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
      {stageInfo.trigger.name && (
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
