import React from "react";
import styles from "./table.module.scss";
import { TableProps } from "./table.types";
import TableLoadingShrimmer from "./TableLoadingShrimmer";

const Table = ({
  rows,
  rowsWidth = [],
  headerText = [],
  isLoading = false,
  shrimmerRowHeight = 70,
  isTableEmpty = false,
  emptyTableText,
}: TableProps) => {
  if (isLoading)
    return <TableLoadingShrimmer shrimmerHeight={shrimmerRowHeight} />;

  return (
    <div className={styles["table__main-con"]}>
      {headerText.length > 0 && (
        <div className={styles["header__main-con"]}>
          {headerText.map((text, index) => (
            <div
              key={index}
              style={{
                width: rowsWidth[index] ? `${rowsWidth[index]}px` : "auto",
              }}
              className={styles["header__cell"]}
            >
              {text}
            </div>
          ))}
        </div>
      )}
      {rows.map((row) => (
        <div key={row.id} className={styles["row__main-con"]}>
          <div className={styles["row__cells-parent-con"]}>
            {row.cells.map((cell, index) => (
              <div
                key={index}
                style={{
                  width: rowsWidth[index] ? `${rowsWidth[index]}px` : "auto",
                }}
              >
                {cell.component}
              </div>
            ))}
          </div>
          {row.rightComponent && row.rightComponent}
        </div>
      ))}
      {isTableEmpty && !isLoading && (
        <div className="nu-flex nu-ai-center nu-jc-center nu-my-30">
          <p>{emptyTableText}</p>
        </div>
      )}
    </div>
  );
};

export default Table;
