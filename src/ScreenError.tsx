import classNames from "classnames";
import * as React from "react";
import { resetApp } from "./resetApp";

interface ScreenErrorProps {
  error: Error;
}

const buttonClasses = classNames(
  "no-underline",
  "ba br2 pv2 ph3",
  "f5",
  "SimpleFocus",
  "border1 button-shadow button-bg button-bg-hover color-inherit active-squish"
);

export function ScreenError({ error }: ScreenErrorProps) {
  return (
    <div className="sans-serif ph4 content-narrow f4 center fg2 lh-copy">
      <h1>pkmn.help: Error</h1>
      <p>
        Please send an email to{" "}
        <a href="mailto:pkmn@wavebeem.com" className="fg-link">
          pkmn@wavebeem.com
        </a>{" "}
        describing how to reproduce this error, and include the following error
        message:
      </p>
      <pre className="f5 bg1 pa2 br2 ba border2 overflow-x-auto">
        {error.message}
      </pre>
      <p>If the problem persists, you can try resetting the page:</p>
      <button type="button" onClick={resetApp} className={buttonClasses}>
        Reset
      </button>
      <p>
        <b aria-hidden="true">&larr;</b>{" "}
        <a href="/" className="f3 fg-link">
          Back to pkmn.help
        </a>
      </p>
    </div>
  );
}
