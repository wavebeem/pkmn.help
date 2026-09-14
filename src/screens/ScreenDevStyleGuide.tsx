import { clsx } from "clsx";
import { colord } from "colord";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { PageTitle } from "../components/PageTitle";
import { Section } from "../components/Section";
import { useThemeChangeSignal } from "../hooks/useThemeChangeSignal";
import { typeColor } from "../misc/colors";
import styles from "./ScreenDevStyleGuide.module.css";

// Every M3 color role is exposed as `--md-<kebab-case-role-name>`, generated
// by bin/generate-md3-theme.ts from PKMN.help's hand-picked "custom brand"
// static scheme: https://m3.material.io/styles/color/static/custom-brand
function mdVar(role: string): string {
  return `var(--md-${role})`;
}

interface ColorSwatchProps {
  label: string;
  background: string;
  color: string;
  wide?: boolean;
  small?: boolean;
}

function ColorSwatch({
  label,
  background,
  color,
  wide,
  small,
}: ColorSwatchProps): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState("");
  const themeChangeSignal = useThemeChangeSignal();

  // Recomputed on theme change since these colors come from `light-dark()`.
  useEffect(() => {
    if (ref.current) {
      setHex(colord(getComputedStyle(ref.current).backgroundColor).toHex());
    }
  }, [themeChangeSignal, background]);

  return (
    <div
      ref={ref}
      className={clsx(
        styles.swatch,
        wide && styles.wide,
        small && styles.small,
      )}
      style={{ background, color }}
    >
      {label}
      <button
        type="button"
        className={styles.hexButton}
        onClick={() => {
          navigator.clipboard.writeText(hex);
        }}
        aria-label={`Copy ${hex} to clipboard`}
      >
        <code>{hex}</code>
      </button>
    </div>
  );
}

function SeedSwatch({ label, hex }: { label: string; hex: string }): ReactNode {
  const color = colord(hex).contrast("#000") >= 4.5 ? "#000" : "#fff";
  return <ColorSwatch label={label} background={hex} color={color} />;
}

const accents = [
  { role: "primary", label: "Primary" },
  { role: "secondary", label: "Secondary" },
  { role: "tertiary", label: "Tertiary" },
] as const;

