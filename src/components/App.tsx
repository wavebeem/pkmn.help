import { clsx } from "clsx";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useRegisterSW } from "virtual:pwa-register/react";
import { AppContext, AppContextProvider } from "../hooks/useAppContext";
import { useComputedStyleProperty } from "../hooks/useComputedStyleProperty";
import { useFetchJSON } from "../hooks/useFetchJSON";
import { useLanguage } from "../hooks/useLanguage";
import { useMetaThemeColor } from "../hooks/useMetaThemeColor";
import { usePageTitle } from "../hooks/usePageTitle";
import { useRouteChangeFixes } from "../hooks/useRouteChangeFixes";
import { useScrollToFragment } from "../hooks/useScrollToFragment";
import { useTheme } from "../hooks/useTheme";
import { useUpdateSW } from "../hooks/useUpdateSW";
import { CoverageType, Pokemon } from "../misc/data-types";
import { detectLanguage } from "../misc/detectLanguage";
import { formatPokemonName } from "../misc/formatPokemonName";
import { randomItem } from "../misc/random";
import { publicPath } from "../misc/settings";
import { ScreenAbout } from "../screens/ScreenAbout";
import { ScreenCoverageList } from "../screens/ScreenCoverageList";
import { ScreenDefense } from "../screens/ScreenDefense";
import { ScreenDefenseTeam } from "../screens/ScreenDefenseTeam";
import { ScreenError } from "../screens/ScreenError";
import { ScreenOffense } from "../screens/ScreenOffense";
import { ScreenPokedex } from "../screens/ScreenPokedex";
import { ScreenPokedexHelp } from "../screens/ScreenPokedexHelp";
import { ScreenSettings } from "../screens/ScreenSettings";
import { ScreenTranslation } from "../screens/ScreenTranslation";
import { ScreenWeaknessCoverage } from "../screens/ScreenWeaknessCoverage";
import styles from "./App.module.css";
import { Crash } from "./Crash";
import { Icon } from "./Icon";
import { MonsterImage } from "./MonsterImage";
import { PageNav } from "./PageNav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ScreenError />,
    children: [
      { index: true, element: <Navigate replace to="/defense/solo/" /> },
      {
        path: "offense",
        children: [
          { index: true, element: <Navigate replace to="single" /> },
          {
            path: "combination",
            element: <ScreenOffense mode="combination" />,
          },
          { path: "single", element: <ScreenOffense mode="single" /> },
          {
            path: "coverage",
            children: [
              { index: true, element: <ScreenWeaknessCoverage /> },
              {
                path: "weakness",
                element: <ScreenCoverageList mode="weakness" />,
              },
              {
                path: "resistance",
                element: <ScreenCoverageList mode="resistance" />,
              },
              {
                path: "normal",
                element: <ScreenCoverageList mode="normal" />,
              },
            ],
          },
        ],
      },
      {
        path: "defense",
        children: [
          { index: true, element: <Navigate replace to="solo" /> },
          { path: "solo", element: <ScreenDefense /> },
          { path: "team", element: <ScreenDefenseTeam /> },
        ],
      },
      {
        path: "pokedex",
        children: [
          { index: true, element: <ScreenPokedex /> },
          { path: "help", element: <ScreenPokedexHelp /> },
        ],
      },
      { path: "translation", element: <ScreenTranslation /> },
      { path: "about", element: <ScreenAbout /> },
      { path: "settings", element: <ScreenSettings /> },
      { path: "_error", element: <Crash /> },
      { path: "*", element: <Navigate replace to="/defense/solo/" /> },
    ],
  },
]);

function getFallback(key: string): string {
  if (key === "title") {
    return "Pokémon Type Calculator";
  }
  return "…";
}

function useTranslationsWithBlankFallback() {
  const { t: translation, ready } = useTranslation(undefined, {
    useSuspense: false,
  });
  return ready ? translation : getFallback;
}

