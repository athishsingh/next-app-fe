export type TableProps = {
  rowsWidth?: number[];
  headerText?: string[];
  rows: {
    id: string;
    cells: { component: React.ReactNode }[];
    rightComponent?: React.ReactNode;
  }[];
  isLoading?: boolean;
  shrimmerRowHeight?: number;
  isTableEmpty?: boolean;
  emptyTableText?: string;
};
