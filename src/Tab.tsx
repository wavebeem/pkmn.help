import * as React from "react";
import { NavLink, Route } from "react-router-dom";
import classnames from "classnames";

import { clickNav } from "./ga";

interface TabProps {
  title: string;
  name: string;
}

function Tab(props: TabProps) {
  return (
    <NavLink
      to={`/${props.name}`}
      className={classnames([
        "no-underline",
        "pv2 ph2 f5",
        "no-outline tab-bottom-focus",
        "b bn",
        "br--top br4",
        "bg-transparent",
        "hover-black-90",
        "black-50 bottom-border-thick",
      ])}
      activeClassName={classnames([
        "black bottom-border-thick-current",
        "no-pointer",
      ])}
      onClick={() => clickNav(props.name)}
    >
      {props.title}
    </NavLink>
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
  children: any;
}

export function TabContainer(props: TabContainerProps) {
  const { children } = props;
  const tabs = React.Children.map(children, kid => (
    <Tab
      title={kid.props.title}
      name={kid.props.name}
    />
  ));
  const routes = React.Children.map(children, kid => (
    <Route path={`/${kid.props.name}`}>
      {kid}
    </Route>
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
      {routes}
    </div>
  );
}

TabContainer.displayName = "TabContainer";
