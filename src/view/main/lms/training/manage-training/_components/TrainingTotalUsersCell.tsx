import React from "react";
import styles from "./training-table.module.scss";

const TrainingTotalUsersCell = ({ totalUsers }: { totalUsers: number }) => {
  return (
    <div className={styles["total__users-cell"]}>
      <p className={styles["header__text"]}>
        {totalUsers.toString().padStart(2, "0")}
      </p>
      <p className={styles["desc-text"]}>Total users</p>
    </div>
  );
};

export default TrainingTotalUsersCell;
