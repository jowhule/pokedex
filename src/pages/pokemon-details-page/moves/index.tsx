import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  PokemonMoveType,
  PokemonMovesResponseType,
} from "../../../services/apiRequestsTypes";
import {
  CategoryIconProps,
  LearnMethodNames,
  MovesProps,
  ParsedMovesDataType,
  VersionsOptionsType,
} from "./types";
import {
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { BodyText, StatTitleText } from "../../../utils/styledComponents";
import { capitalise, capitaliseDash, removeDash } from "../../../utils/helpers";
import { MovesTable } from "./moves-table";
import { sendGenericAPIRequest } from "../../../services/apiRequests";
import physicalMoveIcon from "../../../assets/physical_move_icon.png";
import specialMoveIcon from "../../../assets/special_move_icon.png";
import statusMoveIcon from "../../../assets/status_move_icon.png";
import {
  categoryLegendContainer,
  moveListSyle,
  movesTablesGridContainer,
  movesTitleStyle,
} from "./style";

const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  return (
    <Box>
      <BodyText fontSize="14px">{capitalise(category)} move</BodyText>
      <Box
        component="img"
        src={
          category === "physical"
            ? physicalMoveIcon
            : category === "special"
            ? specialMoveIcon
            : statusMoveIcon
        }
        maxHeight="20px"
      />
    </Box>
  );
};

