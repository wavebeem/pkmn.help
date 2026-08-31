import { clsx } from "clsx";
import { MouseEvent, ReactNode, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import styles from "./PageNav.module.css";
import {
  IconAbout,
  IconDefenseSolo,
  IconDefenseTeam,
  IconOffenseDual,
  IconOffenseSingle,
  IconPokedex,
  IconSettings,
} from "./icons";

export type PageNavProps = {
  position: "left" | "right";
};

export function PageNav({ position }: PageNavProps): ReactNode {
  const tabClass = clsx(styles.tab, "active-darken-background focus-toggle");
  const { needsAppUpdate, closeMenu } = useAppContext();
  const { t } = useTranslation();

  const onNavLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.currentTarget.getAttribute("aria-current") === "page") {
        closeMenu();
      }
    },
    [closeMenu],
  );

  return (
    <nav className={styles.tabBar} data-position={position}>
      <span className={styles.tabSection}>{t("navigation.offense")}</span>
      <NavLink
        onClick={onNavLinkClick}
        className={tabClass}
        end
        to="/offense/single/"
      >
        <IconOffenseSingle size={24} />
        <span className={styles.label}>{t("offense.mode.single")}</span>
      </NavLink>
      <NavLink
        onClick={onNavLinkClick}
        className={tabClass}
        end
        to="/offense/dual/"
      >
        <IconOffenseDual size={24} />
        <span className={styles.label}>{t("offense.mode.combination")}</span>
      </NavLink>
      <span className={styles.tabSection}>{t("navigation.defense")}</span>
      <NavLink
        onClick={onNavLinkClick}
        className={tabClass}
        end
        to="/defense/solo/"
      >
        <IconDefenseSolo size={24} />
        <span className={styles.label}>{t("defense.mode.solo")}</span>
      </NavLink>
      <NavLink
        onClick={onNavLinkClick}
        className={tabClass}
        end
        to="/defense/team/"
      >
        <IconDefenseTeam size={24} />
        <span className={styles.label}>{t("defense.mode.team")}</span>
      </NavLink>
      <span className={styles.tabSection}>{t("navigation.other")}</span>
      <NavLink onClick={onNavLinkClick} className={tabClass} end to="/pokedex/">
        <IconPokedex size={24} />
        <span className={styles.label}>{t("navigation.pokedex")}</span>
      </NavLink>
      <NavLink
        onClick={onNavLinkClick}
        className={tabClass}
        end
        to="/settings/"
      >
        <IconSettings size={24} />
        <span className={styles.label}>{t("navigation.settings")}</span>
      </NavLink>
      <NavLink
        onClick={onNavLinkClick}
        className={clsx(tabClass, needsAppUpdate && styles.pleaseUpdate)}
        end
        to="/about/"
      >
        <IconAbout size={24} />
        <span className={styles.label}>{t("navigation.about")}</span>
      </NavLink>
    </nav>
  );
}
