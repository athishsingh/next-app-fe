import React from "react";
import styles from "./styles/training-users-table.module.scss";

const TrainingUserCellComponent = ({
  customClassname,
  header,
  description,
}: {
  customClassname: string;
  header: string;
  description: string;
}) => {
  return (
    <div className={styles[customClassname]}>
      <p className={styles["header__text"]}>{header}</p>
      <p className={styles["info__subtext"]}>{description}</p>
    </div>
  );
};

export default TrainingUserCellComponent;
