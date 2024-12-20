import React from "react";
import styles from "./styles/training-users-table.module.scss";
import Image from "next/image";
import { getCapitalized } from "@/src/utils/general.utils";
import Checkbox from "@/src/components/checkbox/Checkbox";

const TrainingUsersInfoComponent = ({
  name,
  role,
  designation,
  isSelected = false,
  onSelect,
  imgUrl,
}: {
  name: string;
  role: string;
  designation: string;
  isSelected?: boolean;
  onSelect: () => void;
  imgUrl: string;
}) => {
  return (
    <div className={styles["training__user-info-component"]}>
      <Checkbox isSelected={isSelected} onChange={onSelect} />
      <div className="nu-flex nu-ai-center nu-gap-2">
        <Image
          src={imgUrl}
          width={32}
          height={32}
          alt="img-url"
          className={styles["user__img"]}
        />
        <div className="nu-flex nu-column nu-gap-1">
          <p className={styles["header__text"]}>{getCapitalized(name)}</p>
          <div className="nu-flex nu-ai-center nu-gap-1">
            <p className={styles["sub__text"]}>{role}</p>
            <div className="dot-con"></div>
            <p className={styles["info__subtext"]}>{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingUsersInfoComponent;
