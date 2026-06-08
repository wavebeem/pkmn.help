import { useTranslation } from "react-i18next";
import { getVersionGroupName } from "../misc/versionGroup";
import { useLanguage } from "./useLanguage";
import { useVersionGroup } from "./useVersionGroup";

export function useVersionGroupName(): string {
  const [versionGroup] = useVersionGroup();
  const [language] = useLanguage();
  const { t } = useTranslation();
  return getVersionGroupName({ versionGroup, language, t });
}
