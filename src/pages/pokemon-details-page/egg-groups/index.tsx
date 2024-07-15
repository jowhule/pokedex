import { Box, Stack } from "@mui/material";
import React from "react";
import { BodyText, StatTitleText } from "../../../utils/styledComponents";
import { capitaliseDash, removeDash } from "../../../utils/helpers";
import { NameUrlType } from "../../../services/apiRequestsTypes";
import { CustomCard } from "../../../components/custom-card/CustomCard";

type EggGroupsType = {
  groupData: NameUrlType[];
};

export const EggGroups: React.FC<EggGroupsType> = ({ groupData }) => {
  return (
    <Stack width="100%" height="100%">
      <StatTitleText>Egg Group</StatTitleText>
      <CustomCard dark>
        <Box display="flex" gap="4px">
          {groupData.map((grp, i) => (
            <BodyText key={i}>
              {i !== 0 && (
                <>
                  {i === groupData.length - 1
                    ? groupData.length !== 0 && " and "
                    : ", "}
                </>
              )}
              {removeDash(capitaliseDash(grp.name))}
            </BodyText>
          ))}
        </Box>
      </CustomCard>
    </Stack>
  );
};
