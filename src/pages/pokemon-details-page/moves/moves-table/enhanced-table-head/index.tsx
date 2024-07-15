import React from "react";
import { LearnMethodNames, LevelUpRowInfoType } from "../../types";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmaller = useMediaQuery(theme.breakpoints.down("sm"));

  const createSortHandler =
    (property: keyof LevelUpRowInfoType) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const showColumn = (
    method: LearnMethodNames,
    column: keyof LevelUpRowInfoType
  ): boolean => {
    return (
      (!isSmaller &&
        (method === "level-up" || column !== "level_learned_at")) ||
      (isSmaller &&
        ((method === "level-up" && column !== "pp") ||
          (method !== "level-up" &&
            column !== "level_learned_at" &&
            column !== "pp")))
    );
  };

  return (
    <TableHead>
      <TableRow sx={{ bgcolor: "primary.400" }}>
        {headCells.map(
          (headCell) =>
            showColumn(method, headCell.id) && (
              <TableCell
                key={headCell.id}
                align={headCell.center ? "center" : "right"}
                sortDirection={orderBy === headCell.id ? order : false}
                padding={isSmaller ? "none" : "normal"}
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
                      isMobile && {
                        fontSize: "15px",
                      },
                      isSmaller && {
                        padding: "5px 10px",
                      },
                      isSmaller &&
                        headCell.id === "accuracy" && {
                          paddingRight: "30px",
                        },
                      isSmaller &&
                        headCell.id === "level_learned_at" && {
                          paddingLeft: "30px",
                        },
                    ]}
                  >
                    {isMobile ? headCell.short_label : headCell.label}
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
