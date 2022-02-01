interface ISelectItem {
  key: string;
  name: string;
  selected?: boolean;
}

interface ISelectProps {
  id: string;
  list: Array<ISelectItem>;
}
