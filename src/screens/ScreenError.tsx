import { Button } from "../components/Button";
import { CopyButton } from "../components/CopyButton";
import { ExternalLink } from "../components/ExternalLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { Icon } from "../components/Icon";
import { resetApp } from "../misc/resetApp";
import styles from "./ScreenError.module.css";

export type ScreenErrorProps = {
  error: Error;
};

export function ScreenError({ error }: ScreenErrorProps) {
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
        <FancyText tag="h1">Error</FancyText>
        <FancyText tag="p">
          Please copy the error message below and send it to{" "}
          <a href="mailto:pkmn@wavebeem.com" className="fg-link">
            pkmn@wavebeem.com
          </a>
          .
        </FancyText>
        <Flex>
          <CopyButton text={message}>Copy error message</CopyButton>
        </Flex>
        <pre className={styles.pre}>{message}</pre>

        <FancyText tag="p">Resetting the app may help:</FancyText>
        <Flex>
          <Button onClick={resetApp}>Reset</Button>
        </Flex>

        <FancyText tag="p">You can try returning to the main page.</FancyText>

        <FancyText tag="p" fontSize="large" fontWeight="medium">
          <Icon name="arrowLeft" />{" "}
          <ExternalLink href="/">Back to pkmn.help</ExternalLink>
        </FancyText>
      </Flex>
    </div>
  );
}
