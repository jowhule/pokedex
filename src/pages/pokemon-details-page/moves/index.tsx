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
  LearnMethodNames,
  ParsedMovesDataType,
  VersionsOptionsType,
} from "./types";
import {
  Box,
  Button,
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
import { capitaliseDash, removeDash } from "../../../utils/helpers";
import { MovesTable } from "./moves-table";
import { sendGenericAPIRequest } from "../../../services/apiRequests";
import physicalMoveIcon from "../../../assets/physical_move_icon.png";
import specialMoveIcon from "../../../assets/special_move_icon.png";
import statusMoveIcon from "../../../assets/status_move_icon.png";

type MovesProps = {
  data: PokemonMoveType[];
};

export const Moves: React.FC<MovesProps> = ({ data }) => {
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

  const pokemonMovePromise = useCallback(
    (
      moveData: PokemonMoveType,
      parsedData: ParsedMovesDataType,
      versions: Set<string>
    ): Promise<void> => {
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

      return new Promise<void>((resolve) => {
        sendGenericAPIRequest<PokemonMovesResponseType>(moveData.move.url).then(
          (data) => {
            for (const version of moveData.version_group_details) {
              const moveLearnMethod = version.move_learn_method
                .name as LearnMethodNames;
              if (learnMethodNamesSet.has(moveLearnMethod) && data) {
                addMove(
                  parsedData,
                  moveData.move.name,
                  moveLearnMethod,
                  version.version_group.name,
                  moveData.move.url,
                  data,
                  version.level_learned_at
                );
                versions.add(version.version_group.name);
              }
            }
            resolve();
          }
        );
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
      });
    }
  }, [data, parsedMovesData, pokemonMovePromise]);

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

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box p="5px" marginBottom="30px">
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
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={openVersions}
                  onKeyDown={handleListKeyDown}
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
        <StatTitleText sx={{ fontSize: "20px", textAlign: "center" }}>
          Moves
        </StatTitleText>
        <BodyText textAlign="center" m="5px 0">
          Showing moves for Pokémon
          <Button variant="text" ref={anchorRef} onClick={handleToggle}>
            <BodyText fontWeight="bold">
              {removeDash(versions.versionsList[versions.active] ?? "")}
            </BodyText>
            <KeyboardArrowDownRoundedIcon sx={{ color: "text.primary" }} />
          </Button>
        </BodyText>

        <Stack alignItems="center" textAlign="center">
          <Stack
            bgcolor="primary.light"
            display="flex"
            direction="row"
            gap="20px"
            p="10px 20px"
            borderRadius="15px"
            boxShadow={theme.shadows[2]}
          >
            <Box>
              <BodyText fontSize="14px">Physical move</BodyText>
              <Box component="img" src={physicalMoveIcon} maxHeight="20px" />
            </Box>
            <Box>
              <BodyText fontSize="14px">Special move</BodyText>
              <Box component="img" src={specialMoveIcon} maxHeight="20px" />
            </Box>
            <Box>
              <BodyText fontSize="14px">Status move</BodyText>
              <Box component="img" src={statusMoveIcon} maxHeight="20px" />
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="column"
        marginBottom="40px"
      >
        <Grid item>
          <Stack>
            {parsedMovesData["level-up"][
              versions.versionsList[versions.active]
            ] && (
              <MovesTable
                method={"level-up"}
                data={
                  parsedMovesData["level-up"][
                    versions.versionsList[versions.active]
                  ]
                }
              />
            )}
          </Stack>
        </Grid>

        <Grid item>
          <Stack>
            {parsedMovesData.machine[
              versions.versionsList[versions.active]
            ] && (
              <MovesTable
                method={"machine"}
                data={
                  parsedMovesData.machine[
                    versions.versionsList[versions.active]
                  ]
                }
              />
            )}
          </Stack>
        </Grid>

        <Grid item>
          <Stack>
            {parsedMovesData.egg[versions.versionsList[versions.active]] && (
              <MovesTable
                method={"egg"}
                data={
                  parsedMovesData.egg[versions.versionsList[versions.active]]
                }
              />
            )}
          </Stack>
        </Grid>

        <Grid item>
          <Stack>
            {parsedMovesData.tutor[versions.versionsList[versions.active]] && (
              <MovesTable
                method={"tutor"}
                data={
                  parsedMovesData.tutor[versions.versionsList[versions.active]]
                }
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
