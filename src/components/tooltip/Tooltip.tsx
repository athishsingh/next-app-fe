/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styles from "./tooltip.module.scss";

import { X } from "@phosphor-icons/react";
import { useIsometricHook } from "@/src/hooks/useIsometricHook";
import { cn } from "@/src/utils/class.utils";
import { TooltipProps } from "./tooltip.types";

function Tooltip({
  children,
  text,
  customRender,
  cursorNormal = false,
  xOffset = 15,
  yOffset = 12,
  tooltipFullWidth,
  className,
  forceBottom = false,
  forceLeft = false,
  forceRight = false,
  forceTop = false,
  alignArrowBottomRight = false,
  alignArrowBottomLeft = false,
  alignArrowTopRight = false,
  alignArrowTopLeft = false,
  hoverTime = 0,
  immediateHideOnMouseLeave = false,
  hasAction = false,
  rootClassName,
  globalFixed = false,
  hideArrow = true,
  hasCloseBtn = false,
  type = "medium",
  stopCloseOnClick = false,
  disable = false,
}: TooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);

  const handleForceLeft = (
    isRtl: boolean,
    tooltipSize: DOMRect,
    refSize: DOMRect
  ) => {
    if (forceLeft) {
      const isTopOverflow =
        refSize.y + refSize.height / 2 - tooltipSize.height / 2 - yOffset < 0;
      const isBottomOverflow =
        refSize.y + refSize.height / 2 + tooltipSize.height / 2 + yOffset >
        window.innerHeight;

      tooltipRef.current!.style.top = isTopOverflow
        ? `0`
        : `calc(50% - ${tooltipSize.height / 2}px)`;
      tooltipRef.current!.style.bottom = `unset`;
      if (isBottomOverflow) {
        tooltipRef.current!.style.bottom = `0`;
        tooltipRef.current!.style.top = `unset`;
      }
      if (!hideArrow) {
        if (isTopOverflow) {
          arrowRef.current!.style.top = refSize.height / 2 + `px`;
        } else if (isBottomOverflow) {
          arrowRef.current!.style.top = `calc(100% - ${refSize.height / 2}px)`;
        } else {
          arrowRef.current!.style.top = `50%`;
        }
      }
      if (isRtl) {
        tooltipRef.current!.style.left = `unset`;
        tooltipRef.current!.style.right = `calc(100% + ${xOffset}px)`;
        if (!hideArrow) {
          arrowRef.current!.style.left = `unset`;
          arrowRef.current!.style.right = `0px`;
          arrowRef.current!.style.transform = `translate(135%, -50%) rotate(90deg)`;
        }
      } else {
        tooltipRef.current!.style.right = `unset`;
        tooltipRef.current!.style.left = `calc(100% + ${xOffset}px)`;
        if (!hideArrow) {
          arrowRef.current!.style.right = `unset`;
          arrowRef.current!.style.left = `0px`;
          arrowRef.current!.style.transform = `translate(-135%, -50%) rotate(-90deg)`;
        }
      }
      if (!hideArrow) {
        arrowRef.current!.style.bottom = `unset`;
      }
    }
  };

  const handleForceRight = (
    isRtl: boolean,
    tooltipSize: DOMRect,
    refSize: DOMRect
  ) => {
    if (forceRight) {
      const isTopOverflow =
        refSize.y + refSize.height / 2 - tooltipSize.height / 2 - yOffset < 0;
      const isBottomOverflow =
        refSize.y + refSize.height / 2 + tooltipSize.height / 2 + yOffset >
        window.innerHeight;

      tooltipRef.current!.style.top = isTopOverflow
        ? `0`
        : `calc(50% - ${tooltipSize.height / 2}px)`;
      tooltipRef.current!.style.bottom = `unset`;
      if (isBottomOverflow) {
        tooltipRef.current!.style.bottom = `0`;
        tooltipRef.current!.style.top = `unset`;
      }
      if (!hideArrow) {
        if (isTopOverflow) {
          arrowRef.current!.style.top = refSize.height / 2 + `px`;
        } else if (isBottomOverflow) {
          arrowRef.current!.style.top = `calc(100% - ${refSize.height / 2}px)`;
        } else {
          arrowRef.current!.style.top = `50%`;
        }
      }
      if (isRtl) {
        tooltipRef.current!.style.right = `unset`;
        tooltipRef.current!.style.left = `calc(100% + ${xOffset}px)`;
        if (!hideArrow) {
          arrowRef.current!.style.right = `unset`;
          arrowRef.current!.style.left = `-2px`;
          arrowRef.current!.style.transform = `translate(-115%, -50%) rotate(-90deg)`;
        }
      } else {
        tooltipRef.current!.style.left = `unset`;
        tooltipRef.current!.style.right = `calc(100% + ${xOffset}px)`;
        if (!hideArrow) {
          arrowRef.current!.style.left = `unset`;
          arrowRef.current!.style.right = `-2px`;
          arrowRef.current!.style.transform = `translate(115%, -50%) rotate(90deg)`;
        }
      }
      if (!hideArrow) {
        arrowRef.current!.style.bottom = `unset`;
      }
    }
  };

  const updateTooltipPosition = (refSize: DOMRect, tooltipSize: DOMRect) => {
    const yPos = refSize.y - tooltipSize.height - yOffset;
    const xPos = refSize.x - tooltipSize.width / 2 + refSize.width / 2;
    const isRightOverflow = xPos + tooltipSize.width > window.innerWidth;
    const isLeftOverflow = xPos < 0;
    const isTopOverflow = yPos < 0;
    const isRtl = document.querySelector('[dir="rtl"]') !== null;
    if ((isTopOverflow || forceBottom) && !forceTop) {
      tooltipRef.current!.style.bottom = `unset`;
      tooltipRef.current!.style.top = `calc(100% + ${yOffset}px)`;

      if (!hideArrow) {
        arrowRef.current!.style.top = `-6px`;

        arrowRef.current!.style.transform = `translateX(-50%) rotate(0deg) `;
      }
    } else {
      tooltipRef.current!.style.top = `unset`;
      tooltipRef.current!.style.bottom = `calc(100% + ${yOffset}px)`;
      if (!hideArrow) {
        arrowRef.current!.style.bottom = `-6px`;
        arrowRef.current!.style.transform = `translateX(-50%) rotate(180deg)`;
      }
    }
    if (isRightOverflow) {
      tooltipRef.current!.style.right = `${xOffset}px`;
      tooltipRef.current!.style.left = `unset`;
      if (!hideArrow) {
        arrowRef.current!.style.left = `calc(100% - ${refSize.width / 2}px)`;
      }
    } else if (isLeftOverflow) {
      tooltipRef.current!.style.right = `unset`;
      tooltipRef.current!.style.left = `${xOffset}px`;
      if (!hideArrow) {
        arrowRef.current!.style.left = refSize.width / 2 + `px`;
      }
    } else {
      tooltipRef.current!.style.right = `unset`;
      tooltipRef.current!.style.left = `calc(50% - ${tooltipSize.width / 2}px)`;
      if (!hideArrow) {
        arrowRef.current!.style.left = `50%`;
        if (alignArrowBottomLeft) {
          tooltipRef.current!.style.left = `unset`;
          arrowRef.current!.style.left = `unset`;
          arrowRef.current!.style.left = `3%`;
        } else if (alignArrowBottomRight) {
          tooltipRef.current!.style.left = `unset`;
          tooltipRef.current!.style.right = `0%`;
          arrowRef.current!.style.left = `unset`;
          arrowRef.current!.style.right = `0%`;
        } else if (alignArrowTopLeft) {
          tooltipRef.current!.style.left = `unset`;
          tooltipRef.current!.style.right = `0%`;
          arrowRef.current!.style.left = `unset`;
          arrowRef.current!.style.right = `0%`;
        } else if (alignArrowTopRight) {
          tooltipRef.current!.style.left = `unset`;
          arrowRef.current!.style.left = `5%`;
        }
      }
    }
    handleForceLeft(isRtl, tooltipSize, refSize);
    handleForceRight(isRtl, tooltipSize, refSize);
  };

  const handleForceGlobal = (e: MouseEvent, refSize: DOMRect) => {
    const { x, y, width } = refSize;
    tooltipRef.current!.style.top = `${y - yOffset}px`;
    tooltipRef.current!.style.left = `${x + width / 2}px`;
    tooltipRef.current!.style.transform = `translate(-50%,-110%)`;
    if (!hideArrow) {
      arrowRef.current!.style.bottom = "0";
      arrowRef.current!.style.left = "50%";
      arrowRef.current!.style.transform = `translate(-50%, 80%) `;
    }
  };

  const hoverListener = (e: MouseEvent) => {
    const tooltipData = tooltipRef.current?.getBoundingClientRect();
    const childrenData = ref.current!.getBoundingClientRect();
    if (globalFixed) {
      handleForceGlobal(e, childrenData);
      setIsHovering(true);
      return;
    }
    if (tooltipData) {
      updateTooltipPosition(childrenData, tooltipData);
      setIsHovering(true);
    }
  };

  const hideTooltip = () => {
    setIsHovering(false);
    if (immediateHideOnMouseLeave) {
      setShowTooltip(false);
    }
  };

  const listenForScroll = () => {
    setShowTooltip(false);
  };

  const handleTooltipClose = () => {
    setIsHovering(false);
    setShowTooltip(false);
  };

  useEffect(() => {
    if (showTooltip) {
      document.addEventListener("scroll", listenForScroll, true);
    }
    return () => {
      document.removeEventListener("scroll", listenForScroll, true);
    };
  }, [showTooltip]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isTooltipHovered && !disable) {
      timeout = setTimeout(
        () => {
          setShowTooltip(isHovering);
        },
        !isHovering && hasAction ? hoverTime || 200 : hoverTime
      );
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isHovering, hoverTime, hasAction, isTooltipHovered, disable]);

  const onTooltipHover = () => {
    if (hasAction && !disable) {
      setIsTooltipHovered(true);
    }
  };

  const onTooltipFocusOut = () => {
    if (hasAction) {
      setIsTooltipHovered(false);
    }
  };

  useIsometricHook(() => {
    if (disable) return;
    if (tooltipRef.current && hasAction) {
      tooltipRef.current.addEventListener("mouseenter", onTooltipHover);
      tooltipRef.current.addEventListener("mouseleave", onTooltipFocusOut);
    }
    return () => {
      if (tooltipRef.current && hasAction) {
        tooltipRef.current.removeEventListener("mouseenter", onTooltipHover);
        tooltipRef.current.removeEventListener("mouseleave", onTooltipFocusOut);
      }
    };
  }, [tooltipRef.current, disable]);

  useIsometricHook(() => {
    if (disable) return;

    if (ref.current) {
      ref.current.addEventListener("mouseenter", hoverListener);
      ref.current.addEventListener("mouseleave", hideTooltip);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", hoverListener);
        ref.current.removeEventListener("mouseleave", hideTooltip);
      }
    };
  }, [ref.current, disable]);

  useEffect(() => {
    if (disable && showTooltip) {
      setShowTooltip(false);
    }
  }, [disable]);

  const handleOnClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (showTooltip && !stopCloseOnClick) {
      setShowTooltip(false);
    }
  };
  return (
    <div className={cn("nu-position-relative", rootClassName)}>
      <div
        ref={ref}
        style={{
          cursor: cursorNormal ? "auto" : "pointer",
        }}
        className="nu-position-relative"
        onClick={handleOnClick}
      >
        {children}
      </div>
      <div
        ref={tooltipRef}
        className={cn(
          styles["tooltip-con"],
          {
            [styles["visible"]]: showTooltip,
          },
          className
        )}
        style={
          {
            position: globalFixed ? "fixed" : "absolute",
            width: tooltipFullWidth || "max-content",
            padding: type === "medium" ? "2px 0px" : "2px 4px",
          } as React.CSSProperties
        }
      >
        <div className="nu-position-relative">
          {customRender ? (
            customRender()
          ) : (
            <div className="nu-flex nu-gap-1 nu-ai-start">
              {text}
              <div className={styles["close-icon"]}>
                {hasCloseBtn && <X size={14} onClick={handleTooltipClose} />}
              </div>
            </div>
          )}
          {!hideArrow && (
            <div
              className={cn(styles["arrow"], "nu-position-absolute")}
              ref={arrowRef}
            >
              <svg
                width="9"
                height="4"
                viewBox="0 0 9 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 0L8.5 4H0.5L4.5 0Z" fill="#26252B" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
