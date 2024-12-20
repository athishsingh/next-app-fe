import React from "react";
import styles from "./session-attendance-accordion-header.module.scss";
import { getDayInfo } from "@/src/utils/date.utils";

const SessionAttendanceAccordionHeader = ({
  date,
  sessionName,
  isLive = false,
  attendedCount,
}: {
  date: string;
  sessionName: string;
  isLive?: boolean;
  attendedCount?: number;
}) => {
  return (
    <div className={styles["session__accordion-header"]}>
      <div className={styles["date_con"]}>
        <p className={styles["day"]}>{getDayInfo(date).day}</p>
        <p className={styles["date"]}>{getDayInfo(date).date}</p>
      </div>
      <div className="nu-flex nu-column nu-gap-1">
        <p className={styles["session__name"]}>{sessionName}</p>
        {attendedCount && (
          <p className={styles["attended__count"]}>
            Attendance: {attendedCount}
          </p>
        )}
      </div>
      {isLive && (
        <div className={styles["live__main-con"]}>
          <div className={styles["dot__green"]} />
          <p className={styles["live"]}>Live</p>
        </div>
      )}
    </div>
  );
};

export default SessionAttendanceAccordionHeader;
