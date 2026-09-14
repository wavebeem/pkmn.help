import { ReactNode } from "react";
import { FancyLink } from "../components/FancyLink";
import { Flex } from "../components/Flex";
import { PageTitle } from "../components/PageTitle";

export function ScreenDevIndex(): ReactNode {
  return (
    <main className="center content-wide">
      <Flex
        className="content-narrow"
        direction="column"
        gap="large"
        padding="large"
      >
        <PageTitle title="Internal dev tools" />

        <Flex gap="medium" wrap>
          <FancyLink outlined to="/_/style-guide/">
            Style guide
          </FancyLink>
        </Flex>
      </Flex>
    </main>
  );
}
