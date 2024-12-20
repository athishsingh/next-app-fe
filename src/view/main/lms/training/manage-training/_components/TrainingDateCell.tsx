import React from "react";
import styles from "./training-table.module.scss";

const TrainingDateCell = ({
  date,
  description,
}: {
  date: string;
  description: string;
}) => {
  return (
    <div className={styles["date__cell"]}>
      <p className={styles["header__text"]}>{date}</p>
      <p className={styles["desc-text"]}>{description}</p>
    </div>
  );
};

export default TrainingDateCell;
