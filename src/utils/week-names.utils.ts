type Weeknames =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

const Weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const smallWeeks = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export const getWeekStartingFrom = ({
  startDay = "Sunday",
  type = "normal",
}: {
  startDay?: Weeknames;
  type?: "normal" | "small";
} = {}) => {
  const weekArray = type === "normal" ? Weeks : smallWeeks;
  const startIndex = Weeks.indexOf(startDay);
  return [...weekArray.slice(startIndex), ...weekArray.slice(0, startIndex)];
};
