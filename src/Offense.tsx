import * as React from "react";

import { Type } from "./data";
import { MultiTypeSelector } from "./MultiTypeSelector";
import * as Matchups from "./Matchups";

interface OffenseProps {
  updateOffenseTypes(types: Type[]): void;
  offenseTypes: Type[];
}

export function Offense(props: OffenseProps) {
  const { offenseTypes, updateOffenseTypes } = props;
  const classH2 = "tc f5 mv3";
  return (
    <main className="ph3 pt1 pb4 mw6 mw9-ns center">
      <div className="dib w-50-ns w-100 v-top">
        <h2 className={classH2}>Choose types</h2>
        <MultiTypeSelector value={offenseTypes} onChange={updateOffenseTypes} />
      </div>
      <div className="dib w-50-ns w-100 v-top pl3-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <Matchups.Offense types={offenseTypes} />
      </div>
    </main>
  );
}

Offense.displayName = "Offense";
