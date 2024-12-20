import Shrimmer from "@/src/components/shrimmer/Shrimmer";
import React from "react";

const TrainingAssessmentCardShrimmer = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <Shrimmer key={i} autoWidth className="nu-w-full" height={210} />
        );
      })}
    </>
  );
};

export default TrainingAssessmentCardShrimmer;
