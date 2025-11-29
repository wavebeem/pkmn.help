import { MouseEvent, ReactNode, useCallback } from "react";
import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";

export type PageNavProps = {
  hasUpdate: boolean;
  closeMenu: () => void;
};

export function PageNav({ hasUpdate, closeMenu }: PageNavProps): ReactNode {
  const tabClass = clsx(styles.tab, "active-darken-background focus-header");

  const { t } = useTranslation();

  const onNavLinkClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.getAttribute("aria-current") === "page") {
      closeMenu();
    }
  }, []);

  return (
    <nav className={styles.tabBar}>
      <span className={styles.tabSection}>{t("navigation.offense")}</span>
      <NavLink
        onClick={onNavLinkClick}
        className={tabClass}
        end
        to="/offense/combination/"
      >
        {t("offense.mode.combination")}
      </NavLink>
      <NavLink
        onClick={onNavLinkClick}
        className={tabClass}
        end
        to="/offense/single/"
      >
        {t("offense.mode.single")}
      </NavLink>
      <span className={styles.tabSection}>{t("navigation.defense")}</span>
      <NavLink
        onClick={onNavLinkClick}
        className={tabClass}
        end
        to="/defense/solo/"
      >
        {t("defense.mode.solo")}
      </NavLink>
      <NavLink
        onClick={onNavLinkClick}
        className={tabClass}
        end
        to="/defense/team/"
      >
        {t("defense.mode.team")}
      </NavLink>
      <span className={styles.tabSection}>{t("navigation.other")}</span>
      <NavLink onClick={onNavLinkClick} className={tabClass} end to="/pokedex/">
        {t("navigation.pokedex")}
      </NavLink>
      <NavLink
        onClick={onNavLinkClick}
        className={tabClass}
        end
        to="/settings/"
      >
        {t("navigation.settings")}
      </NavLink>
      <NavLink
        onClick={onNavLinkClick}
        className={clsx(tabClass, hasUpdate && styles.pleaseUpdate)}
        end
        to="/about/"
      >
        {t("navigation.about")}
      </NavLink>
    </nav>
  );
}
