import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import { LevelUpRowInfoType } from "../types";
import { BodyText } from "../../../../utils/styledComponents";
import { TypeTag } from "../../../../components/pokemon-information/types/type-tag";
import physicalMoveIcon from "../../../../assets/physical_move_icon.png";
import specialMoveIcon from "../../../../assets/special_move_icon.png";
import statusMoveIcon from "../../../../assets/status_move_icon.png";
import { capitalise } from "../../../../utils/helpers";
import { visuallyHidden } from "@mui/utils";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] === null) return -1;
  if (a[orderBy] === null) return 1;
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(
  order: Order,
  orderBy: keyof LevelUpRowInfoType
): (a: LevelUpRowInfoType, b: LevelUpRowInfoType) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(
  array: LevelUpRowInfoType[],
  comparator: (a: LevelUpRowInfoType, b: LevelUpRowInfoType) => number
) {
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [LevelUpRowInfoType, number]
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof LevelUpRowInfoType;
  label: string;
  center: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "level_learned_at",
    center: false,
    label: "Level",
  },
  {
    id: "name",
    center: false,
    label: "Move",
  },
  {
    id: "type",
    center: true,
    label: "Type",
  },
  {
    id: "damage_class",
    center: true,
    label: "Category",
  },
  {
    id: "damage",
    center: true,
    label: "Power",
  },
  {
    id: "accuracy",
    center: false,
    label: "Accuracy",
  },
  {
    id: "pp",
    center: true,
    label: "PP",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof LevelUpRowInfoType
  ) => void;
  order: Order;
  orderBy: string;
  method: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, method } = props;
  const createSortHandler =
    (property: keyof LevelUpRowInfoType) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow sx={{ bgcolor: "#ececf4" }}>
        {headCells.map((headCell) => (
          <>
            {(method === "level-up" || headCell.id !== "level_learned_at") && (
              <TableCell
                key={headCell.id}
                align={headCell.center ? "center" : "right"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  hideSortIcon
                >
                  <BodyText
                    fontWeight="bold"
                    sx={[
                      {
                        "&:hover": { cursor: "pointer", opacity: 0.8 },
                        position: "relative",
                      },
                      headCell.id === "level_learned_at" && {
                        paddingLeft: "10px",
                      },
                      headCell.id === "pp" && {
                        paddingRight: "10px",
                      },
                    ]}
                  >
                    {headCell.label}
                    {orderBy === headCell.id && (
                      <KeyboardArrowDownRoundedIcon
                        sx={{ position: "absolute" }}
                      />
                    )}
                  </BodyText>
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )}
          </>
        ))}
      </TableRow>
    </TableHead>
  );
}

type MovesTableType = {
  data: LevelUpRowInfoType[];
  method: string;
};

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
      <TableContainer
        sx={{
          bgcolor: "primary.light",
          borderRadius: "5px 5px 15px 15px",
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
                    <BodyText>{moves.level_learned_at}</BodyText>
                  </TableCell>
                )}
                <Tooltip title={moves.effect} followCursor>
                  <TableCell align="right">
                    <BodyText>{moves.name}</BodyText>
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
                <TableCell align="center">
                  <BodyText>{moves.damage ?? "--"}</BodyText>
                </TableCell>
                <TableCell align="right">
                  <BodyText>
                    {moves.accuracy ? moves.accuracy + "%" : "--"}
                  </BodyText>
                </TableCell>
                <TableCell align="center">
                  <BodyText paddingRight="10px">{moves.pp}</BodyText>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
