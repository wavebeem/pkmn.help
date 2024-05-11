import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styles from "./DefenseTabs.module.css";
import { Flex } from "./Flex";

export function DefenseTabs() {
  const { t } = useTranslation();
  const className = classNames(styles.tab, "active-darken", "focus-tab");
  return (
    <Flex wrap gap="medium">
      <NavLink to="/defense/" end className={className}>
        {t("defense.mode.solo")}
      </NavLink>
      <NavLink to="/defense/team/" end className={className}>
        {t("defense.mode.team")}
      </NavLink>
    </Flex>
  );
}
