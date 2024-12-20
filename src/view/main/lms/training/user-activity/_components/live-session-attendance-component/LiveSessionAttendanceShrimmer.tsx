import Shrimmer from "@/src/components/shrimmer/Shrimmer";
import React from "react";

const LiveSessionAttendanceShrimmer = () => {
  return (
    <div className="nu-flex nu-w-full nu-column nu-gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <div key={index}>
            <Shrimmer autoWidth height={70} borderRadius={0} />
          </div>
        );
      })}
    </div>
  );
};

export default LiveSessionAttendanceShrimmer;
