import * as React from "react";

type ScreenErrorProps = {
  error: Error;
};

const ScreenError: React.FC<ScreenErrorProps> = ({ error }) => {
  return (
    <div className="sans-serif ph4 mw7 f4 center dark-gray lh-copy">
      <h1>pkmn.help: Error</h1>
      <p>
        Please send an email to{" "}
        <a href="mailto:brian@wavebeem.com" className="dark-blue hover-blue">
          brian@wavebeem.com
        </a>{" "}
        describing how to reproduce this error, and include the following error
        message:
      </p>
      <pre className="f5 bg-near-white pa2 br2 ba b--black-10 overflow-x-auto">
        {error.message}
      </pre>
      <p>
        <a href="/" className="f3 dark-blue hover-blue">
          &larr; Back to pkmn.help
        </a>
      </p>
    </div>
  );
};

ScreenError.displayName = "ScreenError";

export default ScreenError;
