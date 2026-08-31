import { ReactNode } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { characters } from "../misc/characters";
import { FancyText } from "./FancyText";
import styles from "./PageTitle.module.css";

interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps): ReactNode {
  usePageTitle(`${title} ${characters.ndash} PKMN.help`);
  return (
    <FancyText
      tag="h1"
      fontSize="xxlarge"
      fontWeight="medium"
      className={styles.pageTitle}
    >
      {title}
    </FancyText>
  );
}
