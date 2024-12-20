import React, { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./input.module.scss";
import { cn } from "@/src/utils/class.utils";
import { InputProps } from "./input.types";

function Input({
  placeholder,
  value,
  prefixIcon,
  suffixIcon,
  onChange,
  type,
  width = 291,
  autoWidth = false,
  classnames,
  onEnterPressed,
  label,
  showLabelText = false,
  allowPaste = true,
  removeBorder = false,
}: InputProps) {
  const prefixRef = useRef<HTMLDivElement>(null);
  const suffixRef = useRef<HTMLDivElement>(null);
  const [paddingLeft, setPaddingLeft] = useState(10);
  const [paddingRight, setPaddingRight] = useState(10);

  useEffect(() => {
    const prefixWidth = prefixRef.current?.clientWidth || 0;
    const suffixWidth = suffixRef.current?.clientWidth || 0;
    setPaddingLeft(prefixWidth > 0 ? prefixWidth + 15 : 10);
    setPaddingRight(suffixWidth > 0 ? suffixWidth + 15 : 10);
  }, [prefixIcon, suffixIcon]);

  return (
    <div className={classnames}>
      {showLabelText && label && (
        <label htmlFor={""} className={styles["label__text"]}>
          {label}
        </label>
      )}
      <div className={styles["input__main-con"]}>
        {prefixIcon && (
          <div ref={prefixRef} className={`${styles["prefix__div-con"]}`}>
            {prefixIcon}
          </div>
        )}
        <input
          onPaste={(e) => {
            if (!allowPaste) {
              e.preventDefault();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation();
              onEnterPressed && onEnterPressed();
            }
          }}
          style={
            {
              "--_search-width": autoWidth ? "100%" : `${width}px`,
              "--_input-padding":
                prefixIcon || suffixIcon
                  ? `10px ${paddingRight}px 10px ${paddingLeft}px`
                  : "10px",
            } as CSSProperties
          }
          className={cn(styles["input__sub-con"], {
            [styles["remove__border"]]: removeBorder,
          })}
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={(e) => {
            if (type === "num" || type === "number") {
              onChange(e.target.value.replace(/\D/, ""));
            } else {
              onChange(e.target.value);
            }
          }}
        />
        {suffixIcon && (
          <div ref={suffixRef} className={`${styles["suffix__div-con"]}`}>
            {suffixIcon}
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
