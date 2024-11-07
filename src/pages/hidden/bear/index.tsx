import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CustomCard } from "../../../components/custom-card/CustomCard";
import { EvolutionChain } from "../../../components/pokemon-information/evolution-chain";
import { TypeWeaknesses } from "../../pokemon-details-page/type-weaknesses";
import { capitalise, capitaliseDash, removeDash } from "../../../utils/helpers";
import {
  BodyText,
  Hoverable,
  SecondaryText,
  StatTitleText,
} from "../../../utils/styledComponents";
import { EggGroups } from "../../pokemon-details-page/egg-groups";
import { HatchTime } from "../../pokemon-details-page/hatch-time";
import { GenderDisplay } from "../../pokemon-details-page/gender-display";
import { StatBars } from "../../../components/pokemon-information/stat-bars";
import { EffortValues } from "../../../components/pokemon-information/effort-values";
import { Types } from "../../../components/pokemon-information/types";
import { TabsPanel } from "../../pokemon-details-page/tabs-panel";
import React, { useEffect, useState } from "react";
import { PokemonDataResponseType } from "../../../services/apiRequestsTypes";
import { useLoadPageContext } from "../../../components/context-providers/load-provider";
import {
  abilities,
  about,
  currPokemonData,
  formNames,
  formTypes,
  parsedMovesData,
  pokemonSpecies,
} from "./data";
import {
  categoryLegendContainer,
  movesTablesGridContainer,
  movesTitleStyle,
} from "../../pokemon-details-page/moves/style";
import { CategoryIcon } from "../../pokemon-details-page/moves/category-icon";
import {
  detailsInfoContainer,
  detailsMainInfoContainer,
  evoDetailsContainer,
  generaTextStyle,
  infoPokemonNameStyle,
  mobileDetailsMainInfoContainer,
  pokemonDetailsBgWrapper,
  pokemonDetailsSpriteStyle,
} from "../../pokemon-details-page/style";
import { MovesTable } from "../../pokemon-details-page/moves/moves-table";

export const Bear: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { loadPage, setLoadPage } = useLoadPageContext();
  const [active, setActive] = useState(0);

  const varietiesData: PokemonDataResponseType[] = [];

  const fakeApiRequest = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };

  useEffect(() => {
    fakeApiRequest().then(() => {
      setLoadPage(true);
    });
  }, [setLoadPage]);

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

                <BodyText sx={generaTextStyle}>{about.genera}</BodyText>

                <BodyText textAlign="center">{about.flavorText}</BodyText>

                {/* abilities */}
                <StatTitleText fontSize="16px">Abilities</StatTitleText>
                <CustomCard
                  dark
                  sx={{
                    flexFlow: "row wrap",
                    gap: "20px",
                    width: "100%",
                    boxSizing: "border-box",
                    p: "20px 30px",
                  }}
                >
                  {abilities.map((ability) => (
                    <Tooltip title={ability.description} arrow>
                      <Box
                        sx={{
                          height: "35px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <BodyText fontSize="16px" lineHeight="100%">
                          {ability.name}
                        </BodyText>
                        {ability.is_hidden && (
                          <SecondaryText
                            fontSize="12px"
                            sx={{ marginTop: "-1px" }}
                          >
                            hidden ability
                          </SecondaryText>
                        )}
                      </Box>
                    </Tooltip>
                  ))}
                </CustomCard>

                <Box display="flex" gap="15px" width="100%">
                  <Stack flex="1">
                    <StatTitleText fontSize="16px">Height</StatTitleText>
                    <CustomCard dark>
                      <BodyText>{0.4} m</BodyText>
                    </CustomCard>
                  </Stack>
                  <Stack flex="1">
                    <StatTitleText fontSize="16px">Weight</StatTitleText>
                    <CustomCard dark>
                      <BodyText>{10} kg</BodyText>
                    </CustomCard>
                  </Stack>
                </Box>

                <EffortValues statsData={currPokemonData?.stats} />
              </Stack>
            </Box>

            <StatBars statsData={currPokemonData?.stats} detailed={!isMobile} />

            <Grid container spacing="15px" columns={{ md: 2, xs: 1 }}>
              <Grid item xs={1}>
                <Grid container spacing="15px" columns={2}>
                  <Grid item xs={1}>
                    <GenderDisplay genderRatio={pokemonSpecies?.gender_rate} />
                  </Grid>
                  <Grid item xs={1}>
                    <Tooltip title="Bro's a mammal" arrow>
                      <Hoverable>
                        <HatchTime hatchCycle={pokemonSpecies?.hatch_counter} />
                      </Hoverable>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={1}>
                    <StatTitleText>Growth Rate</StatTitleText>
                    <CustomCard dark>
                      <Box>
                        <BodyText>
                          {removeDash(
                            capitaliseDash(pokemonSpecies?.growth_rate.name)
                          )}
                        </BodyText>
                      </Box>
                    </CustomCard>
                  </Grid>
                  <Grid item xs={1}>
                    <EggGroups groupData={pokemonSpecies?.egg_groups} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <TypeWeaknesses types={formTypes[active]} />
              </Grid>
            </Grid>
          </CustomCard>
          <CustomCard sx={evoDetailsContainer}>
            <EvolutionChain pokemonData={currPokemonData} large noEvoText />
          </CustomCard>
          <CustomCard sx={{ marginBottom: "40px" }}>
            <Box>
              <StatTitleText sx={movesTitleStyle}>Moves</StatTitleText>
              <BodyText
                m="5px auto"
                display="flex"
                gap="5px"
                justifyContent="center"
              >
                Showing moves for Pokémon
                <BodyText fontWeight="bold"> {2025}</BodyText>
              </BodyText>

              <Stack alignItems="center" textAlign="center">
                <Stack direction="row" sx={categoryLegendContainer(theme)}>
                  <CategoryIcon category="physical" />
                  <CategoryIcon category="special" />
                  <CategoryIcon category="status" />
                </Stack>
              </Stack>
            </Box>

            <Grid container spacing={2} sx={movesTablesGridContainer}>
              <Grid item>
                <Stack>
                  <MovesTable
                    method={"level-up"}
                    data={parsedMovesData["level-up"]["2025"]}
                  />
                  <MovesTable
                    method={"machine"}
                    data={parsedMovesData["machine"]["2025"]}
                  />
                </Stack>
              </Grid>
            </Grid>
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
