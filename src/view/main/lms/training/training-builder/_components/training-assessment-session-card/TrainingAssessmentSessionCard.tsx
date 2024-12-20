import React from "react";
import styles from "./training-assessment-sessions.module.scss";
import { cn } from "@/src/utils/class.utils";

const TrainingAssessmentSessionCard = ({
  session_name,
  isSelected,
  onClick,
}: {
  session_name: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(styles["training__assessment-session-card"], {
        [styles["selected"]]: isSelected,
      })}
      onClick={onClick}
    >
      <p>{session_name} </p>
    </div>
  );
};

export default TrainingAssessmentSessionCard;
