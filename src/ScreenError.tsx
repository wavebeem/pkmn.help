import * as React from "react";

type ScreenErrorProps = {
  error: Error;
};

const ScreenError: React.FC<ScreenErrorProps> = ({ error }) => {
  return (
    <div className="sans-serif ph4 content-narrow f4 center fg2 lh-copy">
      <h1>pkmn.help: Error</h1>
      <p>
        Please send an email to{" "}
        <a href="mailto:brian@wavebeem.com" className="fg-link">
          brian@wavebeem.com
        </a>{" "}
        describing how to reproduce this error, and include the following error
        message:
      </p>
      <pre className="f5 bg1 pa2 br2 ba border2 overflow-x-auto">
        {error.message}
      </pre>
      <p>
        <b aria-hidden="true">&larr;</b>{" "}
        <a href="/" className="f3 fg-link">
          Back to pkmn.help
        </a>
      </p>
    </div>
  );
};

export default ScreenError;
