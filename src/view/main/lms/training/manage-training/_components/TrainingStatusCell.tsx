import React from "react";
import styles from "./training-table.module.scss";

const TrainingStatusCell = ({
  status,
}: {
  status: "live" | "upcoming" | "completed" | "-";
}) => {
  return (
    <div className={styles["status__cell"]}>
      <p className={`${styles["header__text"]} ${styles[status]}`}>{status}</p>
      <p className={styles["desc-text"]}>Status</p>
    </div>
  );
};

export default TrainingStatusCell;
