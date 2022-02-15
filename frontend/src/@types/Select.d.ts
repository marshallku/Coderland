interface ISelectItem {
  key: string;
  name: string;
  selected?: boolean;
}

interface ISelectProps {
  id: string;
  list: Array<ISelectItem>;
  readOnly?: boolean;
  cb?: (args: ISelectItem) => void;
}
