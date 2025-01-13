import { CHFlex } from "@/components/CFlex";
import DashboardWebStyles from "./DashboardWeb.module.css";
interface ColumnTitlesWebProps {
  columns: string[];
}

export const ColumnTitlesWeb: React.FC<ColumnTitlesWebProps> = ({
  columns,
}) => (
  <CHFlex sx={{ justifyContent: "space-between" }}>
    {columns.map((column, index) => (
      <p key={index} className={DashboardWebStyles.columnTitle}>
        {column}
      </p>
    ))}
  </CHFlex>
);
ColumnTitlesWeb.displayName = "ColumnTitlesWeb";
