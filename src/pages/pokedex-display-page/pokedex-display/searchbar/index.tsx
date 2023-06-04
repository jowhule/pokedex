import React from "react";
import { CustomCard } from "../../../../components/custom-card/CustomCard";
import { Input } from "@mui/material";
import { Hoverable } from "../../../../utils/styledComponents";

import {
  clearButtonContainer,
  clearButtonStyle,
  searchBarStyle,
} from "./style";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type SearchbarProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};
export const Searchbar: React.FC<SearchbarProps> = ({ input, setInput }) => {
  /**
   * update search input
   * @param e input event
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value;
    setInput(input.toLowerCase());
  };

  const handleClearSearch = () => {
    setInput("");
  };

  return (
    <>
      <CustomCard sx={searchBarStyle}>
        <Input
          fullWidth
          placeholder="Search"
          value={input}
          disableUnderline
          onChange={handleSearchChange}
          sx={{ height: "100%", padding: "0 20px" }}
        />
        <>
          {input && (
            <Hoverable onClick={handleClearSearch} sx={clearButtonContainer}>
              <CloseRoundedIcon sx={clearButtonStyle} />
            </Hoverable>
          )}
        </>
      </CustomCard>
    </>
  );
};
