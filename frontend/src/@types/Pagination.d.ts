interface IPaginationProps {
  paginate: (pageNumber: number) => void;
  data: IPagination;
}

interface IPaginationButtonProps {
  to: number;
  disableIf: boolean;
  icon: string;
  ariaLabel: string;
  setCurrentIndex: (value: React.SetStateAction<number>) => void;
}
