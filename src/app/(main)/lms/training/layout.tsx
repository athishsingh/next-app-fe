import React from "react";
import TrainingSubNavbar from "./_components/training-sub-navbar/TrainingSubNavbar";
import TrainingNavbar from "./_components/training-navbar/TrainingNavbar";

type Props = { children: React.ReactNode };

const layout = ({ children }: Props) => {
  return (
    <div>
      <TrainingNavbar />
      <TrainingSubNavbar />
      {children}
    </div>
  );
};

export default layout;
