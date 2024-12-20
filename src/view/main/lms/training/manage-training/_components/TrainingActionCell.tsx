"use client";
import React from "react";
import styles from "./training-table.module.scss";
import { useRouter } from "nextjs-toploader/app";
import { IconSize } from "@/src/constants/iconsize.constant";
import { Info, NotePencil } from "@phosphor-icons/react";
import IconButton from "@/src/components/icon-button/IconButton";

const TrainingActionCell = ({
  id,
  showActivityButton = false,
}: {
  id: string;
  showActivityButton?: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="nu-flex nu-ai-center nu-gap-8">
      {showActivityButton && (
        <IconButton
          onClick={() => {
            router.push(`/lms/training/manage-training/${id}/user-activity`);
          }}
          icon={
            <div className="nu-flex nu-ai-center nu-gap-1">
              <Info size={IconSize.M} color="#8E8EA9" />
              <p className={styles["info__text"]}>View activities</p>
            </div>
          }
        />
      )}
      <button
        className={styles["button__main-con"]}
        onClick={() => {
          router.push(`/lms/training/manage-training/${id}/training-details`);
        }}
      >
        <NotePencil size={IconSize.M} color="#8E8EA9" />
        <p className={styles["edit__text"]}>Edit</p>
      </button>
    </div>
  );
};

export default TrainingActionCell;