export function Layout(): ReactNode {
  // Service worker
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    // offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();
  useUpdateSW();

  // Update this to debug the refresh visuals
  const hasUpdate = needRefresh;

  async function updateApp() {
    setNeedRefresh(false);
    await updateServiceWorker(true);
  }

  const t = useTranslationsWithBlankFallback();
  const { i18n } = useTranslation(undefined, { useSuspense: false });

  // State...
  const [isLoading, setIsLoading] = useState(true);
  const [coverageTypes, setCoverageTypes] = useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [easterEgg, setEasterEgg] = useState<Pokemon>();
  const [easterEggLoadedID, setEasterEggLoadedID] = useState("");

  const [language] = useLanguage();

  useEffect(() => {
    async function load() {
      await i18n.changeLanguage(language || detectLanguage());
      document.documentElement.lang = i18n.language;
    }
    load();
  }, [language, i18n]);

  // Theme stuff
  const [theme] = useTheme();
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDark = theme === "dark" || (theme === "auto" && isDarkMode);
  let dataTheme = theme;
  if (theme === "auto") {
    dataTheme = isDark ? "dark" : "light";
  }
  const headerRef = useRef<HTMLElement>(null);
  // Use the heading's background color as the HTML `theme-color` meta property,
  // so that browsers like mobile Safari make the surrounding UI match the
  // heading...
  const themeColor = useComputedStyleProperty(
    headerRef.current,
    "backgroundColor",
  );

  const dialogRef = useRef<HTMLDialogElement>(null);

  // Load Pokédex JSON
  const jsonURL = new URL("data-pkmn.json", publicPath).href;
  const allPokemonResponse = useFetchJSON<Pokemon[]>(jsonURL);

  // Fallback coverage types
  useEffect(() => {
    if (allPokemonResponse.type !== "done") {
      return;
    }
    const allPokemon = allPokemonResponse.data;
    const fallbackCoverageTypes = allPokemon.map<CoverageType>((pkmn) => {
      const name = formatPokemonName({
        speciesName: pkmn.speciesNames[language] || pkmn.speciesNames.en,
        formName: pkmn.formNames[language] || pkmn.formNames.en,
      });
      const number = String(pkmn.number);
      const types = pkmn.types;
      return { number, name, types };
    });
    setIsLoading(false);
    setCoverageTypes(fallbackCoverageTypes);
    setFallbackCoverageTypes(fallbackCoverageTypes);
    setAllPokemon(allPokemon);
  }, [allPokemonResponse, language]);

  const appContext = useMemo<AppContext>(
    () => ({
      allPokemon: AllPokemon,
      coverageTypes,
      easterEggLoadedID,
      easterEggPokemon: easterEgg,
      fallbackCoverageTypes,
      isLoading,
      needsAppUpdate: hasUpdate,
      setCoverageTypes,
      updateApp,
    }),
    [
      AllPokemon,
      coverageTypes,
      easterEgg,
      easterEggLoadedID,
      fallbackCoverageTypes,
      isLoading,
      hasUpdate,
      setCoverageTypes,
      updateApp,
    ],
  );

  const toggleMenu = useCallback(() => {
    if (!dialogRef.current) {
      return;
    }
    if (dialogRef.current.open) {
      closeMenu();
    } else {
      openMenu();
    }
  }, []);

  const openMenu = useCallback(() => {
    if (!dialogRef.current) {
      return;
    }
    navigate({ hash: "menu" });
    dialogRef.current.showModal();
  }, []);

  const closeMenu = useCallback(() => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.close();
  }, []);

  const notMobile = useMediaQuery("(width >= 60rem)");

  useEffect(() => {
    if (notMobile) {
      closeMenu();
    }
  }, [notMobile]);

  const location = useLocation();
  const navigate = useNavigate();

  usePageTitle(t("title"));
  useMetaThemeColor({ dataTheme, themeColor });
  useScrollToFragment();
  useRouteChangeFixes();

  // TODO: Intercept the back button and close the dialog if it's open.

  return (
    <AppContextProvider value={appContext}>
      {easterEgg && (
        <div
          className={styles.easterEgg}
          data-animate={easterEggLoadedID === easterEgg.id}
        >
          <MonsterImage
            pokemonID={easterEgg.id}
            onLoad={({ pokemonID }) => {
              setEasterEggLoadedID(pokemonID);
            }}
          />
        </div>
      )}
      <div className={styles.root}>
        <header className={styles.header} ref={headerRef}>
          <div className={clsx(styles.headerContent, "content-wide center")}>
            <div className={styles.heading}>
              <button
                // TODO: Translate this?
                aria-label="pkmn.help"
                className={styles.pokeball}
                onClick={(event) => {
                  event.preventDefault();
                  const pkmn = randomItem(AllPokemon);
                  if (!pkmn) {
                    return;
                  }
                  setEasterEgg(pkmn);
                }}
              />
              <hgroup className={styles.titleStack}>
                <h1 className={styles.title}>pkmn.help</h1>
                <p className={styles.subtitle}>{t("title")}</p>
              </hgroup>
            </div>
            <button
              className={clsx(
                styles.menuButton,
                hasUpdate && styles.pleaseUpdate,
                "active-darken-background",
                "focus-outline",
              )}
              onClick={toggleMenu}
              aria-label={t("navigation.menu")}
              id="menu-button"
            >
              <Icon name="menuHamburger" size={32} />
            </button>
          </div>
        </header>
        <aside className={styles.sidebar}>
          <PageNav hasUpdate={hasUpdate} closeMenu={closeMenu} />
        </aside>
        <dialog className={styles.dialog} ref={dialogRef} id="menu-dialog">
          <div className={styles.dialogMenuHeader}>
            <button
              className={clsx(
                styles.menuButton,
                "active-darken-background",
                "focus-outline",
              )}
              onClick={closeMenu}
              aria-label={t("navigation.close")}
            >
              <Icon name="close" size={32} />
            </button>
          </div>
          <PageNav hasUpdate={hasUpdate} closeMenu={closeMenu} />
        </dialog>
        <div className={styles.content} id="content">
          <Outlet />
        </div>
      </div>
    </AppContextProvider>
  );
}

export function App(): ReactNode {
  return <RouterProvider router={router} />;
}
