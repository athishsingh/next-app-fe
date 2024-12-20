import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import Button from "../button/Button";
import { ButtonType } from "../button/types";
import {
  CalendarDots,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretDown,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import Infotile from "../info-tile/Infotile";
import styles from "./datepicker.module.scss";
import { cn } from "@/src/utils/class.utils";
import { IconSize } from "@/src/constants/iconsize.constant";
import { convertDate } from "@/src/utils/date.utils";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePicker = ({
  placeholder,
  date,
  onSelect,
  label,
  minDate,
  maxDate,
}: {
  placeholder?: string;
  date: Value;
  onSelect: (val: string) => void;
  label?: string;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
}) => {
  const [value, onValueChange] = useState<Value>(date);
  const [showDatepicker, setShowDatepicker] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  }>({
    vertical: "bottom",
    horizontal: "right",
  });
  const calendarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onValueChange(date);
  }, [date]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShowDatepicker(false);
      }
    };

    const handlePositioning = () => {
      if (triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const calendarHeight = 300;
        const calendarWidth = 260;
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Check vertical space
        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;

        // Check horizontal space
        const spaceRight = viewportWidth - triggerRect.right;
        const spaceLeft = triggerRect.left;

        // Set vertical position
        const verticalPosition =
          spaceBelow < calendarHeight && spaceAbove > calendarHeight
            ? "top"
            : "bottom";

        // Set horizontal position
        const horizontalPosition =
          spaceRight < calendarWidth && spaceLeft > calendarWidth
            ? "left"
            : "right";

        setPosition({
          vertical: verticalPosition,
          horizontal: horizontalPosition,
        });
      }
    };

    if (showDatepicker) {
      handlePositioning();
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handlePositioning);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handlePositioning);
    };
  }, [showDatepicker]);

  return (
    <div>
      {label && <label className={styles["label__text"]}>{label}</label>}
      <div className="nu-c-pointer nu-position-relative">
        <div
          ref={triggerRef}
          onClick={() => setShowDatepicker(!showDatepicker)}
          role="button"
          tabIndex={0}
        >
          {placeholder ? (
            <Infotile
              title={placeholder}
              rightComponent={
                <div
                  className={cn(styles["right__component"], {
                    [styles["unselected"]]: !date,
                  })}
                >
                  <div className="nu-flex nu-ai-center nu-gap-1">
                    <CalendarDots
                      size={IconSize.M}
                      className="nu-shrink-zero"
                    />
                    <p>
                      {date
                        ? `${convertDate(date?.toString())}`
                        : "Select date"}
                    </p>
                  </div>
                  <CaretDown size={IconSize.S} />
                </div>
              }
            />
          ) : (
            <div
              className={cn(
                styles["right__component"],
                styles["without_placeholder"],
                {
                  [styles["unselected"]]: !date,
                }
              )}
            >
              <div className="nu-flex nu-ai-center nu-gap-1">
                <CalendarDots size={IconSize.M} className="nu-shrink-zero" />
                <p>
                  {date ? `${convertDate(date?.toString())}` : "Select date"}
                </p>
              </div>
              <CaretDown size={IconSize.S} />
            </div>
          )}
        </div>

        {showDatepicker && (
          <div
            className={cn(
              styles["nu-date__picker-main-con"],
              position.vertical === "top"
                ? styles["position-top"]
                : styles["position-bottom"],
              position.horizontal === "left"
                ? styles["position-left"]
                : styles["position-right"]
            )}
            ref={calendarRef}
          >
            <Calendar
              onChange={(value) => onValueChange(value)}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              nextLabel={
                <div className={styles["arrow__container"]}>
                  <CaretRight />
                </div>
              }
              next2Label={
                <div className={cn(`${styles["arrow__container"]} nu-ml-6`)}>
                  <CaretDoubleRight />
                </div>
              }
              prevLabel={
                <div className={styles["arrow__container"]}>
                  <CaretLeft />
                </div>
              }
              prev2Label={
                <div className={cn(`${styles["arrow__container"]} nu-mr-6`)}>
                  <CaretDoubleLeft />
                </div>
              }
            />
            <div className="nu-flex nu-ai-center nu-gap-3 nu-mt-14">
              <Button
                title="Cancel"
                onClick={() => {
                  setShowDatepicker(false);
                  onValueChange(date);
                }}
              />
              <Button
                title="Select"
                onClick={() => {
                  setShowDatepicker(false);
                  const date = new Date(value as Date);
                  date.setHours(date.getHours() + 5);
                  date.setMinutes(date.getMinutes() + 30);
                  onSelect(date.toISOString());
                }}
                buttonType={ButtonType.primary}
                isDisabled={value === null}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
