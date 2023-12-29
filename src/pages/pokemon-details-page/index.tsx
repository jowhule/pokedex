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
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import {
  capitalise,
  capitaliseDash,
  getDataPromises,
} from "../../utils/helpers";
import { pokemonTypesContainer } from "../pokedex-display-page/pokedex-display/pokemon-card/style";
import { TypeTag } from "../../components/pokemon-information/type-tag";
import { BodyText, StatTitleText } from "../../utils/styledComponents";
import { AbilityTag } from "../../components/pokemon-information/ability-tag";
import {
  abilitiesContainer,
  statsContainer,
} from "../pokedex-display-page/more-info-slide/style";
import { StatBar } from "../../components/pokemon-information/base-stat-bar";
import { primaryTextColour } from "../../utils/colours";
import { EffortValueTag } from "../../components/pokemon-information/effort-value-tag";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const PokemonDetailsPage: React.FC = () => {
  const { pokeName } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [active, setActive] = useState<number>(0);
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActive(newValue);
  };

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
            (pokeName === "eevee" && i === 1)
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
          } else {
            forms.push(formHolder[parseInt(key)]);
          }
        });
        setFormsData(forms);
      });
    }
  }, [varietiesData]);

  useEffect(() => {
    setShowGigaForm(false);
  }, [active]);

  // get proper form name
  useEffect(() => {
    const names: string[] = [];

    for (const data of formsData) {
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
    console.log(formsData);
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
        <Box maxWidth="1200px" m="0 auto">
          <>
            {formNames.length > 1 && (
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={active}
                  onChange={handleChange}
                  textColor="inherit"
                >
                  {formNames.map((name, i) => (
                    <Tab label={name} key={i} />
                  ))}
                </Tabs>
              </Box>
            )}
          </>
          {varietiesData.map((pokemon, i) => {
            // preload sprites
            const img = new Image();
            img.src = pokemon.sprites.front_default;
            let gigaImg = null;
            if (pokemon.is_default && gigaForm.id > 0) {
              gigaImg = new Image();
              gigaImg.src = gigaForm.sprites.front_default;
            }
            return (
              <TabPanel value={active} index={i} key={i} dir={theme.direction}>
                <Box bgcolor="white" p="20px 40px" borderRadius="20px">
                  <Box
                    display="flex"
                    gap="30px"
                    width="100%"
                    maxWidth="1000px"
                    m="0 auto"
                  >
                    <Box flex="1">
                      <Box
                        component="img"
                        alt={`${formNames[i]}'s sprite`}
                        src={
                          showGigaForm
                            ? gigaForm.sprites.front_default
                            : pokemon.sprites.front_default
                        }
                        sx={{
                          imageRendering: "pixelated",
                          width: "100%",
                        }}
                      ></Box>
                      {pokemon.is_default && gigaImg && (
                        <Button
                          onClick={hangleGigaChange}
                          sx={{
                            width: "140px",
                            bgcolor: "grey",
                            p: "10px 50px",
                          }}
                        >
                          {showGigaForm ? "Revert" : "Gigatamax"}
                        </Button>
                      )}
                    </Box>
                    <Box
                      display="flex"
                      flex="1"
                      flexDirection="column"
                      m="30px auto"
                    >
                      <Typography
                        textAlign="center"
                        fontWeight="bold"
                        color={primaryTextColour}
                        fontSize="22px"
                      >
                        {capitalise(pokemon?.species.name)}
                      </Typography>
                      <Box sx={{ ...pokemonTypesContainer, marginBottom: "0" }}>
                        {pokemon.types.map((type, index) => (
                          <TypeTag type={type.type.name} key={index} />
                        ))}
                      </Box>

                      <StatTitleText fontSize="16px">Abilities</StatTitleText>
                      <Box sx={abilitiesContainer}>
                        {pokemon.abilities.map((ability, index) => (
                          <AbilityTag abilityInfo={ability} key={index} />
                        ))}
                      </Box>

                      <Box display="flex" gap="15px">
                        <Stack flex="1">
                          <StatTitleText fontSize="16px">Height</StatTitleText>
                          <Box sx={abilitiesContainer}>
                            <BodyText>
                              {insertDecimal(pokemon.height)} m
                            </BodyText>
                          </Box>
                        </Stack>
                        <Stack flex="1">
                          <StatTitleText fontSize="16px">Weight</StatTitleText>
                          <Box sx={abilitiesContainer}>
                            <BodyText>
                              {insertDecimal(pokemon.weight)} kg
                            </BodyText>
                          </Box>
                        </Stack>
                      </Box>

                      <StatTitleText fontSize="16px">EV Yield</StatTitleText>
                      <Box display="flex" justifyContent="center" gap="10px">
                        {pokemon.stats.map((statInfo, index) => (
                          <EffortValueTag
                            stat={statInfo.stat.name}
                            value={statInfo.effort}
                            key={index}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  <StatTitleText fontSize="16px">Base Stats</StatTitleText>
                  <Box sx={statsContainer}>
                    {pokemon.stats.map((statInfo, index) => (
                      <StatBar
                        stat={statInfo.stat.name}
                        value={statInfo.base_stat}
                        key={index}
                      />
                    ))}
                  </Box>
                </Box>
              </TabPanel>
            );
          })}
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
