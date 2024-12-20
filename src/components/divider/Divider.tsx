import { cn } from "../../utils/class.utils";
import styles from "./divider.module.scss";

interface IDividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  size?: number;
}

const Divider = ({
  className,
  orientation = "horizontal",

  size = 1,
}: IDividerProps) => {
  return (
    <div
      className={cn(styles[`divider-${orientation}`], className)}
      style={
        {
          "--height": `${size}px`,
        } as React.CSSProperties
      }
    />
  );
};

export { Divider };
