import { clsx } from "clsx";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ClearChoices.module.css";
import { IconReset } from "./icons";

export interface ClearChoicesProps {
  onClick: () => void;
}

export function ClearChoices({ onClick }: ClearChoicesProps): ReactNode {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("active-darken", "focus-tab", styles.root)}
    >
      <IconReset size={16} />
      {t("general.clearChoices")}
    </button>
  );
}
