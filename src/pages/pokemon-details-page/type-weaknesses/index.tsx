import React, { useEffect, useState } from "react";
import {
  BodyText,
  PokemonInfoBox,
  StatTitleText,
} from "../../../utils/styledComponents";
import { Box, CircularProgress, Stack, Tooltip } from "@mui/material";
import {
  PokemonTypeResponseType,
  PokemonTypeType,
} from "../../../services/apiRequestsTypes";
import { sendGenericAPIRequest } from "../../../services/apiRequests";
import { typeEffectivenessDefault } from "../../../utils/defaults";
import { typeWeaknessContainer, weaknessesContainer } from "./style ";
import typeIcons from "../../../assets/type-icons";
import { capitalise } from "../../../utils/helpers";

type TypeWeaknessesType = {
  types: PokemonTypeType[];
};

const decimalToFraction: Record<number, string> = {
  0.5: "½",
  0.25: "¼",
};

const effectivenessColor: Record<number, string> = {
  0: "grey",
  0.25: "#630000",
  0.5: "#f00000",
  2: "#346604",
  4: "#6bc414",
};

export const TypeWeaknesses: React.FC<TypeWeaknessesType> = ({ types }) => {
  const [weaknesses, setWeaknesses] = useState<Record<string, number>>({
    ...typeEffectivenessDefault,
    updated: 0,
  });

  useEffect(() => {
    setWeaknesses({ ...typeEffectivenessDefault, updated: 0 });
  }, [types]);

  useEffect(() => {
    if (!weaknesses["updated"]) {
      const dmgRelationsPromises: Promise<void | PokemonTypeResponseType>[] =
        [];
      const dmgRelationsHolder: PokemonTypeResponseType[] = [];
      if (!types) return;
      for (const type of types) {
        dmgRelationsPromises.push(
          sendGenericAPIRequest<PokemonTypeResponseType>(type.type.url).then(
            (data) => {
              if (data) dmgRelationsHolder.push(data);
            }
          )
        );
      }
      Promise.allSettled(dmgRelationsPromises).then(() => {
        const weaknessesTemp = { ...weaknesses };
        for (const type of dmgRelationsHolder) {
          for (const superEff of type.damage_relations.double_damage_from) {
            weaknessesTemp[superEff.name] *= 2;
          }
          for (const notEff of type.damage_relations.half_damage_from) {
            weaknessesTemp[notEff.name] *= 0.5;
          }
          for (const notEff of type.damage_relations.no_damage_from) {
            weaknessesTemp[notEff.name] *= 0;
          }
        }
        setWeaknesses({ ...weaknessesTemp, updated: 1 });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weaknesses]);

  return (
    <Stack width="100%" height="100%">
      <StatTitleText>Weaknesses</StatTitleText>
      <PokemonInfoBox sx={weaknessesContainer}>
        {weaknesses["updated"] ? (
          <>
            {Object.keys(weaknesses)
              .slice(0, 18)
              .map((type, i) => (
                <Box sx={typeWeaknessContainer} key={i}>
                  <Tooltip title={`${capitalise(type)}`}>
                    <Box
                      component="img"
                      src={typeIcons[type]}
                      alt={`${type} icon`}
                      sx={{ width: "28px" }}
                    />
                  </Tooltip>
                  <BodyText
                    m="0 5px"
                    color={`${effectivenessColor[weaknesses[type]]} !important`}
                  >
                    x {decimalToFraction[weaknesses[type]] ?? weaknesses[type]}
                  </BodyText>
                </Box>
              ))}
          </>
        ) : (
          <CircularProgress />
        )}
      </PokemonInfoBox>
    </Stack>
  );
};
