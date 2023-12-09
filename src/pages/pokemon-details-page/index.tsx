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
  AppBar,
  Box,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { getDataPromises, getIdFromLink } from "../../utils/helpers";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const PokemonDetailsPage: React.FC = () => {
  const { pokeName } = useParams();
  const navigate = useNavigate();

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActive(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setActive(index);
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

  // get data of possible varieties
  useEffect(() => {
    if (pokemonSpecies.id) {
      if (pokemonSpecies.varieties.length === 1) {
        setVarietiesData([currPokemonData]);
      } else {
        const varietiesDataPromises: Promise<void | PokemonDataResponseType>[] =
          [];
        const dataHolder: Record<number, PokemonDataResponseType> = {};

        const formsDataPromises: Promise<void | PokemonFormResponseType>[] = [];
        const formHolder: Record<number, PokemonFormResponseType> = {};

        pokemonSpecies.varieties.forEach((vari, i) => {
          if (vari.pokemon.name === pokeName) {
            dataHolder[i] = currPokemonData;
          } else {
            getDataPromises(
              varietiesDataPromises,
              dataHolder,
              vari.pokemon.url,
              i
            );
          }
          getDataPromises(
            formsDataPromises,
            formHolder,
            requestLinks.getForm(parseInt(getIdFromLink(vari.pokemon.url))),
            i
          );
        });

        Promise.allSettled(varietiesDataPromises).then(() =>
          setVarietiesData(Object.values(dataHolder))
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonSpecies]);

  // after varities have been received
  useEffect(() => {
    if (varietiesData.length > 0) {
      setHasLoaded(true);
    }
  }, [varietiesData]);

  return (
    <>
      {hasLoaded ? (
        <Box maxWidth="1200px" m="0 auto">
          <Typography>{pokeName}</Typography>

          <AppBar position="static">
            <Tabs
              value={active}
              onChange={handleChange}
              textColor="inherit"
              variant="fullWidth"
            >
              {varietiesData.map((data, i) => (
                <Tab label={data.name} key={i} />
              ))}
            </Tabs>
          </AppBar>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
