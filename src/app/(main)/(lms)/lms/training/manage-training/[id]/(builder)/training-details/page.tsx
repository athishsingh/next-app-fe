import TrainingDetails from "@/src/view/main/lms/training/training-builder/training-details/TrainingDetails";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <TrainingDetails id={params.id} />;
};

export default page;
