import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  PokemonDexResponseType,
  PokemonPokedexEntryType,
} from "../../services/apiRequestsTypes";
import { pageContainerStyle } from "../style";
import {
  requestLinks,
  sendGenericAPIRequest,
} from "../../services/apiRequests";
import { PokedexDisplay } from "../../components/pokedex-display";
import { MoreInfoSlide } from "../../components/more-info-slide";
import { useNavigate, useParams } from "react-router-dom";

export const GenDex: React.FC = () => {
  const { dexName } = useParams();
  const navigate = useNavigate();
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [genDex, setGenDex] = useState<PokemonPokedexEntryType[]>([]);
  const [activePokemonName, setActivePokemonName] = useState<string>("");

  // pokemon list finished fetching from api
  useEffect(() => {
    if (genDex.length !== 0) setHasLoaded(true);
  }, [genDex]);

  // get all pokemon names
  useEffect(() => {
    sendGenericAPIRequest<PokemonDexResponseType>(
      requestLinks.getPokedex(dexName ?? "")
    ).then((data) => {
      if (data?.name) {
        setGenDex(data.pokemon_entries);
      } else {
        navigate("/");
      }
    });
  }, [dexName, navigate]);

  return (
    <Box sx={pageContainerStyle}>
      <Box width="100%">
        <PokedexDisplay
          pokedexList={genDex}
          displaySearch
          listLoaded={hasLoaded}
          setActivePokemonName={setActivePokemonName}
        />
      </Box>
      <Box>
        <MoreInfoSlide
          activePokemonName={activePokemonName}
          setActivePokemonName={setActivePokemonName}
        />
      </Box>
    </Box>
  );
};
