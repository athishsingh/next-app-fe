import React from "react";
import styles from "./info-tile.module.scss";
import { cn } from "@/src/utils/class.utils";

const Infotile = ({
  title,
  rightComponent,
  classnames,
  parentWidth = false,
}: {
  title: string;
  rightComponent: React.ReactNode;
  classnames?: string;
  parentWidth?: boolean;
}) => {
  return (
    <div
      className={cn(styles["info__tile-main-con"], classnames, {
        [styles["parent-width"]]: parentWidth,
      })}
    >
      <div className="nu-flex nu-ai-center nu-gap-1">
        <p className={styles["title__text"]}>{title}</p>
        <div className={styles["divider-con"]}></div>
      </div>
      {rightComponent}
    </div>
  );
};

export default Infotile;
