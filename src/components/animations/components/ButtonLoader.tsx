import React, { CSSProperties } from "react";
import styles from "../styles/animation.module.scss";

function ButtonLoader({
  stroke = "#D26300",
}: {
  stroke: "#D26300" | "#FFFFFF";
}) {
  return (
    <svg className={styles["circular-loader"]} viewBox="25 25 50 50">
      <circle
        className={styles["loader-path"]}
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        style={
          {
            "--stroke-color": stroke,
          } as CSSProperties
        }
      />
    </svg>
  );
}

export default ButtonLoader;
