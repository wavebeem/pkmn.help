import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { IconReset } from "./icons";

export interface ClearChoicesProps {
  onClick: () => void;
}

export function ClearChoices({ onClick }: ClearChoicesProps): ReactNode {
  const { t } = useTranslation();
  return (
    <Button type="button" size="small" variant="outlined" onClick={onClick}>
      <IconReset size={16} />
      {t("general.clearChoices")}
    </Button>
  );
}
