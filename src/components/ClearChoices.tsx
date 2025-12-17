import { useTranslation } from "react-i18next";
import styles from "./ClearChoices.module.css";
import { IconReset } from "./icons";
import { clsx } from "clsx";
import { JSX } from "react";

export interface ClearChoicesProps {
  onClick: () => void;
}

export function ClearChoices({ onClick }: ClearChoicesProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("active-darken", "focus-tab", styles.ClearChoices)}
    >
      <IconReset size={16} />
      {t("general.clearChoices")}
    </button>
  );
}
