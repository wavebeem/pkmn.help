import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { TabBar } from "./TabBar";

export function OffenseTabs(): ReactNode {
  const { t } = useTranslation();
  return (
    <TabBar>
      <NavLink to="/offense/" end>
        {t("offense.mode.combination")}
      </NavLink>
      <NavLink to="/offense/single/" end>
        {t("offense.mode.single")}
      </NavLink>
    </TabBar>
  );
}
