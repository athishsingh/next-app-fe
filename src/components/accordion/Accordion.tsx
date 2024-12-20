"use client";
import React, { CSSProperties, useState } from "react";
import styles from "./accordion.module.scss";
import { cn } from "@/src/utils/class.utils";
import { CaretDown } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";

type AccordionPropsType = {
  className?: unknown;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  customArrow?: React.ReactNode;
  header?: React.ReactNode;
  disable?: boolean;
  overflowVisibleType?: "auto" | "visible";
  headerPadding?: number;
  childrenPadding?: number;
  onChange?: (isExpanded: boolean) => void;
  foreignVisible?: boolean | null;
};

function Accordion({
  className,
  children,
  defaultExpanded = false,
  customArrow,
  header = null,
  disable = false,
  headerPadding = 12,
  childrenPadding = 0,
  foreignVisible = null,
  overflowVisibleType = "visible",
  onChange,
}: AccordionPropsType) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [overflow, setOverflow] = useState("hidden");

  const handleClick = () => {
    if (disable) return;
    if (foreignVisible || isExpanded) setOverflow("hidden");
    if (foreignVisible === null) {
      setIsExpanded(!isExpanded);
    }
    onChange?.(foreignVisible === null ? !isExpanded : !foreignVisible);
  };

  return (
    <div className={cn(styles["accordion-con"], className)}>
      <div
        className={cn(styles["accordion-con-header"])}
        tabIndex={0}
        style={
          {
            "--header-padding": `${headerPadding}px`,
          } as CSSProperties
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.stopPropagation();
            handleClick();
          }
        }}
        onClick={handleClick}
      >
        <div className="flex-one">{header}</div>

        <div className={styles["arrow_main-con"]}>
          <div
            className={cn(styles.arrow, {
              [styles["rotate"]]:
                foreignVisible === null ? isExpanded : foreignVisible,
            })}
          >
            {typeof customArrow === "undefined" ? (
              <CaretDown size={IconSize.L} />
            ) : (
              customArrow
            )}
          </div>
        </div>
      </div>
      <div
        className={cn(styles.wrapper, {
          [styles["expanded"]]:
            foreignVisible === null ? isExpanded : foreignVisible,
        })}
        onTransitionEnd={() => {
          if (foreignVisible === null) {
            setOverflow(isExpanded ? overflowVisibleType : "hidden");
          } else {
            setOverflow(foreignVisible ? overflowVisibleType : "hidden");
          }
        }}
      >
        <div
          className={cn(styles["accordion-children-con"])}
          style={{ overflow }}
        >
          <div
            className={cn(styles["accordion-children"])}
            style={
              {
                "--children-padding": `${childrenPadding}px`,
              } as CSSProperties
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
