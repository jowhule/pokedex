import { LearnMethodNames, LevelUpRowInfoType } from "../../types";
import { Order } from "../types";

export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof LevelUpRowInfoType
  ) => void;
  order: Order;
  orderBy: string;
  method: LearnMethodNames;
}
