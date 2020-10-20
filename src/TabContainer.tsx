import classnames from "classnames";
import * as React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

interface TabProps {
  title: string;
  name: string;
  url: string;
}

function Tab(props: TabProps) {
  return (
    <NavLink
      to={props.url}
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
    >
      {props.title}
    </NavLink>
  );
}

Tab.displayName = "Tab";

interface TabContainerProps {
  children: any;
}

export default function TabContainer(props: TabContainerProps) {
  const { children } = props;
  const tabs = React.Children.map(children, (kid) => <Tab {...kid.props} />);
  const routes = React.Children.map(children, (kid) => (
    <Route path={`/${kid.props.name}`}>{kid}</Route>
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
      <Switch>
        {routes}
        <Redirect to="/offense" />
      </Switch>
    </div>
  );
}

TabContainer.displayName = "TabContainer";
