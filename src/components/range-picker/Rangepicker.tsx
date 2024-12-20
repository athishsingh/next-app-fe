import { cn } from "@/src/utils/class.utils";
import styles from "./range-picker.module.scss";
import React from "react";
type SliderProps = {
  onChange: (value: number) => void;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  valueSuffix?: string;
};

const Rangepicker = ({
  onChange,
  value,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  valueSuffix = "",
}: SliderProps) => {
  return (
    <div className="nu-flex nu-gap-4 nu-w-full nu-ai-center">
      <input
        type="range"
        value={value}
        onChange={(e) => {
          onChange(Number(e.target.value));
        }}
        min={min}
        max={max}
        step={step}
        className={cn(styles["slider"], styles["slider--small"])}
        style={
          {
            "--max": max,
            "--min": min,
            "--value": value,
          } as React.CSSProperties
        }
      />

      {showValue && (
        <p className={styles["info__text"]}>
          {value}
          {valueSuffix}
        </p>
      )}
    </div>
  );
};

export default Rangepicker;
