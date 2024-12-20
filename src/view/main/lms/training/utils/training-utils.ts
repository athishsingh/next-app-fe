export const isCurrentTimeInSession = (
  sessionDate: string,
  sessionStartTime: string,
  sessionEndTime: string
): boolean => {
  const sessionStart = new Date(`${sessionDate}T${sessionStartTime}`);
  const sessionEnd = new Date(`${sessionDate}T${sessionEndTime}`);
  const now = new Date();

  return now >= sessionStart && now <= sessionEnd;
};

export const getSessionOrCourseStatus = (
  sessionStartDate: string,
  sessionEndDate: string,
  sessionStartTime: string,
  sessionEndTime: string
): "live" | "completed" | "upcoming" => {
  const sessionStart = new Date(`${sessionStartDate}T${sessionStartTime}`);
  const sessionEnd = new Date(`${sessionEndDate}T${sessionEndTime}`);
  const now = new Date();

  if (now >= sessionStart && now <= sessionEnd) {
    return "live";
  } else if (now > sessionEnd) {
    return "completed";
  } else {
    return "upcoming";
  }
};
