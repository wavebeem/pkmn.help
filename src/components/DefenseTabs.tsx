import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { TabBar } from "./TabBar";

export function DefenseTabs(): ReactNode {
  const { t } = useTranslation();
  return (
    <TabBar>
      <NavLink to="/defense/" end>
        {t("defense.mode.solo")}
      </NavLink>
      <NavLink to="/defense/team/" end>
        {t("defense.mode.team")}
      </NavLink>
    </TabBar>
  );
}
