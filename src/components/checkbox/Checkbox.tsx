import React from "react";
import styles from "./checkbox.module.scss";
import { cn } from "@/src/utils/class.utils";

const Checkbox = ({
  isSelected,
  onChange,
  label,
  classnames,
  tabIndex = 0,
}: {
  isSelected: boolean;
  onChange: () => void;
  classnames?: string;
  label?: string;
  tabIndex?: number;
}) => {
  return (
    <div
      className={cn(
        `nu-flex nu-gap-2 nu-m-2 nu-ai-center ${styles["checkbox__main-con"]}`,
        classnames
      )}
      onClick={onChange}
    >
      <input
        tabIndex={tabIndex}
        className={`${styles["checkbox__main-input"]}`}
        type="checkbox"
        data-id={label}
        value={label}
        onChange={onChange}
        checked={isSelected}
      />
      {label && (
        <label className="nu-c-pointer" htmlFor={label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
