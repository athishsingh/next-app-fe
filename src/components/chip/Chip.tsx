import React from "react";
import styles from "./chip.module.scss";
import { cn } from "@/src/utils/class.utils";

const Chip = ({ title, classname }: { title: string; classname?: string }) => {
  return <div className={cn(styles["chip__main-con"], classname)}>{title}</div>;
};

export default Chip;
