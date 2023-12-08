import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  pokemonDataDefault,
  pokemonSpeciesDefault,
} from "../../utils/defaults";
import {
  PokemonDataResponseType,
  PokemonSpeciesResponseType,
} from "../../services/apiRequestsTypes";
import {
  requestLinks,
  sendGenericAPIRequest,
} from "../../services/apiRequests";
import { Box, Typography } from "@mui/material";
import { BodyText } from "../../utils/styledComponents";

export const PokemonDetailsPage: React.FC = () => {
  const { pokeName } = useParams();
  const navigate = useNavigate();

  const [pokemonData, setPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);

  const [speciesData, setSpeciesData] = useState<PokemonSpeciesResponseType>(
    pokemonSpeciesDefault
  );

  const [flavorText, setFlavorText] = useState<string>("");

  // get initial pokemon data
  useEffect(() => {
    if (pokeName)
      sendGenericAPIRequest<PokemonDataResponseType>(
        requestLinks.getData(pokeName)
      ).then((data) => {
        if (data) {
          setPokemonData(data);
        } else {
          navigate("/404");
        }
      });
  }, [navigate, pokeName]);

  // get species data after initial pokemon data received
  useEffect(() => {
    if (pokemonData.id) {
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        pokemonData.species.url
      ).then((data) => {
        if (data) setSpeciesData(data);
      });
    }
  }, [pokemonData]);

  // get all of data
  useEffect(() => {
    if (speciesData?.id) {
      for (const flavor of speciesData.flavor_text_entries) {
        if (flavor.language.name === "en") {
          setFlavorText(flavor.flavor_text);
        }
      }
    }
  }, [speciesData]);

  return (
    <>
      <Box>
        <Typography>{pokeName}</Typography>
        <BodyText>{flavorText}</BodyText>
      </Box>
    </>
  );
};
