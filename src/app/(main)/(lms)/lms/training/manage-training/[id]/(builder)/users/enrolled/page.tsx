import EnrolledUsers from "@/src/view/main/lms/training/training-builder/users/enrolled-users/EnrolledUsers";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <EnrolledUsers trainingId={params.id} />;
};

export default page;
