import React from "react";
import { LevelUpRowInfoType } from "../../types";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { BodyText } from "../../../../../utils/styledComponents";
import { visuallyHidden } from "@mui/utils";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { headCells } from "../constants";
import { EnhancedTableProps } from "./types";

export const EnhancedTableHead: React.FC<EnhancedTableProps> = ({
  order,
  orderBy,
  onRequestSort,
  method,
}) => {
  const createSortHandler =
    (property: keyof LevelUpRowInfoType) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow sx={{ bgcolor: "primary.400" }}>
        {headCells.map(
          (headCell) =>
            (method === "level-up" || headCell.id !== "level_learned_at") && (
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
                        sx={[
                          {
                            position: "absolute",
                            transition: "transform 0.2s ease",
                          },
                          order === "asc" && { transform: "rotate(180deg)" },
                        ]}
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
            )
        )}
      </TableRow>
    </TableHead>
  );
};
