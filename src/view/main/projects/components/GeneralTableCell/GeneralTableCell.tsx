import React from "react";
import styles from "./GeneralTableCell.module.scss";

const GeneralTableCell = ({ cellValue, header }: { header: string; cellValue: string }) => {
    return (
        <div className={styles["general__main-con"]}>
            <p className={styles["header__text"]}>{cellValue}</p>
            <p className={styles["subtext"]}>{header}</p>
        </div>
    );
};

export default GeneralTableCell;
