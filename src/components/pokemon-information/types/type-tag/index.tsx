import React from "react";
import { Chip } from "@mui/material";
import { TYPE_BORDER_COLOURS, TYPE_COLOURS } from "../../../../utils/colours";

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
        bgcolor: `${TYPE_COLOURS[type]}`,
        border: `2px solid ${TYPE_BORDER_COLOURS[type]}`,
        fontWeight: "bold",
        fontSize: "14px",
        height: "28px",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          cursor: `${clickFn && "pointer"}`,
          bgcolor: `${
            clickFn ? TYPE_BORDER_COLOURS[type] : TYPE_COLOURS[type]
          }`,
        },
      }}
      onClick={clickFn}
      onDelete={deleteFn}
      label={type}
    />
  );
};
