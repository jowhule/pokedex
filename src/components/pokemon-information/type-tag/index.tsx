import React from "react";
import { Chip } from "@mui/material";
import { typeBorderColours, typeColours } from "../../../utils/colours";

type TypeTagProps = {
  type: string;
  deleteFn?: () => void;
  clickFn?: () => void;
};

export const TypeTag: React.FC<TypeTagProps> = ({
  type,
  deleteFn,
  clickFn,
}) => {
  return (
    <Chip
      sx={{
        bgcolor: `${typeColours[type]}`,
        border: `2px solid ${typeBorderColours[type]}`,
        fontWeight: "bold",
        fontSize: "14px",
        height: "28px",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          cursor: `${clickFn && "pointer"}`,
          bgcolor: `${clickFn ? typeBorderColours[type] : typeColours[type]}`,
        },
      }}
      onClick={clickFn}
      onDelete={deleteFn}
      label={type}
    />
  );
};
