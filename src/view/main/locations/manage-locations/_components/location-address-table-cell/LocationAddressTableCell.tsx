import { IconSize } from "@/src/constants/iconsize.constant";
import { MapPinLine } from "@phosphor-icons/react";
import React from "react";
import styles from "./location-address-table-cell.module.scss";

const LocationAddressTableCell = ({
  locationAddress,
}: {
  locationAddress: string;
}) => {
  return (
    <div className={styles["location__address-main-con"]}>
      <MapPinLine
        size={IconSize.M}
        weight="fill"
        color="#D26300"
        className="nu-shrink-zero"
      />
      <p className={styles["location__address-text"]}>{locationAddress}</p>
    </div>
  );
};

export default LocationAddressTableCell;
