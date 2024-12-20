import React, { CSSProperties } from "react";
import styles from "./shrimmer.module.scss";
import { cn } from "@/src/utils/class.utils";

const Shrimmer = ({
  width = 100,
  height = 100,
  autoWidth = false,
  className,
  borderRadius = 8,
}: {
  width?: number;
  height?: number;
  autoWidth?: boolean;
  className?: string;
  borderRadius?: number;
}) => {
  return (
    <div
      className={cn(styles["shimmer"], className)}
      style={
        {
          "--shrimmer-width": autoWidth ? "auto" : `${width}px`,
          "--shrimmer-height": `${height}px`,
          "--shrimmer-border-radius": `${borderRadius}px`,
        } as CSSProperties
      }
    />
  );
};

export default Shrimmer;
