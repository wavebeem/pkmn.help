import { ReactNode } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Button } from "../components/Button";
import { CopyButton } from "../components/CopyButton";
import { ExternalLink } from "../components/ExternalLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { IconBack, IconReset } from "../components/Icon";
import { resetApp } from "../misc/resetApp";
import styles from "./ScreenError.module.css";

export function ScreenError(): ReactNode {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // Do something with error.data?
  }

  if (!(error instanceof Error)) {
    throw error;
  }

  const message = `
${error.name}: ${error.message}

## URL

${location.href}

## User agent

${navigator.userAgent}

## Local storage

${JSON.stringify(localStorage)}

## Session storage

${JSON.stringify(sessionStorage)}
`.trim();

  return (
    <div className="content-narrow center">
      <Flex direction="column" gap="large" padding="large">
        <FancyText tag="h1">Pokémon Type Calculator: Error</FancyText>
        <FancyText tag="p">
          Please copy the error message below and send it to{" "}
          <ExternalLink href="mailto:pkmn@wavebeem.com">
            pkmn@wavebeem.com
          </ExternalLink>
          .
        </FancyText>
        <Flex>
          <CopyButton text={message}>Copy error message</CopyButton>
        </Flex>
        <pre className={styles.pre}>{message}</pre>

        <FancyText tag="p">Resetting the app may help:</FancyText>
        <Flex>
          <Button onClick={resetApp}>
            <IconReset size={16} /> Reset
          </Button>
        </Flex>

        <FancyText tag="p">You can try returning to the main page.</FancyText>

        <Flex align="center" gap="small">
          <IconBack />
          <FancyText tag="span" fontSize="large" fontWeight="medium">
            <ExternalLink href="/">Back to main page</ExternalLink>
          </FancyText>
        </Flex>
      </Flex>
    </div>
  );
}
