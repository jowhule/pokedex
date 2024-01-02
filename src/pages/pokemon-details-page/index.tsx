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
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  capitalise,
  capitaliseDash,
  getDataPromises,
} from "../../utils/helpers";
import { BodyText, StatTitleText } from "../../utils/styledComponents";
import { StatBars } from "../../components/pokemon-information/stat-bars";
import {
  detailsInfoContainer,
  detailsMainInfoContainer,
  generaTextStyle,
  infoPokemonNameStyle,
  mobileDetailsMainInfoContainer,
  pokemonDetailsBgWrapper,
  pokemonDetailsSpriteStyle,
} from "./style";
import { TabsPanel } from "./tabs-panel";
import { Abilities } from "../../components/pokemon-information/abilities";
import { abilitiesContainerStyle } from "../../components/pokemon-information/abilities/style";
import { Types } from "../../components/pokemon-information/types";
import { EffortValues } from "../../components/pokemon-information/effort-values";
import { EvolutionChain } from "../../components/pokemon-information/evolution-chain";
import { CustomCard } from "../../components/custom-card/CustomCard";

export const PokemonDetailsPage: React.FC = () => {
  const { pokeName } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const pokemonGenera = (species: PokemonSpeciesResponseType): string => {
    for (const gen of species.genera) {
      if (gen?.language?.name === "en") return gen.genus;
    }
    return "";
  };

  const pokemonFlavorText = (species: PokemonSpeciesResponseType): string => {
    const texts = species.flavor_text_entries;
    for (let i = texts.length; i >= 0; i--) {
      if (texts[i]?.language?.name === "en")
        return texts[i].flavor_text.replace("", " ");
    }
    return "";
  };

  // get initial pokemon data
  useEffect(() => {
    setHasLoaded(false);
    if (pokeName)
      sendGenericAPIRequest<PokemonDataResponseType>(
        requestLinks.getData(pokeName),
        () => navigate("/404")
      ).then((data) => {
        if (data) {
          setCurrPokemonData(data);
        }
      });
  }, [navigate, pokeName]);

  // get species data after initial pokemon data received
  useEffect(() => {
    setHasLoaded(false);
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
          const name: string = vari.pokemon?.name;
          // exceptions
          if (
            (pokeName === "zygarde-50" && (i === 2 || i === 4)) ||
            (pokeName === "pikachu" && i !== 0 && i !== 16) ||
            (pokeName === "eevee" && i === 1) ||
            name.includes("-totem")
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
        if (name.language?.name === "en") {
          names.push(name.name);
          nameFound = true;
        }
      }
      if (!nameFound) names.push(capitaliseDash(data.name));
    }

    setFormNames(names);
  }, [formsData]);

  // after varities have been received
  useEffect(() => {
    if (formNames.length > 0) {
      setHasLoaded(true);
    }
  }, [formNames]);

  return (
    <>
      {hasLoaded ? (
        <Box
          maxWidth="1200px"
          m="0 auto"
          p={isMobile ? "0 15px" : "0 30px"}
          boxSizing="border-box"
        >
          <TabsPanel
            formNames={formNames}
            active={active}
            setActive={setActive}
          />

          <CustomCard sx={pokemonDetailsBgWrapper}>
            <Box
              sx={
                isMobile
                  ? mobileDetailsMainInfoContainer
                  : detailsMainInfoContainer
              }
            >
              <Box
                component="img"
                alt={`${activePokemonData.name}'s sprite`}
                src={activePokemonData.sprites.front_default}
                sx={pokemonDetailsSpriteStyle}
              />

              <Box sx={detailsInfoContainer}>
                <Box
                  display="flex"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                  gap="10px"
                >
                  <Typography sx={infoPokemonNameStyle}>
                    {capitalise(activePokemonData?.species.name)}
                  </Typography>
                  <BodyText
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ opacity: "0.6" }}
                  >
                    # {currPokemonData.id}
                  </BodyText>
                </Box>

                <Types typesData={activePokemonData?.types} />

                <BodyText sx={generaTextStyle}>
                  {pokemonGenera(pokemonSpecies)}
                </BodyText>

                <BodyText textAlign="center">
                  {pokemonFlavorText(pokemonSpecies)}
                </BodyText>

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

            <StatBars
              statsData={activePokemonData.stats}
              detailed={!isMobile}
            />
          </CustomCard>
          <CustomCard sx={{ maxWidth: "700px", m: "0 auto" }}>
            <EvolutionChain pokemonData={currPokemonData} />
          </CustomCard>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" width="100%">
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
