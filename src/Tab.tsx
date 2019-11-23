import React from "react";
import classnames from "classnames";

import { clickNav } from "./ga";

function makeTab(
  props: TabContainerProps,
  index: number,
  { title, name }: TabItemProps
) {
  const { current, changeTab } = props;
  const className = classnames([
    "pv3 ph3 f4 w-third",
    "pv3-ns ph4-ns",
    "dib",
    "no-outline tab-bottom-focus",
    "b bn",
    "br--top br4",
    "bg-transparent",
    "hover-black-90",
    index === current
      ? "black bottom-border-thick-current"
      : "black-50 bottom-border-thick pointer"
  ]);
  const style = {
    maxWidth: "150px"
  };
  const onClick = () => {
    changeTab(index);
    clickNav(name);
  };
  return (
    <button
      key={`tab-${index}`}
      className={className}
      onClick={onClick}
      style={style}
      disabled={index === current}
    >
      {title}
    </button>
  );
}

function makeTabBar(props: TabContainerProps) {
  const className = classnames([
    "tc w-100",
    "bg-white",
    "bb tab-bar-border b--black-20",
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

TabItem.displayName = "TabItem";

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

TabContainer.displayName = "TabContainer";
