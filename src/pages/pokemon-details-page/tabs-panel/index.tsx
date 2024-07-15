import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BodyText, Hoverable } from "../../../utils/styledComponents";
import {
  activeDetailsPanelStyle,
  detailsTabPanelStyle,
  detailsTabsContainer,
} from "./style";

type TabsPanelType = {
  formNames: string[];
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

export const TabsPanel: React.FC<TabsPanelType> = ({
  formNames,
  active,
  setActive,
}) => {
  const theme = useTheme();
  const isSmaller = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (newValue: number) => {
    setActive(newValue);
  };

  return (
    <Box sx={detailsTabsContainer}>
      <Box sx={{ display: "flex", gap: "10px" }}>
        {formNames.map((name, i) => (
          <Hoverable
            key={i}
            sx={[
              i === active ? activeDetailsPanelStyle : detailsTabPanelStyle,
              isSmaller && { flex: 1 },
            ]}
            onClick={() => handleChange(i)}
          >
            <BodyText
              fontWeight={i === active ? "bold" : ""}
              sx={[
                { "&:hover": { cursor: "pointer" } },
                isSmaller && { fontSize: "15px" },
              ]}
            >
              {name}
            </BodyText>
          </Hoverable>
        ))}
      </Box>
    </Box>
  );
};
