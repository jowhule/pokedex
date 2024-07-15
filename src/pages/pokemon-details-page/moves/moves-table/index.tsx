import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import { LevelUpRowInfoType } from "../types";
import { BodyText, StatTitleText } from "../../../../utils/styledComponents";
import { TypeTag } from "../../../../components/pokemon-information/types/type-tag";
import physicalMoveIcon from "../../../../assets/physical_move_icon.png";
import specialMoveIcon from "../../../../assets/special_move_icon.png";
import statusMoveIcon from "../../../../assets/status_move_icon.png";
import {
  capitalise,
  getComparator,
  stableSort,
} from "../../../../utils/helpers";
import { EnhancedTableHead } from "./enhanced-table-head";
import { MovesTableType, Order } from "./types";
import { methodToName } from "./constants";

export const MovesTable: React.FC<MovesTableType> = ({ data, method }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof LevelUpRowInfoType>("level_learned_at");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof LevelUpRowInfoType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(
    () => stableSort(data, getComparator(order, orderBy)),
    [data, order, orderBy]
  );

  useEffect(() => {
    setOrderBy("level_learned_at");
  }, [data]);

  return (
    <Stack>
      {data.length > 0 && <StatTitleText>{methodToName[method]}</StatTitleText>}
      <TableContainer
        sx={{
          bgcolor: "primary.light",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <Table size="small">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            method={method}
          />
          <TableBody>
            {visibleRows?.map((moves, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                {method === "level-up" && (
                  <TableCell align="right">
                    <BodyText>{moves?.level_learned_at}</BodyText>
                  </TableCell>
                )}
                <Tooltip title={moves?.effect} followCursor>
                  <TableCell align="right">
                    <BodyText>{moves?.name}</BodyText>
                  </TableCell>
                </Tooltip>
                <TableCell align="center">
                  <TypeTag type={moves?.type} />
                </TableCell>
                <Tooltip title={capitalise(moves?.damage_class)} followCursor>
                  <TableCell align="center">
                    {moves?.damage_class === "physical" ? (
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
                    ) : moves?.damage_class === "special" ? (
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
                <TableCell align="center">
                  <BodyText>{moves?.damage ?? "--"}</BodyText>
                </TableCell>
                <TableCell align="right">
                  <BodyText>
                    {moves?.accuracy ? moves?.accuracy + "%" : "--"}
                  </BodyText>
                </TableCell>
                <TableCell align="center">
                  <BodyText paddingRight="10px">{moves?.pp}</BodyText>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
