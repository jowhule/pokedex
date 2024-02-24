import { Box } from "@mui/material";
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
  const handleChange = (newValue: number) => {
    setActive(newValue);
  };

  return (
    <Box sx={detailsTabsContainer}>
      <Box sx={{ display: "flex", gap: "8px" }}>
        {formNames.map((name, i) => (
          <Hoverable
            key={i}
            sx={i === active ? activeDetailsPanelStyle : detailsTabPanelStyle}
            onClick={() => handleChange(i)}
          >
            <BodyText
              fontWeight={i === active ? "bold" : ""}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              {name}
            </BodyText>
          </Hoverable>
        ))}
      </Box>
    </Box>
  );
};
