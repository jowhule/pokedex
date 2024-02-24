import { Box } from "@mui/material";
import React from "react";
import { TypeTag } from "./type-tag";
import { PokemonTypeType } from "../../../services/apiRequestsTypes";

type TypesType = {
  typesData: PokemonTypeType[];
};

export const Types: React.FC<TypesType> = ({ typesData }) => {
  return (
    <>
      <Box display="flex" gap="10px" m="10px" justifyContent="center">
        {typesData?.map((type, index) => (
          <TypeTag type={type.type.name} key={index} />
        ))}
      </Box>
    </>
  );
};
