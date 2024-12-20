/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./drawer.module.scss";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { noop } from "@/src/utils/general.utils";
import IconButton from "../icon-button/IconButton";
import ConfirmationModal from "../confirmation-modal/ConfirmationModal";

type ConfirmationModalProps = {
  title: string;
  subtitle?: string;
  onCancelClick?: () => void;
  onConfirmClick?: () => void;
};

const Drawer = ({
  visible,
  setVisible,
  children,
  showConfirmationModal = false,
  headerText,
  footerComponent,
  width = 430,
  autoWidth = false,
  confirmationModalDetails,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: React.ReactNode;
  showConfirmationModal?: boolean;
  headerText: string;
  footerComponent?: React.ReactNode;
  width?: number;
  autoWidth?: boolean;
  confirmationModalDetails?: ConfirmationModalProps;
}) => {
  const [domReady, setDomReady] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !showConfirmationModal) {
        setVisible(false);
      }
    };
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [visible, showConfirmationModal, setVisible]);

  useEffect(() => {
    if (visible) {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      if (!showConfirmModal) {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement) activeElement.blur();
        setTimeout(() => {
          focusRef.current?.focus();
        }, 300);
      }
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollPosition);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [visible]);

  const handleClose = () => {
    if (showConfirmationModal) {
      setShowConfirmModal(true);
      return;
    }
    setVisible(false);
  };

  if (!visible) return null;
  return domReady
    ? createPortal(
        <>
          <div
            className={styles["drawer__main-container"]}
            onClick={handleClose}
          >
            <div
              ref={focusRef}
              tabIndex={-1}
              className={styles["drawer__con"]}
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={
                {
                  "--drawer-width": autoWidth ? "auto" : `${width}px`,
                } as CSSProperties
              }
            >
              <div className={styles["header__main-con"]}>
                <p>{headerText}</p>
                <IconButton
                  icon={
                    <X
                      size={IconSize.L}
                      tabIndex={0}
                      role="button"
                      className="nu-c-pointer"
                    />
                  }
                  onClick={handleClose}
                />
              </div>
              <div className={styles["drawer__children-container"]}>
                {children}
              </div>
              {footerComponent && (
                <div className={styles["footer__container"]}>
                  {footerComponent}
                </div>
              )}
            </div>
          </div>
          {showConfirmModal && (
            <ConfirmationModal
              isConfirmModal={showConfirmationModal}
              description={confirmationModalDetails?.subtitle || ""}
              header={confirmationModalDetails?.title}
              visible={showConfirmModal}
              setVisible={noop}
              onCancelClick={() => {
                setShowConfirmModal(false);
                if (confirmationModalDetails?.onCancelClick) {
                  confirmationModalDetails.onCancelClick();
                }
              }}
              onConfirmClick={() => {
                setShowConfirmModal(false);
                setVisible(false);
                if (confirmationModalDetails?.onConfirmClick) {
                  confirmationModalDetails.onConfirmClick();
                }
              }}
            />
          )}
        </>,
        document.getElementById("nymbleup-portal")!
      )
    : null;
};

export default Drawer;
