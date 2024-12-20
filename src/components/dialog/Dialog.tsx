/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./dialog.module.scss";
import { createPortal } from "react-dom";

const Modal = ({
  visible,
  setVisible,
  children,
  blockClosing = false,
  width = "auto",
  isConfirmModal = false,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: React.ReactNode;
  blockClosing?: boolean;
  width?: string;
  isConfirmModal?: boolean;
}) => {
  const [domReady, setDomReady] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !blockClosing) {
        setVisible(false);
      }
    };
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [visible, blockClosing, setVisible]);

  useEffect(() => {
    if (isConfirmModal) return;
    if (visible && !isConfirmModal) {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) activeElement.blur();
      focusRef.current?.focus();
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
  }, [visible, isConfirmModal]);

  useEffect(() => {
    if (blockClosing && visible) {
      const alertUser = (e: any) => {
        e.preventDefault();
        e.returnValue = "";
      };
      window.addEventListener("beforeunload", alertUser);
      return () => {
        window.removeEventListener("beforeunload", alertUser);
      };
    }
  }, [blockClosing, visible]);

  if (!visible) return null;

  return domReady
    ? createPortal(
        <>
          <div
            className={`${styles["modal__main-con"]}`}
            onClick={() => {
              if (blockClosing) return;
              setVisible(false);
            }}
          >
            <div
              className={styles["modal__child-con"]}
              style={
                {
                  "--_modal-width": width,
                } as CSSProperties
              }
              onClick={(e) => {
                e.stopPropagation();
              }}
              ref={focusRef}
              tabIndex={-1}
            >
              {children}
            </div>
          </div>
        </>,
        document.getElementById("nymbleup-portal")!
      )
    : null;
};

export default Modal;
