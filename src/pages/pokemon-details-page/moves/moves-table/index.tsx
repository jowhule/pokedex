import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
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
import typeIcons from "../../../../assets/type-icons";
import { TYPE_BORDER_COLOURS } from "../../../../utils/colours";

export const MovesTable: React.FC<MovesTableType> = ({ data, method }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmaller = useMediaQuery(theme.breakpoints.down("sm"));

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
    console.log(data);
  }, [data]);

  useEffect(() => {
    setOrderBy("level_learned_at");
  }, [data]);

  return (
    <Stack>
      <StatTitleText>{methodToName[method]}</StatTitleText>
      <TableContainer
        sx={{
          bgcolor: "primary.light",
          borderRadius: "15px",
          overflow: "hidden",
          m: "0 auto",
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
                  <TableCell
                    align="right"
                    padding={isSmaller ? "none" : "normal"}
                  >
                    <BodyText
                      sx={[
                        isMobile && { fontSize: "14px" },
                        isSmaller && { padding: "0 10px" },
                      ]}
                    >
                      {moves?.level_learned_at}
                    </BodyText>
                  </TableCell>
                )}
                <Tooltip title={moves?.effect} followCursor>
                  <TableCell
                    align="right"
                    padding={isSmaller ? "none" : "normal"}
                  >
                    <BodyText
                      sx={[
                        isMobile && { fontSize: "14px" },
                        isSmaller && { padding: "0 10px" },
                      ]}
                    >
                      {moves?.name}
                    </BodyText>
                  </TableCell>
                </Tooltip>
                <TableCell
                  align="center"
                  padding={isSmaller ? "none" : "normal"}
                >
                  {isSmaller ? (
                    <Tooltip title={capitalise(moves?.type ?? "")}>
                      <Box display="flex" p="5px">
                        <Box
                          component="img"
                          src={typeIcons[moves?.type]}
                          alt={`${moves?.type} icon`}
                          sx={{
                            width: "28px",
                            borderRadius: "20px",
                            border: `2px solid ${
                              TYPE_BORDER_COLOURS[moves?.type]
                            }`,
                          }}
                        />
                      </Box>
                    </Tooltip>
                  ) : (
                    <TypeTag type={moves?.type} />
                  )}
                </TableCell>
                <Tooltip title={capitalise(moves?.damage_class)} followCursor>
                  <TableCell
                    align="center"
                    padding={isSmaller ? "none" : "normal"}
                  >
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
                          sx={[
                            isSmaller && {
                              padding: "0 10px",
                            },
                          ]}
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
                          sx={[
                            isSmaller && {
                              padding: "0 10px",
                            },
                          ]}
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
                          sx={[
                            isSmaller && {
                              padding: "0 10px",
                            },
                          ]}
                        />
                      </Box>
                    )}
                  </TableCell>
                </Tooltip>
                <TableCell
                  align="center"
                  padding={isSmaller ? "none" : "normal"}
                >
                  <BodyText
                    sx={[
                      isMobile && { fontSize: "14px" },
                      isSmaller && { padding: "0 10px" },
                    ]}
                  >
                    {moves?.damage ?? "--"}
                  </BodyText>
                </TableCell>
                <TableCell
                  align="right"
                  padding={isSmaller ? "none" : "normal"}
                >
                  <BodyText
                    sx={[
                      isMobile && { fontSize: "14px" },
                      isSmaller && { paddingRight: "30px" },
                    ]}
                  >
                    {moves?.accuracy ? moves?.accuracy + "%" : "--"}
                  </BodyText>
                </TableCell>
                {!isSmaller && (
                  <TableCell
                    align="center"
                    padding={isSmaller ? "none" : "normal"}
                  >
                    <BodyText
                      sx={[
                        { paddingRight: "10px" },
                        isMobile && { fontSize: "14px" },
                      ]}
                    >
                      {moves?.pp}
                    </BodyText>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
