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
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  capitalise,
  capitaliseDash,
  getDataPromises,
  removeDash,
} from "../../utils/helpers";
import {
  BodyText,
  PokemonInfoBox,
  StatTitleText,
} from "../../utils/styledComponents";
import { StatBars } from "../../components/pokemon-information/stat-bars";
import {
  detailsInfoContainer,
  detailsMainInfoContainer,
  evoDetailsContainer,
  generaTextStyle,
  infoPokemonNameStyle,
  mobileDetailsMainInfoContainer,
  pokemonDetailsBgWrapper,
  pokemonDetailsSpriteStyle,
} from "./style";
import { TabsPanel } from "./tabs-panel";
import { Abilities } from "../../components/pokemon-information/abilities";
import { Types } from "../../components/pokemon-information/types";
import { EffortValues } from "../../components/pokemon-information/effort-values";
import { EvolutionChain } from "../../components/pokemon-information/evolution-chain";
import { CustomCard } from "../../components/custom-card/CustomCard";
import { GenderDisplay } from "./gender-display";
import { EggGroups } from "./egg-groups";
import { TypeWeaknesses } from "./type-weaknesses";
import { HatchTime } from "./hatch-time";
import { useLoadPageContext } from "../../components/context-providers/load-provider";
import { Moves } from "./moves";

