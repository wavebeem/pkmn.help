import { useTranslation } from "react-i18next";
import { FancyText } from "./FancyText";
import { useTheme } from "../hooks/useTheme";
import styles from "./ThemePicker.module.css";

const themes = ["auto", "light", "dark", "black"] as const;

export function ThemePicker() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useTheme();

  return (
    <div className={styles.root}>
      <div>
        <div>{t("more.settings.theme.label")}</div>
        <FancyText tag="div" fontSize="small" color="3">
          {t("more.settings.theme.help")}
        </FancyText>
      </div>
      <div className={styles.itemsContainer}>
        {themes.map((thisTheme) => (
          <label key={thisTheme} className={styles.item} data-theme={thisTheme}>
            <input
              className={`${styles.radio} focus-outline`}
              type="radio"
              name="theme"
              checked={theme === thisTheme}
              value={thisTheme}
              onChange={(event) => {
                if (event.currentTarget.checked) {
                  setTheme(thisTheme);
                }
              }}
            />
            <div className={styles.preview}>
              {t(`more.settings.theme.values.${thisTheme}`)}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
