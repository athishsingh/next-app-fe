import Shrimmer from "@/src/components/shrimmer/Shrimmer";
import React from "react";

const TrainingAssessmentSessionCardLoading = () => {
  return (
    <div className="nu-flex nu-column nu-gap-1">
      {Array.from({ length: 10 }).map((_, index) => {
        return <Shrimmer key={index} autoWidth height={49} />;
      })}
    </div>
  );
};

export default TrainingAssessmentSessionCardLoading;
