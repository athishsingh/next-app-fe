import { DateSelectionType } from "./DateRangePicker";

export const generateDateRange = (
  rangeOptionSelected: string
): DateSelectionType => {
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const oneDayInMs = 24 * 60 * 60 * 1000; // One day in milliseconds

  let startDate: Date | undefined = undefined;
  let endDate: Date | undefined = undefined;

  switch (rangeOptionSelected) {
    case "today":
      startDate = startOfToday;
      endDate = new Date();
      break;
    case "yesterday":
      startDate = new Date(startOfToday.getTime() - oneDayInMs);
      endDate = new Date(today.getTime() - oneDayInMs);
      break;
    case "last7days":
      startDate = new Date(today.getTime() - 7 * oneDayInMs);
      endDate = new Date();
      break;
    case "thismonth":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date();
      break;
    case "lastmonth":
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endDate = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of the previous month
      break;
    case "last3months":
      startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
      endDate = new Date();
      break;
    case "last365days":
      startDate = new Date(today.getTime() - 365 * oneDayInMs);
      endDate = new Date();
      break;

    default:
      break;
  }

  return {
    startDate,
    endDate,
    key: "selection",
  };
};
