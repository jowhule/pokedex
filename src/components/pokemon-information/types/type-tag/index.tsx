import React from "react";
import { Chip } from "@mui/material";
import { TYPE_BORDER_COLOURS, TYPE_COLOURS } from "../../../../utils/colours";

type TypeTagProps = {
  type: string;
  clickFn?: () => void;
  selected?: boolean;
};

export const TypeTag: React.FC<TypeTagProps> = ({
  type,
  clickFn,
  selected,
}) => {
  return (
    <Chip
      sx={[
        {
          bgcolor: `${TYPE_COLOURS[type]}`,
          border: `2px solid ${TYPE_BORDER_COLOURS[type]}`,
          fontWeight: "bold",
          fontSize: "14px",
          height: "28px",
          display: "flex",
          alignItems: "center",
        },
        clickFn !== undefined && {
          "&:hover": {
            cursor: "pointer",
            bgcolor: `${
              selected ? TYPE_BORDER_COLOURS[type] : TYPE_COLOURS[type]
            }`,
          },
        },
        selected === true && {
          bgcolor: `${TYPE_BORDER_COLOURS[type]}`,
          color: "primary.light",
          boxShadow: "3px 3px #c3c9cf",
        },
      ]}
      onClick={clickFn}
      label={type}
    />
  );
};
