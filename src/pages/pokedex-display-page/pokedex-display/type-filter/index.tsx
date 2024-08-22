import React, { useEffect, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { Box, Button, Dialog, Grid, IconButton, Stack } from "@mui/material";
import { BodyText, Hoverable } from "../../../../utils/styledComponents";
import { TYPE_COLOURS } from "../../../../utils/colours";
import { TypeTag } from "../../../../components/pokemon-information/types/type-tag";
import {
  addMoreFiltersStyle,
  typeFilterContainer,
  typesListingContainer,
  typesListingWrapper,
} from "./style";

type TypeFilterProps = {
  generation: string;
  types: string[];
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
};

export const TypeFilter: React.FC<TypeFilterProps> = ({
  types,
  setTypes,
  generation,
}) => {
  const allTypes = Object.keys(TYPE_COLOURS);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [openTypeOptions, setOpenTypeOptions] = useState<boolean>(false);

  const editTypes = (type: string) => {
    if (selectedTypes.includes(type)) {
      const removedType = selectedTypes.filter((currType) => currType !== type);
      setSelectedTypes([...removedType]);
    } else {
      if (selectedTypes.length === 2) {
        selectedTypes.splice(0, 1);
      }
      setSelectedTypes((prev) => [...prev, type]);
    }
  };

  const handleAddClick = () => {
    setOpenTypeOptions(true);
  };

  const handleCloseModal = () => {
    setOpenTypeOptions(false);
    setSelectedTypes([...types]);
  };

  const handleConfirmClose = () => {
    setOpenTypeOptions(false);
    setTypes([...selectedTypes]);
  };

  useEffect(() => {
    setSelectedTypes([]);
  }, [generation]);

  return (
    <>
      <Dialog open={openTypeOptions} onClose={handleCloseModal}>
        <Stack sx={typesListingContainer}>
          <BodyText fontWeight="bold" textAlign="center" fontSize="17px">
            Select at most 2 types to sort by:
          </BodyText>
          <Box sx={typesListingWrapper}>
            <Grid container spacing="10px">
              {allTypes.map((type, index) => (
                <Grid item key={index} xs={3}>
                  <TypeTag
                    type={type}
                    selected={selectedTypes.includes(type)}
                    clickFn={() => editTypes(type)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Button
            sx={{
              m: "20px auto",
              fontWeight: "bold",
              borderRadius: "10px",
              boxShadow: "none",
            }}
            variant="contained"
            onClick={handleConfirmClose}
          >
            Confirm
          </Button>
        </Stack>
      </Dialog>

      <Box sx={typeFilterContainer}>
        <BodyText fontSize="16px">Filter by: </BodyText>
        {types.map((type, index) => (
          <TypeTag type={type} key={index} />
        ))}
        <Hoverable onClick={handleAddClick} sx={addMoreFiltersStyle}>
          {types.length === 0 ? (
            <AddRoundedIcon
              sx={{
                color: "primary.dark",
                "&:hover": { color: "text.primary" },
              }}
            />
          ) : (
            <IconButton size="small">
              <BorderColorRoundedIcon
                sx={{
                  color: "primary.dark",
                  "&:hover": { color: "text.primary" },
                  fontSize: "20px",
                }}
              />
            </IconButton>
          )}
        </Hoverable>
      </Box>
    </>
  );
};
