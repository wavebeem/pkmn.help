import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG } from "../misc/colors";
import { Type, typesForVersionGroup } from "../misc/data-types";
import styles from "./MultiTypeSelector.module.css";
import { customProperties } from "../misc/customProperties";
import { Flex } from "./Flex";
import { ReactNode } from "react";
import { TypeIcon } from "./TypeIcon";
import { IconCheck } from "./icons";
import { VersionGroup } from "../misc/data-version-groups";

type MultiTypeSelectorProps = {
  versionGroup: VersionGroup;
  onChange(types: Type[]): void;
  value: Type[];
  limit?: number;
  hideStellar?: boolean;
};

export function MultiTypeSelector({
  versionGroup,
  onChange,
  value,
  limit,
  hideStellar = false,
}: MultiTypeSelectorProps): ReactNode {
  const { t } = useTranslation();
  let types = typesForVersionGroup(versionGroup);
  if (hideStellar) {
    types = types.filter((t) => t !== Type.stellar);
  }
  return (
    <div className={styles.root} data-limit={limit}>
      {types.map((type) => {
        const isChecked = value.includes(type);
        return (
          <button
            onClick={() => {
              const types = new Set(value);
              if (isChecked) {
                types.delete(type);
              } else {
                types.add(type);
              }
              let newValue = [...types];
              if (limit) {
                newValue = newValue.slice(-limit);
              }
              onChange(newValue);
            }}
            aria-pressed={isChecked}
            key={type}
            data-type={type}
            className={clsx(styles.button, "select-none")}
            style={customProperties({
              "--type-color-bg": typeColorBG(type),
              "--type-color": typeColor(type),
            })}
          >
            <Flex tag="span" gap="medium" justify="flex-start" align="center">
              <span className={styles.checkbox}>
                <TypeIcon type={type} size={24} className={styles.type} />
                <IconCheck size={24} strokeWidth={4} className={styles.check} />
              </span>
              <span className={styles.text}>{t(`types.${type}`)}</span>
            </Flex>
          </button>
        );
      })}
    </div>
  );
}
