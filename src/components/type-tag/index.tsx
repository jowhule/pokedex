import React from "react";
import { SecondaryText } from "../../utils/styledComponents";
import { Box } from "@mui/material";
import { typeBorderColours, typeColours } from "../../utils/colours";

type TypeTagProps = {
  type: string;
};

export const TypeTag: React.FC<TypeTagProps> = ({ type }) => {
  return (
    <Box
      sx={{
        bgcolor: `${typeColours[type]}`,
        padding: "0 10px",
        borderRadius: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${typeBorderColours[type]}80`,
      }}
    >
      <SecondaryText fontWeight="bold" fontSize="14px">
        {type}
      </SecondaryText>
    </Box>
  );
};
