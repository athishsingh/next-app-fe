import React from "react";
import styles from "./training-table.module.scss";
import Image from "next/image";
import { getCapitalized } from "@/src/utils/general.utils";

const TrainingInfoTableCell = ({
  name,
  createdOn,
  category,
  imgUrl,
}: {
  name: string;
  createdOn: string;
  category: string;
  imgUrl: string;
}) => {
  return (
    <div className={styles["training__info-cell"]}>
      <Image
        src={imgUrl}
        alt="icon"
        width={40}
        height={40}
        className={styles["image__con"]}
      />
      <div className="nu-flex nu-column nu-gap-1">
        <p className={styles["header__text"]}>{getCapitalized(name)}</p>
        <div className="nu-flex nu-ai-center nu-gap-1">
          <p className={styles["desc-text"]}>Created on: {createdOn}</p>
          {/* <div className="dot-con"></div>
          <p className={styles["desc-text"]}>{category}</p> */}
        </div>
      </div>
    </div>
  );
};

export default TrainingInfoTableCell;
