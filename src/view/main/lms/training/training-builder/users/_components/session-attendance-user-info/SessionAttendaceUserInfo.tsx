"use client";
import Image from "next/image";
import React from "react";
import styles from "./session-attendance-user-info.module.scss";

const SessionAttendaceUserInfo = ({
  name,
  designation,
  imgUrl,
  role,
}: {
  name: string;
  designation: string;
  imgUrl: string;
  role: string;
}) => {
  return (
    <div className={styles["user__info-cell"]}>
      <Image
        src={imgUrl}
        alt="icon"
        width={40}
        height={40}
        className={styles["image__con"]}
      />
      <div className="nu-flex nu-column nu-gap-1">
        <p className={styles["header__text"]}>{name}</p>
        <div className="nu-flex nu-ai-center nu-gap-1">
          <p className={styles["info__text"]}>{role}</p>
          <div className="dot-con"></div>
          <p className={styles["info__text"]}>{designation}</p>
        </div>
      </div>
    </div>
  );
};
export default SessionAttendaceUserInfo;
