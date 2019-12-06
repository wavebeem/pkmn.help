import React from "react";

import { Type } from "./data";
import TypeSelector from "./TypeSelector";
import * as Matchups from "./Matchups";

interface OffenseProps {
  updateType0(type: Type): void;
  type0: Type;
}

function Offense(props: OffenseProps) {
  const { type0, updateType0 } = props;
  const classH2 = "tc f5 mv3";
  return (
    <main className="ph3 pt1 pb4 mw6 mw9-ns center">
      <div className="dib w-50-ns w-100 v-top">
        <h2 className={classH2}>Choose type</h2>
        <TypeSelector
          value={type0}
          onChange={updateType0}
          includeNone={false}
        />
        {/* Here for equal padding between screens */}
        <div className="HACK-hidden-ns">
          <h2 className={classH2}>Choose type</h2>
          <TypeSelector
            value={type0}
            onChange={updateType0}
            includeNone={true}
          />
        </div>
      </div>
      <div className="dib w-50-ns w-100 v-top pl3-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <Matchups.Offense type={type0} />
      </div>
    </main>
  );
}

Offense.displayName = "Offense";

export default Offense;
