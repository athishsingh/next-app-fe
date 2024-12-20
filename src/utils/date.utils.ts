import { getWeekStartingFrom } from "./week-names.utils";

export const convertDate = (str: string) => {
  if (str === null || str == undefined || str === "") return "-";
  const date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("/");
};

export const addDaysToDate = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getDayInfo = (
  date: string
): {
  day: string;
  date: string | undefined;
} => {
  //date should be in yyyy-mm-dd format
  const selectedDate = new Date(date);
  const weekdays = getWeekStartingFrom({ type: "small" });
  const day = weekdays[selectedDate.getDay()];
  return { day: day, date: date.split("-").pop() };
};
