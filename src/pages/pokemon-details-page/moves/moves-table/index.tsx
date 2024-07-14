import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React from "react";
import { LevelUpType, VersionsOptionsType } from "../types";
import { BodyText } from "../../../../utils/styledComponents";
import { TypeTag } from "../../../../components/pokemon-information/types/type-tag";
import physicalMoveIcon from "../../../../assets/physical_move_icon.png";
import specialMoveIcon from "../../../../assets/special_move_icon.png";
import statusMoveIcon from "../../../../assets/status_move_icon.png";
import { capitalise } from "../../../../utils/helpers";

type MovesTableType = {
  data: LevelUpType;
  versions: VersionsOptionsType;
  method: string;
};

export const MovesTable: React.FC<MovesTableType> = ({
  data,
  versions,
  method,
}) => {
  return (
    <Stack>
      <TableContainer sx={{ bgcolor: "primary.light", borderRadius: "15px" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {method === "level-up" && (
                <TableCell align="center">
                  <BodyText fontWeight="bold">Level</BodyText>
                </TableCell>
              )}
              <TableCell align="right">
                <BodyText fontWeight="bold">Move</BodyText>
              </TableCell>
              <TableCell align="center">
                <BodyText fontWeight="bold">Type</BodyText>
              </TableCell>
              <TableCell align="center">
                <BodyText fontWeight="bold">Category</BodyText>
              </TableCell>
              <TableCell align="center">
                <BodyText fontWeight="bold">Power</BodyText>
              </TableCell>
              <TableCell align="right">
                <BodyText fontWeight="bold">Accuracy</BodyText>
              </TableCell>
              <TableCell align="center">
                <BodyText fontWeight="bold">PP</BodyText>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data[versions.versionsList[versions.active]] &&
              data[versions.versionsList[versions.active]].map((moves, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {method === "level-up" && (
                    <TableCell align="right">
                      {moves.level_learned_at}
                    </TableCell>
                  )}
                  <Tooltip title={moves.effect} arrow>
                    <TableCell align="right">
                      <>{moves.name}</>
                    </TableCell>
                  </Tooltip>
                  <TableCell align="center">
                    <TypeTag type={moves.type} />
                  </TableCell>
                  <Tooltip title={capitalise(moves.damage_class)} arrow>
                    <TableCell align="center">
                      {moves.damage_class === "physical" ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Box
                            component="img"
                            src={physicalMoveIcon}
                            alt="physical"
                            maxHeight="20px"
                          />
                        </Box>
                      ) : moves.damage_class === "special" ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Box
                            component="img"
                            src={specialMoveIcon}
                            alt="special"
                            maxHeight="20px"
                          />
                        </Box>
                      ) : (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Box
                            component="img"
                            src={statusMoveIcon}
                            alt="status"
                            maxHeight="20px"
                          />
                        </Box>
                      )}
                    </TableCell>
                  </Tooltip>
                  <TableCell align="center">{moves.damage ?? "--"}</TableCell>
                  <TableCell align="right">
                    {moves.accuracy ? moves.accuracy + "%" : "--"}
                  </TableCell>
                  <TableCell align="center">{moves.pp}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
