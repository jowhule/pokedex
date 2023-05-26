import React, { useEffect, useState } from "react";
import { CustomCard } from "../CustomCard";
import { Box, CircularProgress, Grid, Input } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonCard } from "../../pages/home-page/pokemon-card";
import { PokemonNameResponseType } from "../../services/apiRequestsTypes";
import { searchBarStyle } from "./style";

const POKEMON_PER_LOAD = 30;

type PokedexDisplayProps = {
  pokedexList: PokemonNameResponseType[];
  displaySearch?: boolean;
  listLoaded: boolean;
};
export const PokedexDisplay: React.FC<PokedexDisplayProps> = ({
  pokedexList,
  displaySearch,
  listLoaded,
}) => {
  const [displayLimit, setDisplayLimit] = useState<number>(POKEMON_PER_LOAD);

  const [searchInput, setSearchInput] = useState<string>("");
  const [displayList, setDisplayList] = useState<Record<string, string>>({});
  const [hasMoreToLoad, setHasMoreToLoad] = useState<boolean>(true);

  // call to trigger adding more pokemon to display
  const handleNext = () => {
    setDisplayLimit(displayLimit + 1);
  };

  // update search field input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // add to display list
  useEffect(() => {
    // if not 30 load -> go thru all names until 30 is loaded
    // need to update curr display limit to where the 30th was found
    const lenCurrDisplayList = Object.keys(displayList).length;

    if (pokedexList.length !== 0 && lenCurrDisplayList < displayLimit) {
      const nextSearchPage: Record<string, string> = {};
      let currPokemon = lenCurrDisplayList;
      let numAdded = 0;
      while (numAdded < POKEMON_PER_LOAD && currPokemon < pokedexList.length) {
        if (!pokedexList[currPokemon]) break;
        const { name, url } = pokedexList[currPokemon];
        if (name.includes(searchInput) && !displayList[name]) {
          nextSearchPage[name] = url;
          numAdded += 1;
        }
        currPokemon += 1;
      }

      if (numAdded < POKEMON_PER_LOAD) {
        setHasMoreToLoad(false);
      }

      setDisplayList({ ...displayList, ...nextSearchPage });
    }
  }, [pokedexList, searchInput, displayList, displayLimit]);

  useEffect(() => {
    setDisplayLimit(POKEMON_PER_LOAD);
    setDisplayList({});
    setHasMoreToLoad(true);
  }, [searchInput]);

  useEffect(() => {
    const lenDisplayList = Object.keys(displayList).length;

    if (lenDisplayList > 0) setDisplayLimit(lenDisplayList);
  }, [displayList]);

  return (
    <>
      <CustomCard sx={searchBarStyle}>
        <Input
          fullWidth
          placeholder="Search"
          disableUnderline
          value={searchInput}
          onChange={handleSearchChange}
          sx={{ height: "100%", padding: "0 20px" }}
        ></Input>
      </CustomCard>
      {listLoaded ? (
        <InfiniteScroll
          dataLength={displayLimit}
          next={handleNext}
          hasMore={hasMoreToLoad}
          scrollThreshold={0.9}
          loader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "50px",
              }}
            >
              <CircularProgress />
            </Box>
          }
          style={{ overflow: "hidden" }}
        >
          <Grid container columns={12} spacing="15px" marginTop="50px">
            {Array.from(pokedexList).map((pokemon, index) => (
              <PokemonCard
                pokemonUrl={pokemon.url}
                inDisplayList={displayList[pokemon.name] ? true : false}
                key={index}
              ></PokemonCard>
            ))}
          </Grid>
        </InfiniteScroll>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
