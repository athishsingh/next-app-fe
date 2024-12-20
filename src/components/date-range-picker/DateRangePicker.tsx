import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import React, { useEffect, useState } from "react";
import styles from "./date-range-picker.module.scss";
import Modal from "../dialog/Dialog";
import { dateRangeOptions } from "./date-range-picker-data";
import { cn } from "@/src/utils/class.utils";
import { DateRange } from "react-date-range";
import { generateDateRange } from "./date-range-picker.utils";
import Button from "../button/Button";
import { ButtonType } from "../button/types";
import { convertDate } from "@/src/utils/date.utils";

export type DateSelectionType = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
};

const DateRangePicker = ({
  startDate,
  endDate,
  onDateSelect,
  minDate = undefined,
  maxDate = undefined,
}: {
  startDate: string;
  endDate: string;
  minDate?: Date;
  maxDate?: Date;
  onDateSelect: (val: {
    endDate: string | undefined;
    startDate: string | undefined;
  }) => void;
}) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [rangeOptionSelected, setRangeOptionSelected] =
    useState<string>("today");

  const [state, setState] = useState<DateSelectionType[]>([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (rangeOptionSelected !== "customrange") {
      const newDateRange = generateDateRange(rangeOptionSelected);
      setState([newDateRange]);
    }
  }, [rangeOptionSelected]);

  useEffect(() => {
    if (startDate && endDate) {
      setRangeOptionSelected("customrange");
      setState([
        {
          endDate: new Date(endDate),
          startDate: new Date(startDate),
          key: "selection",
        },
      ]);
    }
  }, [startDate, endDate]);

  const getFormattedDate = (value: Date) => {
    const date = new Date(value as Date);
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    return date.toISOString();
  };

  return (
    <>
      <div
        onClick={() => {
          setShowPicker(true);
        }}
      >
        DateRangePicker
      </div>
      <Modal
        width="533px"
        visible={showPicker}
        setVisible={() => {
          setShowPicker(false);
        }}
      >
        <div className={styles["date__range-main-con"]}>
          <div className={styles["left__container"]}>
            <h1 className={styles["header__text"]}>Select a range</h1>
            <div className={styles["range__options-main-con"]}>
              {dateRangeOptions.map((range) => {
                return (
                  <button
                    key={range.value}
                    onClick={() => setRangeOptionSelected(range.value)}
                    className={cn(styles["options__con"], {
                      [styles["selected"]]: range.value === rangeOptionSelected,
                    })}
                  >
                    <p>{range.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className={styles["right__container"]}>
            <DateRange
              showMonthAndYearPickers={false}
              editableDateInputs={true}
              showDateDisplay={false}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(item) => {
                setRangeOptionSelected("customrange");
                setState([
                  {
                    startDate: item.selection.startDate,
                    endDate: item.selection.endDate,
                    key: item.selection.key || "selection",
                  },
                ]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
              rangeColors={["#D26300"]}
            />
            <div className="nu-flex nu-ai-center nu-jc-sb nu-gap-1 nu-mb-14">
              <p className={styles["start__end-date-text"]}>
                Start date:{" "}
                <span className={styles["selected"]}>{`${
                  state[0].startDate
                    ? convertDate(state[0].startDate.toString())
                    : "--/--/----"
                }`}</span>
              </p>
              <p className={styles["start__end-date-text"]}>
                End date:{" "}
                <span className={styles["selected"]}>{`${
                  state[0].endDate
                    ? convertDate(state[0].endDate.toString())
                    : "--/--/----"
                }`}</span>
              </p>
            </div>
            <div className="nu-flex nu-ai-center nu-jc-sb nu-gap-2">
              <Button
                title="Cancel"
                onClick={() => {
                  setState([
                    {
                      endDate: new Date(endDate),
                      startDate: new Date(startDate),
                      key: "selection",
                    },
                  ]);
                  setShowPicker(false);
                }}
                buttonType={ButtonType.secondary}
              />
              <Button
                title="Apply"
                onClick={() => {
                  const [data] = state;
                  onDateSelect({
                    startDate: getFormattedDate(data.startDate!),
                    endDate: getFormattedDate(data.endDate!),
                  });
                  setShowPicker(false);
                }}
                buttonType={ButtonType.primary}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DateRangePicker;
