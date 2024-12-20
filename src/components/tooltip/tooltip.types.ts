export type TooltipProps = {
  children: React.ReactNode;
  rootClassName?: unknown;
  text?: string;
  customRender?: () => React.ReactNode;
  cursorNormal?: boolean;
  xOffset?: number;
  yOffset?: number;
  tooltipFullWidth?: string;
  className?: unknown;
  forceLeft?: boolean;
  forceRight?: boolean;
  forceTop?: boolean;
  forceBottom?: boolean;
  alignArrowBottomRight?: boolean;
  alignArrowBottomLeft?: boolean;
  alignArrowTopRight?: boolean;
  alignArrowTopLeft?: boolean;
  hoverTime?: number;
  immediateHideOnMouseLeave?: boolean;
  hasAction?: boolean;
  globalFixed?: boolean;
  hideArrow?: boolean;
  hasCloseBtn?: boolean;
  type?: "small" | "medium";
  stopCloseOnClick?: boolean;
  disable?: boolean;
};