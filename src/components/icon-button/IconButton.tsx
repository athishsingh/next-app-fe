import { cn } from "@/src/utils/class.utils";
import React from "react";
import styles from "./icon-button.module.scss";

const IconButton = ({
  icon,
  classnames,
  onClick,
  isDisabled = false,
}: {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  classnames?: string;
  isDisabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(styles["icon__button"], classnames, {
        [styles["disabled"]]: isDisabled,
      })}
    >
      {icon}
    </button>
  );
};

export default IconButton;
