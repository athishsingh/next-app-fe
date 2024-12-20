import Shrimmer from "@/src/components/shrimmer/Shrimmer";
import React from "react";

const TrainingSessionShrimmer = () => {
  return (
    <div className="nu-py-14 nu-px-30 nu-flex nu-column nu-gap-7">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="nu-flex nu-column"
          style={{
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
          }}
        >
          <Shrimmer autoWidth height={74} />
          <div className="nu-border-bottom"></div>
          <Shrimmer autoWidth height={74} />
        </div>
      ))}
    </div>
  );
};

export default TrainingSessionShrimmer;
