import React from "react";
import styles from "./support-modal.module.scss";
import { cn } from "@/src/utils/class.utils";
import { IconSize } from "@/src/constants/iconsize.constant";
import { X } from "@phosphor-icons/react";

const SupportModal = ({ onCloseClick }: { onCloseClick: () => void }) => {
  return (
    <div className={styles["support__modal--main-con"]}>
      <div
        className={cn(
          `${styles["header__container"]}
          nu-w-full nu-flex nu-ai-center nu-jc-sb nu-px-10`
        )}
      >
        <p className={styles["header__text"]}>Support</p>
        <X
          size={IconSize.L}
          onClick={onCloseClick}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onCloseClick();
            }
          }}
          role="button"
          tabIndex={0}
        />
      </div>
      <div className={styles["support__main-container"]}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum amet
          laboriosam excepturi deserunt rem. Corporis voluptatum, eos reiciendis
          quaerat quidem optio exercitationem, molestiae assumenda aspernatur
          cupiditate aliquid et obcaecati ea.
        </p>
      </div>
    </div>
  );
};

export default SupportModal;
