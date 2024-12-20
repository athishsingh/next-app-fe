import React from "react";
import IconButton from "../icon-button/IconButton";
import styles from "./pagination.module.scss";
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { PAGE_LIMIT } from "@/src/constants/general";

const Pagination = ({
  currentPage,
  totalCount,
  onNextClick,
  onPreviousClick,
  onSkipFirstClicked,
  onSkipLastClicked,
}: {
  currentPage: number;
  totalCount: number;
  onSkipLastClicked: (pageNumber: number) => void;
  onSkipFirstClicked: (pageNumber: number) => void;
  onNextClick: (pageNumber: number) => void;
  onPreviousClick: (pageNumber: number) => void;
}) => {
  const totalPages = Math.ceil(totalCount / PAGE_LIMIT);

  if (totalPages <= 1) return null;

  return (
    <div className="nu-w-full nu-flex nu-jc-end nu-px-15 nu-mb-10">
      <div className="nu-flex nu-ai-center nu-gap-5">
        <div className="nu-flex nu-ai-center nu-gap-3">
          <IconButton
            icon={
              <div className={styles["icon__button-con"]}>
                <CaretDoubleLeft size={IconSize.S} color="#18181B" />
              </div>
            }
            onClick={() => onSkipFirstClicked(1)}
            isDisabled={currentPage === 1}
          />

          <IconButton
            icon={
              <div className={styles["icon__button-con"]}>
                <CaretLeft size={IconSize.S} color="#18181B" />
              </div>
            }
            onClick={() => onPreviousClick(currentPage - 1)}
            isDisabled={currentPage === 1}
          />
        </div>

        <p
          className={styles["page__count-text"]}
        >{`Page ${currentPage} of ${totalPages}`}</p>

        <div className="nu-flex nu-ai-center nu-gap-3">
          <IconButton
            icon={
              <div className={styles["icon__button-con"]}>
                <CaretRight size={IconSize.S} color="#18181B" />
              </div>
            }
            onClick={() => onNextClick(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          />

          <IconButton
            icon={
              <div className={styles["icon__button-con"]}>
                <CaretDoubleRight size={IconSize.S} color="#18181B" />
              </div>
            }
            onClick={() => onSkipLastClicked(totalPages)}
            isDisabled={currentPage === totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
