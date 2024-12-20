import TrainingAssessment from "@/src/view/main/lms/training/training-builder/training-assessment/TrainingAssessment";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <TrainingAssessment trainingId={params.id} />;
};

export default page;
