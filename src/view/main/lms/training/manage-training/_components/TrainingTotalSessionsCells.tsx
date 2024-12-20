import React from "react";
import styles from "./training-table.module.scss";

const TrainingTotalSessionsCells = ({ total }: { total: number }) => {
  return (
    <div className={styles["total__sessions-cell"]}>
      <p className={styles["header__text"]}>
        {total.toString().padStart(2, "0")}
      </p>
      <p className={styles["desc-text"]}>Total sessions</p>
    </div>
  );
};

export default TrainingTotalSessionsCells;
