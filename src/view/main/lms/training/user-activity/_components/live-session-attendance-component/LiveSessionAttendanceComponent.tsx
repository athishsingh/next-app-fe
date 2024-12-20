import React, { useState } from "react";
import styles from "./live-session-attendance-component.module.scss";
import Accordion from "@/src/components/accordion/Accordion";
import SessionAttendanceAccordionHeader from "../session-attendance-accordion-header/SessionAttendanceAccordionHeader";

const LiveSessionAttendanceComponent = ({
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
    <div className={styles["live__session-main-con"]}>
      <Accordion
        foreignVisible={isVisible}
        onChange={() => setIsVisible(!isVisible)}
        header={
          <SessionAttendanceAccordionHeader
            date={sessionDate}
            sessionName={sessionName}
            isLive
          />
        }
      >
        <div className={styles["filters__con"]}></div>
        <div className="nu-py-30 nu-flex nu-ai-center nu-w-full nu-jc-center">
          <p>You can view the user activity once the session is completed</p>
        </div>
      </Accordion>
    </div>
  );
};

export default LiveSessionAttendanceComponent;
