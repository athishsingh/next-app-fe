export type InputProps = {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "num" | "password";
  width?: number;
  autoWidth?: boolean;
  classnames?: string;
  onEnterPressed?: () => void;
  label?: string;
  showLabelText?: boolean;
  allowPaste?: boolean;
  removeBorder?: boolean;
};
