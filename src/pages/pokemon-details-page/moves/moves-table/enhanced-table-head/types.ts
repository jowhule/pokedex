import { LevelUpRowInfoType } from "../../types";
import { Order } from "../types";

export interface HeadCell {
  id: keyof LevelUpRowInfoType;
  label: string;
  center: boolean;
}

export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof LevelUpRowInfoType
  ) => void;
  order: Order;
  orderBy: string;
  method: string;
}
