import React from "react";

import TypeSelector from "./TypeSelector";
import * as Matchups from "./Matchups";
import { Type } from "./data";

interface DefenseProps {
  updateType1(type: Type): void;
  updateType2(type: Type): void;
  type1: Type;
  type2: Type;
}

function Defense(props: DefenseProps) {
  const { updateType1, updateType2, type1, type2 } = props;
  const classH2 = "tc f4 mt4 mb2";
  return (
    <main className="ph3 pt1 pb4 mw6 mw9-ns center">
      <div className="dib w-50-ns w-100 v-top">
        <h2 className={classH2}>choose primary type</h2>
        <TypeSelector
          value={type1}
          onChange={updateType1}
          disabledTypes={[]}
          includeNone={false}
        />
        <h2 className={`${classH2} mt4`}>choose secondary type</h2>
        <TypeSelector
          value={type2}
          onChange={updateType2}
          disabledTypes={[type1]}
          includeNone={true}
        />
      </div>
      <div className="dib w-50-ns w-100 v-top pl3-ns mt4-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <Matchups.Defense type1={type1} type2={type2} />
      </div>
    </main>
  );
}

Defense.displayName = "Defense";

export default Defense;
