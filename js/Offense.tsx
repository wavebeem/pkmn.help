import * as React from "react";

import {Type} from "./data";
import * as TypeSelector from "./type-selector";
import * as Matchups from "./Matchups";

interface OffenseProps {
  updateType0(type: Type): void,
  type0: Type,
}

function Offense(props: OffenseProps) {
  const {type0, updateType0} = props;
  const classH2 = "tc f3 mt4 mb2";
  return (
    <main className="ph3 pt1 pb2 mw6 mw9-ns center">
      <div className="dib w-50-ns v-top">
        <h2 className={classH2}>choose type</h2>
        <TypeSelector
          value={type0}
          onChange={updateType0}
          includeNone={false}
        />
      </div>,
      <div className="dib w-50-ns v-top pl3-ns mt4-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <Matchups.Offense type={type0} />
      </div>
    </main>
  );
}

export default Offense;
