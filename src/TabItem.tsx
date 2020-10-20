interface TabItemProps {
  title: string;
  name: string;
  url: string;
  children: any;
}

function TabItem(props: TabItemProps) {
  return props.children;
}

TabItem.displayName = "TabItem";

export default TabItem;
