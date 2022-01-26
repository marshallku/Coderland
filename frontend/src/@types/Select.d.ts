interface SelectItem {
  key: string;
  name: string;
  selected?: boolean;
}

interface SelectProps {
  id: string;
  list: Array<SelectItem>;
}
