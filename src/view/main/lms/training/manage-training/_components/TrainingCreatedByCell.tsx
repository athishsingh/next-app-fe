import React from "react";
import styles from "./training-table.module.scss";

const TrainingCreatedByCell = ({ createdBy }: { createdBy: string }) => {
  return (
    <div className={styles["createdby__main-con"]}>
      <p className={styles["header__text"]}>{createdBy}</p>
      <p className={styles["desc-text"]}>Created by</p>
    </div>
  );
};

export default TrainingCreatedByCell;