export function ScreenDevStyleGuide(): ReactNode {
  return (
    <main className="center content-wide">
      <Flex
        className="content-narrow"
        direction="column"
        gap="large"
        padding="large"
      >
        <PageTitle title="Style guide" />

        <Section
          heading={
            <FancyText tag="h2" fontWeight="medium">
              Color roles
            </FancyText>
          }
        >
          <FancyText tag="p">
            Every M3 color role from <code>bin/generate-md3-theme.ts</code>,
            laid out like the{" "}
            <FancyLink to="https://m3.material.io/styles/color/roles">
              M3 color roles reference chart
            </FancyLink>
            .
          </FancyText>

          <div className={styles.grid}>
            <div className={styles.accent}>
              {accents.map(({ role, label }) => (
                <div className={styles.accentColumn} key={role}>
                  <div className={styles.pair}>
                    <ColorSwatch
                      label={label}
                      background={mdVar(role)}
                      color={mdVar(`on-${role}`)}
                    />
                    <ColorSwatch
                      label={`On ${label}`}
                      background={mdVar("surface")}
                      color={mdVar(role)}
                    />
                  </div>
                  <div className={styles.pair}>
                    <ColorSwatch
                      label={`${label} Container`}
                      background={mdVar(`${role}-container`)}
                      color={mdVar(`on-${role}-container`)}
                    />
                    <ColorSwatch
                      label={`On ${label} Container`}
                      background={mdVar(`on-${role}-container`)}
                      color={mdVar(`${role}-container`)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.fixed}>
              {accents.map(({ role, label }) => (
                <div className={styles.fixedGroup} key={role}>
                  <div className={styles.fixedTop}>
                    <ColorSwatch
                      label={`${label} Fixed`}
                      background={mdVar(`${role}-fixed`)}
                      color={mdVar(`on-${role}-fixed`)}
                    />
                    <ColorSwatch
                      label={`${label} Fixed Dim`}
                      background={mdVar(`${role}-fixed-dim`)}
                      color={mdVar(`on-${role}-fixed`)}
                    />
                  </div>
                  <div className={styles.pair}>
                    <ColorSwatch
                      label={`On ${label} Fixed`}
                      background={mdVar(`on-${role}-fixed`)}
                      color={mdVar(`${role}-fixed`)}
                    />
                    <ColorSwatch
                      label={`On ${label} Fixed Variant`}
                      background={mdVar(`on-${role}-fixed-variant`)}
                      color={mdVar(`${role}-fixed`)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.errorInverse}>
              <div className={styles.error}>
                <div className={styles.pair}>
                  <ColorSwatch
                    label="Error"
                    background={mdVar("error")}
                    color={mdVar("on-error")}
                  />
                  <ColorSwatch
                    label="On Error"
                    background={mdVar("surface")}
                    color={mdVar("error")}
                  />
                </div>
                <div className={styles.pair}>
                  <ColorSwatch
                    label="Error Container"
                    background={mdVar("error-container")}
                    color={mdVar("on-error-container")}
                  />
                  <ColorSwatch
                    label="On Error Container"
                    background={mdVar("on-error-container")}
                    color={mdVar("error-container")}
                  />
                </div>
              </div>

              <div className={styles.inverse}>
                <div className={styles.pair}>
                  <ColorSwatch
                    label="Inverse Surface"
                    background={mdVar("inverse-surface")}
                    color={mdVar("inverse-on-surface")}
                  />
                  <ColorSwatch
                    label="Inverse On Surface"
                    background={mdVar("inverse-on-surface")}
                    color={mdVar("inverse-surface")}
                  />
                </div>
                <ColorSwatch
                  label="Inverse Primary"
                  background={mdVar("inverse-primary")}
                  color={mdVar("on-primary-container")}
                />
                <div className={styles.scrimShadow}>
                  <ColorSwatch
                    label="Scrim"
                    background={mdVar("scrim")}
                    color="white"
                    small
                  />
                  <ColorSwatch
                    label="Shadow"
                    background={mdVar("shadow")}
                    color="white"
                    small
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.surface}>
            <div className={styles.surfaceRow}>
              <ColorSwatch
                label="Surface Dim"
                background={mdVar("surface-dim")}
                color={mdVar("on-surface")}
              />
              <ColorSwatch
                label="Surface"
                background={mdVar("surface")}
                color={mdVar("on-surface")}
                wide
              />
              <ColorSwatch
                label="Surface Bright"
                background={mdVar("surface-bright")}
                color={mdVar("on-surface")}
              />
            </div>
            <div className={styles.surfaceRow}>
              <ColorSwatch
                label="Surface Container Lowest"
                background={mdVar("surface-container-lowest")}
                color={mdVar("on-surface")}
              />
              <ColorSwatch
                label="Surface Container Low"
                background={mdVar("surface-container-low")}
                color={mdVar("on-surface")}
              />
              <ColorSwatch
                label="Surface Container"
                background={mdVar("surface-container")}
                color={mdVar("on-surface")}
              />
              <ColorSwatch
                label="Surface Container High"
                background={mdVar("surface-container-high")}
                color={mdVar("on-surface")}
              />
              <ColorSwatch
                label="Surface Container Highest"
                background={mdVar("surface-container-highest")}
                color={mdVar("on-surface")}
              />
            </div>
            <div className={styles.surfaceRow}>
              <ColorSwatch
                label="On Surface"
                background={mdVar("on-surface")}
                color={mdVar("surface")}
              />
              <ColorSwatch
                label="On Surface Variant"
                background={mdVar("on-surface-variant")}
                color={mdVar("surface")}
              />
              <ColorSwatch
                label="Outline"
                background={mdVar("outline")}
                color={mdVar("surface")}
              />
              <ColorSwatch
                label="Outline Variant"
                background={mdVar("outline-variant")}
                color={mdVar("on-surface")}
              />
            </div>
          </div>
        </Section>

        <Section
          heading={
            <FancyText tag="h2" fontWeight="medium">
              Seeds
            </FancyText>
          }
        >
          <FancyText tag="p">
            Four{" "}
            <FancyLink to="https://m3.material.io/styles/color/static/custom-brand">
              hand-picked seeds
            </FancyLink>
            , matching <code>src/misc/colors.ts</code>.
          </FancyText>
          <div className={styles.seeds}>
            <SeedSwatch label="Primary Seed · Fire" hex={typeColor("fire")} />
            <SeedSwatch
              label="Secondary Seed · Water"
              hex={typeColor("water")}
            />
            <SeedSwatch
              label="Tertiary Seed · Grass"
              hex={typeColor("grass")}
            />
            <SeedSwatch
              label="Neutral Seed · Electric"
              hex={typeColor("electric")}
            />
          </div>
        </Section>
      </Flex>
    </main>
  );
}
