import LmsTrainingUsersLayout from "@/src/layouts/lms-layouts/lms-training-users-layout/LmsTrainingUsersLayout";
import React from "react";

const layout = ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  return (
    <LmsTrainingUsersLayout id={params.id}>{children}</LmsTrainingUsersLayout>
  );
};

export default layout;
