import { cn } from "@/src/utils/class.utils";
import React, {
  CSSProperties,
  forwardRef,
  ReactElement,
  useCallback,
} from "react";
import styles from "./button.module.scss";
import { noop } from "@/src/utils/general.utils";
import { ButtonProps, ButtonType } from "./types";
import ButtonLoader from "../animations/components/ButtonLoader";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick = noop,
      tabIndex = 0,
      title,
      className,
      isDisabled = false,
      isLoading = false,
      prefixIcon = <></>,
      suffixIcon = <></>,
      buttonType = ButtonType.secondary,
      gap = 8,
      padding = "10px",
      parentWidth = false,
      buttonColor,
    },
    ref
  ): ReactElement => {
    const getDefaultClassNames = useCallback(() => {
      return styles[buttonType.toString()];
    }, [buttonType]);

    const handleOnClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!(isDisabled || isLoading)) {
          onClick(e);
        }
      },
      [onClick, isDisabled, isLoading]
    );

    return (
      <button
        style={
          {
            "--gap": `${gap}px`,
            "--padding": padding,
            ...(buttonColor && {
              "--_button-color": buttonColor,
            }),
          } as CSSProperties
        }
        tabIndex={tabIndex}
        ref={ref}
        onClick={(e) => handleOnClick(e)}
        disabled={isDisabled}
        className={cn(
          styles["button__main"],
          {
            [styles["parent-width"]]: parentWidth,
          },
          getDefaultClassNames(),
          className
        )}
      >
        {isLoading ? (
          <ButtonLoader
            stroke={buttonType === ButtonType.primary ? "#FFFFFF" : "#D26300"}
          />
        ) : (
          <>
            {prefixIcon && prefixIcon}
            <p>{title}</p>
            {suffixIcon && suffixIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
