import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ResetLink.module.css";
import { IconReset } from "./Icon";
import { clsx } from "clsx";

export interface ResetLinkProps {
  onClick: () => void;
  children?: ReactNode;
}

export function ResetLink({ onClick, children }: ResetLinkProps): ReactNode {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("active-darken", "focus-tab", styles.ResetLink)}
    >
      <IconReset size={16} />
      {children ?? t("general.clearChoices")}
    </button>
  );
}