export const PokemonDetailsPage: React.FC = () => {
  const { pokeName } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [active, setActive] = useState<number>(0);
  const { loadPage, setLoadPage } = useLoadPageContext();

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

  const resendData = (pokeName: string) => {
    // in case getting data fails, try get species first
    sendGenericAPIRequest<PokemonSpeciesResponseType>(
      requestLinks.getSpecies(pokeName),
      () => navigate("/404")
    ).then((data) => {
      if (data) {
        setPokemonSpecies(data);
        sendGenericAPIRequest<PokemonDataResponseType>(
          requestLinks.getData(data.id)
        ).then((data) => {
          if (data) setCurrPokemonData(data);
        });
      }
    });
  };

  useEffect(() => {
    // reset data
    setLoadPage(false);
    setCurrPokemonData(pokemonDataDefault);
    setPokemonSpecies(pokemonSpeciesDefault);
    setVarietiesData([]);
    setActive(0);
  }, [pokeName, setLoadPage]);

  // get initial pokemon data
  useEffect(() => {
    if (!loadPage && pokeName)
      sendGenericAPIRequest<PokemonDataResponseType>(
        requestLinks.getData(pokeName),
        () => resendData(pokeName)
      ).then((data) => {
        if (data) setCurrPokemonData(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadPage]);

  // get species data after initial pokemon data received
  useEffect(() => {
    if (currPokemonData?.id && !pokemonSpecies.id) {
      sendGenericAPIRequest<PokemonSpeciesResponseType>(
        currPokemonData?.species?.url
      ).then((data) => {
        if (data) setPokemonSpecies(data);
      });
    }
  }, [currPokemonData, pokemonSpecies.id]);

  // get data of possible varieties and their pokemon forms
  useEffect(() => {
    if (
      pokemonSpecies?.id &&
      currPokemonData?.id &&
      varietiesData.length === 0
    ) {
      if (pokemonSpecies.varieties.length === 1) {
        setVarietiesData([currPokemonData]);
      } else {
        const varietiesDataPromises: Promise<void | PokemonDataResponseType>[] =
          [];
        const dataHolder: Record<string, PokemonDataResponseType> = {};
        let i = 0;
        for (const vari of pokemonSpecies.varieties) {
          const name: string = vari?.pokemon?.name;
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
  }, [pokemonSpecies, currPokemonData]);

  // get the names of the varieties
  useEffect(() => {
    if (varietiesData.length > 0) {
      const formsDataPromises: Promise<void | PokemonFormResponseType>[] = [];
      const formHolder: Record<number, PokemonFormResponseType> = {};
      varietiesData.forEach((data, i) => {
        getDataPromises(formsDataPromises, formHolder, data.forms[0]?.url, i);
      });

      Promise.allSettled(formsDataPromises).then(() => {
        const forms: PokemonFormResponseType[] = [];
        Object.keys(formHolder).forEach((key) => {
          forms.push(formHolder[parseInt(key)]);
        });
        setFormsData(forms);
      });
    }
  }, [varietiesData]);

  useEffect(() => {
    setCurrPokemonData(varietiesData[active]);
  }, [active, varietiesData]);

  // get proper form name
  useEffect(() => {
    const names: string[] = [];

    for (const data of formsData) {
      const img = new Image();
      img.src = data?.sprites.front_default;

      let nameFound: boolean = false;
      for (const name of data.form_names) {
        if (name?.language?.name === "en") {
          names.push(name.name);
          nameFound = true;
        }
      }
      if (!nameFound) names.push(capitaliseDash(data?.name));
    }

    setFormNames(names);
  }, [formsData]);

  // after varities have been received
  useEffect(() => {
    if (formNames.length > 0) setLoadPage(true);
  }, [formNames, setLoadPage]);

  return (
    <>
      {loadPage ? (
        <Box
          maxWidth="1200px"
          m="0 auto"
          boxSizing="border-box"
          p={isMobile ? "0 15px" : "0 30px"}
        >
          <TabsPanel
            formNames={formNames}
            active={active}
            setActive={setActive}
          />

          <CustomCard
            sx={
              isMobile
                ? { ...pokemonDetailsBgWrapper, borderTopRightRadius: "0" }
                : pokemonDetailsBgWrapper
            }
          >
            <Box
              sx={
                isMobile
                  ? mobileDetailsMainInfoContainer
                  : detailsMainInfoContainer
              }
            >
              <Box
                component="img"
                alt={`${currPokemonData?.name}'s sprite`}
                src={currPokemonData?.sprites.front_default}
                sx={pokemonDetailsSpriteStyle}
              />

              <Stack sx={detailsInfoContainer}>
                <Box
                  display="flex"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                  gap="10px"
                >
                  <Typography sx={infoPokemonNameStyle}>
                    {capitalise(currPokemonData?.species?.name)}
                  </Typography>
                  <BodyText
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ opacity: "0.6" }}
                  >
                    #{" "}
                    {varietiesData.length > 0
                      ? varietiesData[0].id
                      : currPokemonData?.id}
                  </BodyText>
                </Box>

                <Types typesData={currPokemonData?.types} />

                <BodyText sx={generaTextStyle}>
                  {pokemonGenera(pokemonSpecies)}
                </BodyText>

                <BodyText textAlign="center">
                  {pokemonFlavorText(pokemonSpecies)}
                </BodyText>

                <Abilities abilitiesData={currPokemonData?.abilities} />

                <Box display="flex" gap="15px">
                  <Stack flex="1">
                    <StatTitleText fontSize="16px">Height</StatTitleText>
                    <PokemonInfoBox>
                      <BodyText>
                        {insertDecimal(currPokemonData?.height)} m
                      </BodyText>
                    </PokemonInfoBox>
                  </Stack>
                  <Stack flex="1">
                    <StatTitleText fontSize="16px">Weight</StatTitleText>
                    <PokemonInfoBox>
                      <BodyText>
                        {currPokemonData?.weight >= 10000
                          ? "???.?"
                          : insertDecimal(currPokemonData?.weight)}{" "}
                        kg
                      </BodyText>
                    </PokemonInfoBox>
                  </Stack>
                </Box>

                <EffortValues statsData={currPokemonData?.stats} />
              </Stack>
            </Box>

            <StatBars statsData={currPokemonData?.stats} detailed={!isMobile} />

            <Grid container spacing="15px" columns={{ md: 2, xs: 1 }}>
              <Grid item xs={1}>
                <Grid container spacing="15px" columns={2}>
                  <Grid display="flex" item xs={1}>
                    <GenderDisplay genderRatio={pokemonSpecies?.gender_rate} />
                  </Grid>
                  <Grid item xs={1}>
                    <HatchTime hatchCycle={pokemonSpecies?.hatch_counter} />
                  </Grid>
                  <Grid item xs={1}>
                    <StatTitleText>Growth Rate</StatTitleText>
                    <PokemonInfoBox>
                      <BodyText>
                        {removeDash(
                          capitaliseDash(pokemonSpecies?.growth_rate.name)
                        )}
                      </BodyText>
                    </PokemonInfoBox>
                  </Grid>
                  <Grid item xs={1}>
                    <EggGroups groupData={pokemonSpecies?.egg_groups} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <TypeWeaknesses types={formsData[active]?.types} />
              </Grid>
            </Grid>
          </CustomCard>
          <CustomCard sx={evoDetailsContainer}>
            <EvolutionChain pokemonData={currPokemonData} large noEvoText />
          </CustomCard>
          <CustomCard>
            <Moves data={currPokemonData.moves ?? []} />
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
