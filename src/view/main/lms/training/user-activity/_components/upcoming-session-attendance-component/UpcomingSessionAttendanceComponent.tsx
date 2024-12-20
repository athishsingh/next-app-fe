"use client";
import React, { useState } from "react";
import styles from "./upcoming-session-attendance-component.module.scss";
import Accordion from "@/src/components/accordion/Accordion";
import SessionAttendanceAccordionHeader from "../session-attendance-accordion-header/SessionAttendanceAccordionHeader";

const UpcomingSessionAttendanceComponent = ({
  trainingId,
  sessionDate,
  sessionId,
  sessionName,
}: {
  trainingId: string;
  sessionId: string;
  sessionName: string;
  sessionDate: string;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className={styles["upcoming__session-main-con"]}>
      <Accordion
        foreignVisible={isVisible}
        onChange={() => setIsVisible(!isVisible)}
        header={
          <SessionAttendanceAccordionHeader
            date={sessionDate}
            sessionName={sessionName}
          />
        }
      >
        <div className={styles["filters__con"]}></div>
        <div className="nu-py-30 nu-flex nu-ai-center nu-w-full nu-jc-center">
          <p>
            This is an upcoming session, Please come back after session is
            completed
          </p>
        </div>
      </Accordion>
    </div>
  );
};

export default UpcomingSessionAttendanceComponent;
