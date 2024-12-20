import { PAGE_LIMIT } from "@/src/constants/general";
import React from "react";
import Shrimmer from "../shrimmer/Shrimmer";

const TableLoadingShrimmer = ({
  shrimmerHeight = 70,
}: {
  shrimmerHeight?: number;
}) => {
  return (
    <div className="nu-flex nu-gap-1 nu-column">
      {Array.from({ length: PAGE_LIMIT }).map((_, index) => {
        return <Shrimmer key={index} autoWidth height={shrimmerHeight} />;
      })}
    </div>
  );
};

export default TableLoadingShrimmer;
