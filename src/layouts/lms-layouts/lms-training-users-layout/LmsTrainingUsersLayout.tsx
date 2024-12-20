import TrainingUsersNavbar from "@/src/view/main/lms/training/training-builder/_components/training-users-navbar/TrainingUsersNavbar";
import React from "react";

const LmsTrainingUsersLayout = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <div>
      <TrainingUsersNavbar id={id} />
      {children}
    </div>
  );
};

export default LmsTrainingUsersLayout;
