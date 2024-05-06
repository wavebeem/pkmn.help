import * as React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "./components/Select";
import { Type } from "./misc/data-types";

interface TypeSelectorDropdownProps {
  type: Type;
  onTypeChange: (type: Type) => void;
}

export function TypeSelectorDropdown({
  type,
  onTypeChange,
}: TypeSelectorDropdownProps) {
  const { t } = useTranslation();
  return (
    <Select
      label={t("defense.teraType")}
      value={type}
      onChange={(event) => {
        onTypeChange(event.target.value as Type);
      }}
    >
      <option value={Type.none}>{t("types.none")}</option>
      <hr />
    </Select>
  );
}
