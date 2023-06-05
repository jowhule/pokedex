import React, { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Box, Dialog, useTheme } from "@mui/material";
import { BodyText, Hoverable } from "../../../../utils/styledComponents";
import { typeColours } from "../../../../utils/colours";
import { TypeTag } from "../../../../components/pokemon-information/type-tag";

type TypeFilterProps = {
  types: string[];
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
};

export const TypeFilter: React.FC<TypeFilterProps> = ({ types, setTypes }) => {
  const theme = useTheme();
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

  useEffect(() => {
    setAvailableTypes(Object.keys(typeColours));
  }, []);
  const [openTypeOptions, setOpenTypeOptions] = useState<boolean>(false);

  const addType = (type: string) => {
    const currAvailable = availableTypes.filter(
      (currType) => currType !== type
    );
    setTypes([...types, type]);
    setAvailableTypes([...currAvailable]);
    handleCloseModal();
  };

  const handleDeleteType = (type: string) => {
    const currTypes = types.filter((currType) => currType !== type);
    setTypes([...currTypes]);
    setAvailableTypes([...availableTypes, type]);
  };

  const handleAddClick = () => {
    setOpenTypeOptions(true);
  };

  const handleCloseModal = () => {
    setOpenTypeOptions(false);
  };

  return (
    <>
      <Dialog open={openTypeOptions} onClose={handleCloseModal}>
        <Box
          sx={{
            width: "400px",
            p: "40px",
            alignItems: "center",
          }}
        >
          <BodyText fontWeight="bold" textAlign="center" fontSize="17px">
            Select a type to sort by:
          </BodyText>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            {availableTypes.map((type, index) => (
              <TypeTag type={type} clickFn={() => addType(type)} key={index} />
            ))}
          </Box>
        </Box>
      </Dialog>

      <Box
        sx={{
          m: "10px",
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <BodyText fontSize="16px">Filter by: </BodyText>
        {types.map((type, index) => (
          <TypeTag
            type={type}
            deleteFn={() => handleDeleteType(type)}
            key={index}
          />
        ))}

        {types.length !== 2 && (
          <Hoverable
            onClick={handleAddClick}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AddCircleRoundedIcon
              sx={{
                color: theme.palette.primary.dark,
                "&:hover": { color: theme.palette.text.primary },
              }}
            />
          </Hoverable>
        )}
      </Box>
    </>
  );
};
