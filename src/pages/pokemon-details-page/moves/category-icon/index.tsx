import { Box } from "@mui/material";
import { capitalise } from "../../../../utils/helpers";
import { BodyText } from "../../../../utils/styledComponents";
import physicalMoveIcon from "../../../../assets/physical_move_icon.png";
import specialMoveIcon from "../../../../assets/special_move_icon.png";
import statusMoveIcon from "../../../../assets/status_move_icon.png";

export type MoveCategories = "physical" | "special" | "status";

interface CategoryIconProps {
  category: MoveCategories;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  return (
    <Box>
      <BodyText fontSize="14px">{capitalise(category)} move</BodyText>
      <Box
        component="img"
        src={
          category === "physical"
            ? physicalMoveIcon
            : category === "special"
            ? specialMoveIcon
            : statusMoveIcon
        }
        maxHeight="20px"
      />
    </Box>
  );
};
