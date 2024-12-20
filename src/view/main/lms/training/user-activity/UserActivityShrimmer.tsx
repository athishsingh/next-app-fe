import Shrimmer from "@/src/components/shrimmer/Shrimmer";
import React from "react";

const UserActivityShrimmer = () => {
  return (
    <div className="nu-flex nu-column  nu-gap-5">
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <div key={index}>
            <Shrimmer autoWidth height={80} />
          </div>
        );
      })}
    </div>
  );
};

export default UserActivityShrimmer;
