import React from "react";
import classnames from "classnames";

import { clickNav } from "./ga";

interface TabProps {
  current: number;
  changeTab: (tab: number) => void;
  index: number;
  title: string;
  name: string;
}

function Tab(props: TabProps) {
  return (
    <button
      type="button"
      style={{ width: 90 }}
      className={classnames([
        "pv2 ph2 f5",
        "no-outline tab-bottom-focus",
        "b bn",
        "br--top br4",
        "bg-transparent",
        "hover-black-90",
        props.index === props.current
          ? "black bottom-border-thick-current"
          : "black-50 bottom-border-thick pointer",
      ])}
      onClick={() => {
        props.changeTab(props.index);
        clickNav(props.name);
      }}
      disabled={props.index === props.current}
    >
      {props.title}
    </button>
  );
}

Tab.displayName = "Tab";

interface TabItemProps {
  title: string;
  name: string;
  children: any;
}

export function TabItem(props: TabItemProps) {
  return props.children;
}

TabItem.displayName = "TabItem";

interface TabContainerProps {
  changeTab: (index: number) => void;
  current: number;
  children: any;
}

export function TabContainer(props: TabContainerProps) {
  const { children, current } = props;
  const tabs = React.Children.map(children, (kid, i) => (
    <Tab
      title={kid.props.title}
      name={kid.props.name}
      current={current}
      changeTab={props.changeTab}
      index={i}
    />
  ));
  return (
    <div>
      <div
        className={classnames([
          "flex justify-center",
          "bg-white",
          "bb TabBarBorder b--black-20",
          "pt3",
        ])}
      >
        {tabs}
      </div>
      {children[current]}
    </div>
  );
}

TabContainer.displayName = "TabContainer";
