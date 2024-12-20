"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./time-picker.module.scss";
import { CaretDown } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Button from "../button/Button";
import { ButtonType } from "../button/types";
import {
  addMinutesToTime,
  convertTo12HourFormat,
  convertTo24HourFormat,
  isTimeAfter,
} from "@/src/utils/time.utils";
import { cn } from "@/src/utils/class.utils";

type TimeValuePropType = {
  hour: string;
  minute: string;
  time: string;
};

type MinutesProps =
  | `0${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` // '01' to '09'
  | `${1 | 2 | 3 | 4 | 5}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`; // '10' to '59'

const TimePicker = ({
  timeValue,
  onChange,
  minTime,
  addMinutes = "00",
  isDisabled = false,
  label,
  prefixIcon,
}: {
  timeValue: string;
  onChange: (time: string) => void;
  minTime?: string;
  addMinutes?: MinutesProps;
  isDisabled?: boolean;
  label?: string;
  prefixIcon?: React.ReactNode;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [showTimepicker, setShowTimepicker] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  }>({
    vertical: "bottom",
    horizontal: "right",
  });

  const [valueGroups, setValueGroups] = useState<TimeValuePropType>({
    hour: "01",
    minute: "00",
    time: "AM",
  });

  const [isValid, setIsValid] = useState<boolean>(true);
  const [PickerComponent, setPickerComponent] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("time-picker-scroll").then((mod) =>
        setPickerComponent(() => mod.default)
      );
    }
  }, []);

  useEffect(() => {
    if (isDisabled) return;
    if (timeValue || minTime) {
      if (timeValue) {
        const timeData = convertTo12HourFormat(
          timeValue,
          true
        ) as TimeValuePropType;
        setValueGroups(timeData);
        return;
      }
      if (minTime) {
        const timeData = convertTo12HourFormat(
          addMinutesToTime(minTime, Number(addMinutes), true).time,
          true
        ) as TimeValuePropType;
        setValueGroups(timeData);
        return;
      }
    }
  }, [timeValue, minTime, addMinutes, isDisabled]);

  const minute = useMemo(
    () => Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : `${i}`)),
    []
  );

  const hour = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => (i < 9 ? `0${i + 1}` : `${i + 1}`)),
    []
  );
  const time = ["AM", "PM"];

  useEffect(() => {
    if (isDisabled) return;
    if (minTime) {
      const checkIfValidTime = () => {
        if (addMinutesToTime(minTime, Number(addMinutes) - 1, true).crossing) {
          setIsValid(false);
          return;
        }
        const data = isTimeAfter({
          minTime: addMinutesToTime(minTime, Number(addMinutes) - 1, true).time,
          selectedTime: convertTo24HourFormat(
            `${valueGroups.hour}:${valueGroups.minute} ${valueGroups.time}`
          ) as string,
        });
        setIsValid(data);
      };
      checkIfValidTime();
    }
  }, [valueGroups, minTime, addMinutes, isDisabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShowTimepicker(false);
      }
    };

    const handlePositioning = () => {
      if (triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const timePickerHeight = 300;
        const timePickerWidth = 150;
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;
        const spaceRight = viewportWidth - triggerRect.right;
        const spaceLeft = triggerRect.left;

        const verticalPosition =
          spaceBelow < timePickerHeight && spaceAbove > timePickerHeight
            ? "top"
            : "bottom";

        const horizontalPosition =
          spaceRight < timePickerWidth && spaceLeft > timePickerWidth
            ? "left"
            : "right";

        setPosition({
          vertical: verticalPosition,
          horizontal: horizontalPosition,
        });
      }
    };

    if (showTimepicker) {
      handlePositioning();
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handlePositioning);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handlePositioning);
    };
  }, [showTimepicker]);

  const handleChange = (
    name: "hour" | "minute" | "time",
    value: number | string
  ) => {
    if (isDisabled) return;
    if (valueGroups[name] !== value) {
      setValueGroups({ ...valueGroups, [name]: value });
    }
  };

  return (
    <div>
      {label && <label className={styles["label__text"]}>{label}</label>}
      <div className={cn(styles["time__picker-main-con"])}>
        <button
          ref={triggerRef}
          className={cn(styles["timer__picker-con"], {
            [styles["disabled"]]: isDisabled,
          })}
          onClick={() => {
            if (isDisabled) return;
            setShowTimepicker(!showTimepicker);
          }}
        >
          <div className="nu-flex nu-ai-center nu-gap-1">
            {prefixIcon && prefixIcon}
            <p className={styles["time__text"]}>
              {timeValue
                ? (convertTo12HourFormat(timeValue) as String)
                : "hh:mm aa"}
            </p>
          </div>
          <CaretDown size={IconSize.S} />
        </button>
        {showTimepicker && !isDisabled && PickerComponent && (
          <div
            ref={dropdownRef}
            className={`${styles["time__picker-component"]} ${
              position.vertical === "top"
                ? styles["position-top"]
                : styles["position-bottom"]
            } ${
              position.horizontal === "left"
                ? styles["position-left"]
                : styles["position-right"]
            }`}
          >
            <p className={styles["header__text"]}>Select time</p>
            <div className="nu-position-relative">
              <PickerComponent
                optionGroups={{ hour, minute, time }}
                valueGroups={valueGroups}
                onChange={handleChange}
                itemHeight={44}
                height={156}
                scrollSnap={true}
              />
              <div className={styles["semicolon__text"]}>:</div>
            </div>
            {minTime && (
              <div
                className={cn(styles["error__message-text"], {
                  [styles["valid"]]: isValid,
                })}
              >
                {isValid ? (
                  <p>Please continue...</p>
                ) : (
                  <p>{` ${
                    addMinutesToTime(minTime, Number(addMinutes) - 1, true)
                      .crossing
                      ? "maximum time selected"
                      : `Min time - ${convertTo12HourFormat(
                          addMinutesToTime(minTime, Number(addMinutes)).time
                        )}`
                  }`}</p>
                )}
              </div>
            )}
            <div className="nu-flex nu-ai-center nu-gap-2 nu-w-full">
              <Button
                padding="8px 24px"
                title="Cancel"
                onClick={() => setShowTimepicker(false)}
                buttonType={ButtonType.secondary}
              />
              <Button
                padding="8px 24px"
                title="Apply"
                isDisabled={!isValid}
                onClick={() => {
                  if (onChange) {
                    onChange(
                      convertTo24HourFormat(
                        `${valueGroups.hour}:${valueGroups.minute} ${valueGroups.time}`
                      ) as string
                    );
                  }
                  setShowTimepicker(false);
                }}
                buttonType={ButtonType.primary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
