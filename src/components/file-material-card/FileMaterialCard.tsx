import React from "react";
import styles from "./file-material-card.module.scss";
import Image from "next/image";
import IconButton from "@/src/components/icon-button/IconButton";
import { Trash } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";

const FileMaterialCard = ({
  mediaLength,
  mediaName,
  mediaType,
  onDeleteClick,
}: {
  mediaName: string;
  mediaType: string;
  mediaLength: string;
  onDeleteClick: () => void;
}) => {
  const getIconPath = (mediaType: string): string => {
    switch (mediaType) {
      case "pdf":
        return "/icons/pdf.svg";
      case "ppt":
        return "/icons/ppt.svg";
      case "image":
        return "/icons/image.svg";
      case "video":
        return "/icons/video.svg";
      default:
        return "/icons/pdf.svg";
    }
  };

  return (
    <div className={styles["session__material-main-con"]}>
      <div className="nu-flex nu-gap-2 nu-ai-center">
        <Image
          src={getIconPath(mediaType)}
          draggable={false}
          alt={mediaType}
          width={18}
          height={18}
        />
        <div>
          <p className={styles["name"]}>{mediaName}</p>
          <div className="nu-flex nu-ai-center nu-h-full nu-gap-1">
            <p className={styles["format"]}>{mediaType}</p>
            <div className={styles["divider__con"]}></div>
            <p className={styles["length"]}>{mediaLength}</p>
          </div>
        </div>
      </div>
      <IconButton
        icon={
          <div className={styles["delete__icon"]}>
            <Trash size={IconSize.M} />
          </div>
        }
        onClick={onDeleteClick}
      />
    </div>
  );
};

export default FileMaterialCard;
