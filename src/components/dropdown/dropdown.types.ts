export type DropdownProps = {
  optionsLabel?: string; //this is label which will be rendered for options
  showOptionsLabel?: boolean;
  placeHolderLabel?: string;
  placeholder: string;
  headerLabel?: string;
  showHeaderLabel?: boolean;
  selectedOption: { label: string; value: string }[];
  options: {
    label: string;
    value: string;
    customRenderer?: React.ReactNode;
  }[];
  isSearchable?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  onOpen?: () => void;
  onFocus?: () => void;
  onChange?: (val: { label: string; value: string }[], index: number) => void;
  width?: string;
  forceTop?: boolean;
  uiType?: DropdownSelectUIType;
  searchInputPlaceholder?: string;
  removeAllStyles?: boolean;
  customSelectContainer?: React.ReactNode;
  noItemsText?: string;
  classNames?: string;
  isMultiSelect?: boolean;
  padding?: number;
  isLoading?: boolean;
};

export type DropdownOptionType<T = undefined> = {
  label: string;
  value: string;
  secondaryLabel?: string;
  data?: T;
};

export enum DropdownSelectUIType {
  "advanced" = "advanced",
  "basic" = "basic",
}
