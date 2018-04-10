import * as React from "react";
import * as classnames from "classnames";

import * as GA from "./ga";

function makeTab(
  props: TabContainerProps,
  index: number,
  { title, name }: TabItemProps
) {
  const { current, changeTab } = props;
  const className = classnames([
    "pv3 ph3 f5 w-third",
    "pv3-ns ph4-ns f3-ns",
    "dib",
    "no-outline tab-bottom-focus",
    "b ttu",
    "bn",
    "bg-transparent",
    "pointer",
    index === current
      ? "black bottom-border-thick-current b"
      : "black-50 bottom-border-thick"
  ]);
  const style = {
    maxWidth: "150px"
  };
  const onClick = () => {
    changeTab(index);
    GA.clickNav(name);
  };
  return (
    <button key={index} className={className} onClick={onClick} style={style}>
      {title}
    </button>
  );
}

function makeTabBar(props: TabContainerProps) {
  const className = classnames([
    "tc w-100",
    "bg-white",
    "bb bw1 b--black-20",
    "pt4"
  ]);
  const kids: any = props.children.map((kid: any, i: number) => {
    return makeTab(props, i, kid.props);
  });
  return <div className={className}>{kids}</div>;
}

interface TabItemProps {
  title: string;
  name: string;
  children: any;
}

export function TabItem(props: TabItemProps) {
  return <div>{props.children}</div>;
}

interface TabContainerProps {
  changeTab: (index: number) => void;
  current: number;
  children: any;
}

export function TabContainer(props: TabContainerProps) {
  const { children, current } = props;
  return (
    <div>
      {makeTabBar(props)}
      {children[current]}
    </div>
  );
}
