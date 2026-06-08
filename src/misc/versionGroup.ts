import versionsData from "../../data/versions.json" with { type: "json" };
import { pickTranslation } from "./pickTranslation";

export function getVersionGroupName({
  versionGroup,
  language,
  t,
}: {
  versionGroup: string;
  language: string;
  t: (key: string) => string;
}): string {
  if (!versionGroup) {
    return t("more.settings.versionGroup.values.all");
  }
  let localizedItemSeparator = " / ";
  if (language === "ja" || language === "ko") {
    localizedItemSeparator = "・";
  } else if (language === "zh-Hans" || language === "zh-Hant") {
    localizedItemSeparator = "／";
  }
  const itemLabel = (versionsData.versionGroupsToVersions as any)[versionGroup]
    .map((v: any) => {
      return pickTranslation((versionsData.versionNames as any)[v], language);
    })
    .join(localizedItemSeparator);
  return itemLabel;
}
