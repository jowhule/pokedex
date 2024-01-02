import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  pokemonDataDefault,
  pokemonSpeciesDefault,
} from "../../utils/defaults";
import {
  PokemonDataResponseType,
  PokemonFormResponseType,
  PokemonSpeciesResponseType,
} from "../../services/apiRequestsTypes";
import {
  requestLinks,
  sendGenericAPIRequest,
} from "../../services/apiRequests";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import {
  capitalise,
  capitaliseDash,
  getDataPromises,
} from "../../utils/helpers";
import { BodyText, StatTitleText } from "../../utils/styledComponents";
import { StatBars } from "../../components/pokemon-information/stat-bars";
import { primaryTextColour } from "../../utils/colours";
import {
  detailsMainInfoContainer,
  pokemonDetailsBgWrapper,
  pokemonDetailsSpriteStyle,
} from "./style";
import { TabsPanel } from "./tabs-panel";
import { Abilities } from "../../components/pokemon-information/abilities";
import { abilitiesContainerStyle } from "../../components/pokemon-information/abilities/style";
import { Types } from "../../components/pokemon-information/types";
import { EffortValues } from "../../components/pokemon-information/effort-values";

export const PokemonDetailsPage: React.FC = () => {
  const { pokeName } = useParams();
  const navigate = useNavigate();

  const [active, setActive] = useState<number>(0);
  const [activePokemonData, setActivePokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const [currPokemonData, setCurrPokemonData] =
    useState<PokemonDataResponseType>(pokemonDataDefault);
  const [pokemonSpecies, setPokemonSpecies] =
    useState<PokemonSpeciesResponseType>(pokemonSpeciesDefault);

  const [varietiesData, setVarietiesData] = useState<PokemonDataResponseType[]>(
    []
  );
  const [formsData, setFormsData] = useState<PokemonFormResponseType[]>([]);

  const [formNames, setFormNames] = useState<string[]>([]);

  const insertDecimal = (num: number) => {
    return (num / 10).toFixed(1);
  };

  // get initial pokemon data
  useEffect(() => {
    if (pokeName)
      sendGenericAPIRequest<PokemonDataResponseType>(
        requestLinks.getData(pokeName)
      ).then((data) => {
        if (data) {
          setCurrPokemonData(data);
        } else {
          navigate("/404");
        }
      });
  }, [navigate, pokeName]);

  // get species data after initial pokemon data received
  useEffect(() => {
    if (currPokemonData.id) {
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        currPokemonData.species.url
      ).then((data) => {
        if (data) setPokemonSpecies(data);
      });
    }
  }, [currPokemonData]);

  // get data of possible varieties and their pokemon forms
  useEffect(() => {
    if (pokemonSpecies.id) {
      if (pokemonSpecies.varieties.length === 1) {
        setVarietiesData([currPokemonData]);
      } else {
        const varietiesDataPromises: Promise<void | PokemonDataResponseType>[] =
          [];
        const dataHolder: Record<string, PokemonDataResponseType> = {};
        let i = 0;
        for (const vari of pokemonSpecies.varieties) {
          const name: string = vari.pokemon.name;
          // exceptions
          if (
            (pokeName === "zygarde-50" && (i === 2 || i === 4)) ||
            (pokeName === "pikachu" && i !== 0 && i !== 16) ||
            (pokeName === "eevee" && i === 1) ||
            vari.pokemon.name.endsWith("-totem")
          ) {
            i += 1;
            continue;
          }
          if (name === pokeName) {
            dataHolder[name] = currPokemonData;
          } else {
            getDataPromises(
              varietiesDataPromises,
              dataHolder,
              vari.pokemon.url,
              name
            );
          }
          i += 1;
        }

        Promise.allSettled(varietiesDataPromises).then(() =>
          setVarietiesData(Object.values(dataHolder))
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonSpecies]);

  // get the names of the varieties
  useEffect(() => {
    if (varietiesData.length > 0) {
      const formsDataPromises: Promise<void | PokemonFormResponseType>[] = [];
      const formHolder: Record<number, PokemonFormResponseType> = {};
      varietiesData.forEach((data, i) => {
        getDataPromises(formsDataPromises, formHolder, data.forms[0].url, i);
      });

      Promise.allSettled(formsDataPromises).then(() => {
        const forms: PokemonFormResponseType[] = [];
        Object.keys(formHolder).forEach((key) => {
          forms.push(formHolder[parseInt(key)]);
        });
        setFormsData(forms);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [varietiesData]);

  useEffect(() => {
    setActivePokemonData(varietiesData[active]);
  }, [active, varietiesData]);

  // get proper form name
  useEffect(() => {
    const names: string[] = [];

    for (const data of formsData) {
      const img = new Image();
      img.src = data.sprites.front_default;

      let nameFound: boolean = false;
      for (const name of data.form_names) {
        if (name.language.name === "en") {
          names.push(name.name);
          nameFound = true;
        }
      }
      if (!nameFound) names.push(capitaliseDash(data.name));
    }

    setFormNames(names);
  }, [formsData, pokeName]);

  // after varities have been received
  useEffect(() => {
    if (formNames.length > 0) {
      setHasLoaded(true);
    }
  }, [formNames]);

  return (
    <>
      {hasLoaded ? (
        <Box maxWidth="1200px" m="0 auto" p="0 30px" boxSizing="border-box">
          <TabsPanel
            formNames={formNames}
            active={active}
            setActive={setActive}
          />

          <Box sx={pokemonDetailsBgWrapper}>
            <Box sx={detailsMainInfoContainer}>
              <Box
                flex="1"
                component="img"
                alt={`${activePokemonData.name}'s sprite`}
                src={activePokemonData.sprites.front_default}
                sx={pokemonDetailsSpriteStyle}
              />

              <Box display="flex" flex="1" flexDirection="column" m="30px auto">
                <Typography
                  textAlign="center"
                  fontWeight="bold"
                  color={primaryTextColour}
                  fontSize="22px"
                >
                  {capitalise(activePokemonData?.species.name)}
                </Typography>

                <Types typesData={activePokemonData?.types} />

                <Abilities abilitiesData={activePokemonData?.abilities} />

                <Box display="flex" gap="15px">
                  <Stack flex="1">
                    <StatTitleText fontSize="16px">Height</StatTitleText>
                    <Box sx={abilitiesContainerStyle}>
                      <BodyText>
                        {insertDecimal(activePokemonData.height)} m
                      </BodyText>
                    </Box>
                  </Stack>
                  <Stack flex="1">
                    <StatTitleText fontSize="16px">Weight</StatTitleText>
                    <Box sx={abilitiesContainerStyle}>
                      <BodyText>
                        {activePokemonData.weight >= 10000
                          ? "???.?"
                          : insertDecimal(activePokemonData.weight)}{" "}
                        kg
                      </BodyText>
                    </Box>
                  </Stack>
                </Box>

                <EffortValues statsData={activePokemonData?.stats} />
              </Box>
            </Box>

            <StatBars statsData={activePokemonData.stats} detailed />
          </Box>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
