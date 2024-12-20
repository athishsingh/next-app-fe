"use client";
import React, { CSSProperties, useEffect, useState } from "react";
import styles from "./toast.module.scss";
import ReactDOM from "react-dom";
import { useToastStore } from "@/src/store/toast/useToastStore";
import { ToastType } from "./toast.enum";
import { cn } from "@/src/utils/class.utils";
import SuccessGif from "../../../public/json/success.json";
import BellGif from "../../../public/json/bell.json";
import AlertGif from "../../../public/json/alert.json";
import WarningGif from "../../../public/json/warning.json";
import { getCapitalized } from "@/src/utils/general.utils";
import { LottieClient } from "../lottie/Lottie";
import IconButton from "../icon-button/IconButton";
import { X } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  const iconMap: Record<ToastType, React.ReactNode> = {
    [ToastType.success]: (
      <LottieClient
        animationData={SuccessGif}
        style={{
          height: `34px`,
        }}
      />
    ),
    [ToastType.warning]: (
      <LottieClient
        animationData={WarningGif}
        style={{
          height: `34px`,
        }}
      />
    ),
    [ToastType.error]: (
      <LottieClient
        animationData={AlertGif}
        style={{
          height: `34px`,
        }}
      />
    ),
    [ToastType.default]: (
      <LottieClient
        animationData={BellGif}
        style={{
          height: `34px`,
        }}
      />
    ),
  };

  if (typeof window === "undefined") return null;
  const portalRoot = document.getElementById("nymbleup-toast-portal");

  if (!portalRoot) return null;

  return domReady
    ? ReactDOM.createPortal(
        <>
          {(toasts ?? []).map((toast, index) => {
            return (
              <div
                key={toast.id}
                className={cn(styles["toast"], styles[toast.toastType])}
                style={
                  {
                    top: `calc(20px + ${index * 70}px)`,
                    "--delay-sec": `calc(${toast.duration - 300}ms)`,
                  } as CSSProperties
                }
              >
                <div className="nu-flex nu-ai-start nu-gap-3 nu-shrink-zero">
                  {iconMap[toast.toastType]}
                  <div className="nu-flex nu-column nu-gap-1 nu-flex-one">
                    <p className={styles["toast__title"]}>
                      {getCapitalized(toast.message)}
                    </p>
                    <p className={styles["toast__description"]}>
                      {getCapitalized(toast.description)}
                    </p>
                  </div>
                  <IconButton
                    icon={<X size={IconSize.M} />}
                    onClick={() => removeToast(toast.id)}
                  />
                </div>
              </div>
            );
          })}
        </>,
        portalRoot
      )
    : null;
};

export default ToastContainer;
