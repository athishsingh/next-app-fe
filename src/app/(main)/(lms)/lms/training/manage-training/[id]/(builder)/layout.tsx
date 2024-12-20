import LmsTrainingBuilderLayout from "@/src/layouts/lms-layouts/lms-training-builder-layout/LmsTrainingBuilderLayout";
import React from "react";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;

  params: { id: string };
}) => {
  return (
    <LmsTrainingBuilderLayout id={params.id}>
      {children}
    </LmsTrainingBuilderLayout>
  );
};

export default layout;
