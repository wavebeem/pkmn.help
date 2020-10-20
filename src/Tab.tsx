interface TabItemProps {
  title: string;
  name: string;
  url: string;
  children: any;
}

export function TabItem(props: TabItemProps) {
  return props.children;
}

TabItem.displayName = "TabItem";
