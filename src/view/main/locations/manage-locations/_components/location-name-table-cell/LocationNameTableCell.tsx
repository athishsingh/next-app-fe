import React from "react";
import styles from "./location-name-table-cell.module.scss";

const LocationNameTableCell = ({ locationName }: { locationName: string }) => {
  return (
    <div className={styles["location__name-main-container"]}>
      <p className={styles["location__name-text"]}>{locationName}</p>
    </div>
  );
};

export default LocationNameTableCell;
