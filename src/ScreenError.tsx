import * as React from "react";

const ScreenError: React.FC = () => {
  return (
    <div className="sans-serif f4 pa4 mw6 center dark-gray lh-copy">
      <h1>pkmn.help: Error</h1>
      <p>
        Please send an email to{" "}
        <a href="mailto:brian@wavebeem.com" className="dark-blue hover-blue">
          brian@wavebeem.com
        </a>{" "}
        describing how to reproduce this error
      </p>
      <p>
        <a
          href="/"
          className="no-underline pv2 ph3 br2 bg-dark-green hover-bg-green white dib"
        >
          Reload
        </a>
      </p>
    </div>
  );
};

export default ScreenError;