export const Moves: React.FC<MovesProps> = ({ data, active }) => {
  const theme = useTheme();

  const learnMethodNamesSet: Set<LearnMethodNames> = useMemo(
    () =>
      new Set([
        "level-up" as LearnMethodNames,
        "machine" as LearnMethodNames,
        "tutor" as LearnMethodNames,
        "egg" as LearnMethodNames,
      ]),
    []
  );

  const [parsedMovesData, setParsedMovesData] = useState<ParsedMovesDataType>({
    "level-up": {},
    machine: {},
    tutor: {},
    egg: {},
  });
  const [versions, setVersions] = useState<VersionsOptionsType>({
    versionsList: [],
    active: -1,
  });
  const [openVersions, setOpenVersions] = useState<boolean>(false);
  const [doneLoading, setDoneLoading] = useState<boolean>(false);

  const addMove = (
    parsedData: ParsedMovesDataType,
    name: string,
    learnMethod: LearnMethodNames,
    version: string,
    url: string,
    moveData: PokemonMovesResponseType,
    levelLearnedAt?: number
  ) => {
    if (!(version in parsedData[learnMethod]))
      parsedData[learnMethod][version] = [];

    const fullName = moveData.names.find(
      (langName) => langName.language.name === "en"
    )?.name;

    const effect = moveData.effect_entries.find(
      (entries) => entries.language.name === "en"
    )?.short_effect;

    parsedData[learnMethod][version].push({
      level_learned_at: levelLearnedAt ?? -1,
      name: fullName ?? name,
      url,
      accuracy: moveData.accuracy,
      pp: moveData.pp,
      damage: moveData.power,
      type: moveData.type.name,
      damage_class: moveData.damage_class.name,
      effect: effect ?? "",
    });
  };

  const pokemonMovePromise = useCallback(
    (
      moveData: PokemonMoveType,
      parsedData: ParsedMovesDataType,
      versions: Set<string>
    ): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        if (!moveData.move.url) reject();
        sendGenericAPIRequest<PokemonMovesResponseType>(
          moveData.move?.url
        ).then((data) => {
          for (const version of moveData.version_group_details) {
            const moveLearnMethod = version.move_learn_method
              .name as LearnMethodNames;
            if (learnMethodNamesSet.has(moveLearnMethod) && data) {
              addMove(
                parsedData,
                moveData.move?.name ?? "",
                moveLearnMethod,
                version.version_group.name,
                moveData.move?.url ?? "",
                data,
                version.level_learned_at
              );
              versions.add(version.version_group.name);
            }
          }
          resolve();
        });
      });
    },
    [learnMethodNamesSet]
  );

  useEffect(() => {
    if (data.length === 0) return;
    const parsedData: ParsedMovesDataType = {
      "level-up": {},
      machine: {},
      tutor: {},
      egg: {},
    };
    const setOfVersions = new Set<string>();

    if (
      Object.keys(parsedMovesData["level-up"]).length === 0 &&
      Object.keys(parsedMovesData.egg).length === 0 &&
      Object.keys(parsedMovesData.machine).length === 0 &&
      Object.keys(parsedMovesData.tutor).length === 0
    ) {
      setDoneLoading(false);

      const movesPromiseHolder: Promise<void>[] = [];
      for (const moveData of data) {
        movesPromiseHolder.push(
          pokemonMovePromise(moveData, parsedData, setOfVersions)
        );
      }

      Promise.all(movesPromiseHolder).then(() => {
        for (const key of Object.keys(parsedData["level-up"])) {
          parsedData["level-up"][key].sort(
            (a, b) => a.level_learned_at - b.level_learned_at
          );
        }
        const arrayOfVersions = Array.from(setOfVersions);
        setVersions({
          versionsList: arrayOfVersions,
          active: arrayOfVersions.length - 1,
        });
        setParsedMovesData(parsedData);
        setDoneLoading(true);
      });
    }
  }, [data, parsedMovesData, pokemonMovePromise]);

  useEffect(() => {
    setParsedMovesData({
      "level-up": {},
      machine: {},
      tutor: {},
      egg: {},
    });
    setVersions({ versionsList: [], active: -1 });
  }, [active]);

  /*-- drop down menu code taken from mui demos --*/
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpenVersions(!openVersions);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    )
      return;
    setOpenVersions(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenVersions(false);
    } else if (event.key === "Escape") {
      setOpenVersions(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openVersions);
  React.useEffect(() => {
    if (prevOpen.current === true && openVersions === false)
      anchorRef.current!.focus();

    prevOpen.current = openVersions;
  }, [openVersions]);

  return (
    <Box p="5px" marginBottom="30px">
      {doneLoading ? (
        <>
          {versions.versionsList.length > 0 ? (
            <>
              <Popper
                open={openVersions}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 1 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper sx={{ borderRadius: "10px" }}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={openVersions}
                          onKeyDown={handleListKeyDown}
                          sx={moveListSyle}
                        >
                          {versions.versionsList.map((version, i) => (
                            <MenuItem
                              key={i}
                              onClick={() => {
                                setVersions({ ...versions, active: i });
                                setOpenVersions(false);
                              }}
                            >
                              {removeDash(capitaliseDash(version ?? ""))}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Box>
                <StatTitleText sx={movesTitleStyle}>Moves</StatTitleText>
                <BodyText textAlign="center" m="5px 0">
                  Showing moves for Pokémon
                  <Button variant="text" ref={anchorRef} onClick={handleToggle}>
                    <BodyText fontWeight="bold">
                      {removeDash(versions.versionsList[versions.active] ?? "")}
                    </BodyText>
                    <KeyboardArrowDownRoundedIcon
                      sx={{ color: "text.primary" }}
                    />
                  </Button>
                </BodyText>

                <Stack alignItems="center" textAlign="center">
                  <Stack direction="row" sx={categoryLegendContainer(theme)}>
                    <CategoryIcon category="physical" />
                    <CategoryIcon category="special" />
                    <CategoryIcon category="status" />
                  </Stack>
                </Stack>
              </Box>

              <Grid container spacing={2} sx={movesTablesGridContainer}>
                {parsedMovesData["level-up"][
                  versions.versionsList[versions.active]
                ] &&
                  parsedMovesData["level-up"][
                    versions.versionsList[versions.active]
                  ].length > 0 && (
                    <Grid item>
                      <Stack>
                        <MovesTable
                          method={"level-up"}
                          data={
                            parsedMovesData["level-up"][
                              versions.versionsList[versions.active]
                            ]
                          }
                        />
                      </Stack>
                    </Grid>
                  )}

                {parsedMovesData.machine[
                  versions.versionsList[versions.active]
                ] &&
                  parsedMovesData.machine[
                    versions.versionsList[versions.active]
                  ].length > 0 && (
                    <Grid item>
                      <Stack>
                        <MovesTable
                          method={"machine"}
                          data={
                            parsedMovesData.machine[
                              versions.versionsList[versions.active]
                            ]
                          }
                        />
                      </Stack>
                    </Grid>
                  )}

                {parsedMovesData.egg[versions.versionsList[versions.active]] &&
                  parsedMovesData.egg[versions.versionsList[versions.active]]
                    .length > 0 && (
                    <Grid item>
                      <Stack>
                        <MovesTable
                          method={"egg"}
                          data={
                            parsedMovesData.egg[
                              versions.versionsList[versions.active]
                            ]
                          }
                        />
                      </Stack>
                    </Grid>
                  )}

                {parsedMovesData.tutor[
                  versions.versionsList[versions.active]
                ] &&
                  parsedMovesData.tutor[versions.versionsList[versions.active]]
                    .length > 0 && (
                    <Grid item>
                      <Stack>
                        <MovesTable
                          method={"tutor"}
                          data={
                            parsedMovesData.tutor[
                              versions.versionsList[versions.active]
                            ]
                          }
                        />
                      </Stack>
                    </Grid>
                  )}
              </Grid>
            </>
          ) : (
            <BodyText fontWeight="bold" marginTop="30px">
              This Pokémon cannot learn moves.
            </BodyText>
          )}
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
