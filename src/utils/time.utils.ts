export const convertTo12HourFormat = (
  value: string,
  returnObject?: boolean
) => {
  const [hour24, minutes] = value?.split(":").map(Number);
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  if (returnObject) {
    return {
      hour: hour12.toString().padStart(2, "0"),
      minute: minutes?.toString().padStart(2, "0"),
      time: period,
    };
  }
  return `${hour12.toString().padStart(2, "0")}:${minutes
    ?.toString()
    .padStart(2, "0")} ${period}`;
};

export const convertTo24HourFormat = (value: string) => {
  const [time, period] = value.toLowerCase().split(" ");
  let [hour, minutes] = time.split(":").map(Number);
  if (period === "pm" && hour !== 12) {
    hour += 12;
  } else if (period === "am" && hour === 12) {
    hour = 0;
  }
  return `${hour?.toString()?.padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const isTimeAfter = ({
  minTime,
  selectedTime,
}: {
  minTime: string;
  selectedTime: string;
}) => {
  const [minHours, minMinutes] = minTime.split(":").map(Number);
  const [selectedHours, selectedMinutes] = selectedTime.split(":").map(Number);

  if (selectedHours > minHours) return true;
  if (selectedHours < minHours) return false;

  if (selectedMinutes > minMinutes) return true;
  if (selectedMinutes < minMinutes) return false;

  return false;
};
export const addMinutesToTime = (
  time: string,
  minutesToAdd: number,
  shouldCheck?: boolean
): AddMinutesReturnProps => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  if (totalMinutes >= 1440 && (shouldCheck ?? false)) {
    return {
      time,
      crossing: true,
    };
  }
  const formattedHours = String(newHours).padStart(2, "0");
  const formattedMinutes = String(newMinutes).padStart(2, "0");

  return {
    time: `${formattedHours}:${formattedMinutes}`,
    crossing: false,
  };
};

export type AddMinutesReturnProps = { time: string; crossing: boolean };
