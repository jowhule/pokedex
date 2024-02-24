import React, { useEffect, useState } from "react";
import { PokemonDataResponseType } from "../../../services/apiRequestsTypes";
import { TabsPanel } from "../../../components/tabs-panel";
import { CustomCard } from "../../../components/custom-card/CustomCard";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { pokemonDetailsBgWrapper } from "../style";
import { BodyText, StatTitleText } from "../../../utils/styledComponents";
import { capitaliseDash, removeDash } from "../../../utils/helpers";

type PokemonMovesType = {
  nameList: string[];
  dataList: PokemonDataResponseType[];
};

type MovesType = {
  type: string;
  power: number;
  pp: number;
  accuracy: number;
  damage_class: string;
  effect_entry: string;
};

export const PokemonMoves: React.FC<PokemonMovesType> = ({
  nameList,
  dataList,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [active, setActive] = useState<number>(0);
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [movesData, setMovesData] = useState<
    Record<string, Record<string, any>>[]
  >([]);

  useEffect(() => {
    const filter: string[] = [];
    const moves: Record<string, any>[] = [];
    nameList.forEach((name, i) => {
      if ((i === 0 || name.includes(" Form")) && name !== "Gigantamax Form") {
        filter.push(name);
        const movesTemp: Record<string, Record<string, any>> = {};
        dataList[i].moves.forEach((move) => {
          move.version_group_details.forEach((version) => {
            if (version.version_group.name !== "scarlet-violet") {
              if (!(version.move_learn_method.name in movesTemp)) {
                movesTemp[version.move_learn_method.name] = {};
              }

              movesTemp[version.move_learn_method.name][move.move.name] = {
                "level-learned-at": version.level_learned_at,
                url: move.move.url,
              };
            }
          });
        });
        moves.push(movesTemp);
      }
    });
    setFilteredList(filter);
    setMovesData(moves);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameList]);

  useEffect(() => {
    console.log(movesData);
  }, [movesData]);
  return (
    <>
      <TabsPanel names={filteredList} active={active} setActive={setActive} />
      <CustomCard
        sx={
          isMobile
            ? { ...pokemonDetailsBgWrapper, borderTopRightRadius: "0" }
            : pokemonDetailsBgWrapper
        }
      >
        <Box sx={{ display: "flex", flexFlow: "row wrap" }}>
          {Object.keys(movesData[active] ?? []).map((learnMethod, i) => (
            <Box key={i}>
              <StatTitleText>
                {removeDash(capitaliseDash(learnMethod))}
              </StatTitleText>
              <Stack>
                {Object.keys(movesData[active][learnMethod]).map((move, i) => (
                  <BodyText key={i}>
                    {removeDash(capitaliseDash(move))}
                  </BodyText>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </CustomCard>
      <Box marginBottom="40px"></Box>
    </>
  );
};
