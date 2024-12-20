import TrainingSessoins from "@/src/view/main/lms/training/training-builder/training-sessions/TrainingSessoins";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <TrainingSessoins id={params.id} />;
};

export default page;
