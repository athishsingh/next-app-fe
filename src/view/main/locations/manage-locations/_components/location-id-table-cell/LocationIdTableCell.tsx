import React from "react";
import styles from "./location-id-table-cell.module.scss";

const LocationIdTableCell = ({ locationId }: { locationId: string }) => {
  return (
    <div className={styles["location__id-main-con"]}>
      <p className={styles["location__id-text"]}>{locationId}</p>
    </div>
  );
};

export default LocationIdTableCell;
