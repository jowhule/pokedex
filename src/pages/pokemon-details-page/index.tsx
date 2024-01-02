import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  pokemonDataDefault,
  pokemonFormDefault,
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
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  capitalise,
  capitaliseDash,
  getDataPromises,
  removeDash,
} from "../../utils/helpers";
import { pokemonTypesContainer } from "../pokedex-display-page/pokedex-display/pokemon-card/style";
import { TypeTag } from "../../components/pokemon-information/type-tag";
import { BodyText, StatTitleText } from "../../utils/styledComponents";
import { StatBars } from "../../components/pokemon-information/stat-bars";
import { primaryTextColour } from "../../utils/colours";
import { EffortValueTag } from "../../components/pokemon-information/effort-value-tag";
import {
  detailsMainInfoContainer,
  gigantamaxButtonStyle,
  pokemonDetailsBgWrapper,
  pokemonDetailsSpriteStyle,
} from "./style";
import { TabsPanel } from "./tabs-panel";
import { Abilities } from "../../components/pokemon-information/abilities";
import { abilitiesContainerStyle } from "../../components/pokemon-information/abilities/style";

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
  const [gigaForm, setGigaForm] =
    useState<PokemonFormResponseType>(pokemonFormDefault);

  const [formNames, setFormNames] = useState<string[]>([]);
  const [showGigaForm, setShowGigaForm] = useState<boolean>(false);

  const hangleGigaChange = () => {
    setShowGigaForm(!showGigaForm);
  };

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
          if (formHolder[parseInt(key)].form_name === "gmax") {
            setGigaForm(formHolder[parseInt(key)]);
            const gigaImg = new Image();
            gigaImg.src = gigaForm.sprites.front_default;
          } else {
            forms.push(formHolder[parseInt(key)]);
          }
        });
        setFormsData(forms);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [varietiesData]);

  useEffect(() => {
    setShowGigaForm(false);
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
                src={
                  showGigaForm
                    ? gigaForm.sprites.front_default
                    : activePokemonData.sprites.front_default
                }
                sx={pokemonDetailsSpriteStyle}
              />
              {activePokemonData.is_default && gigaForm.id > 0 && (
                <Button onClick={hangleGigaChange} sx={gigantamaxButtonStyle}>
                  {showGigaForm ? "Revert" : "Dynamax"}
                </Button>
              )}

              <Box display="flex" flex="1" flexDirection="column" m="30px auto">
                <Typography
                  textAlign="center"
                  fontWeight="bold"
                  color={primaryTextColour}
                  fontSize="22px"
                >
                  {capitalise(activePokemonData?.species.name)}
                </Typography>
                <Box sx={{ ...pokemonTypesContainer, marginBottom: "0" }}>
                  {activePokemonData.types.map((type, index) => (
                    <TypeTag type={type.type.name} key={index} />
                  ))}
                </Box>

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
                        {insertDecimal(activePokemonData.weight)} kg
                      </BodyText>
                    </Box>
                  </Stack>
                </Box>

                <StatTitleText fontSize="16px">EV Yield</StatTitleText>
                <Box display="flex" justifyContent="center" gap="10px">
                  {activePokemonData.stats.map((statInfo, index) => (
                    <EffortValueTag
                      stat={statInfo.stat.name}
                      value={statInfo.effort}
                      key={index}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            <StatBars statsData={activePokemonData.stats} />
          </Box>
          <Stack>
            {activePokemonData.moves.map((move) => (
              <BodyText>
                {capitalise(removeDash(move.move.name), true)}
              </BodyText>
            ))}
          </Stack>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
