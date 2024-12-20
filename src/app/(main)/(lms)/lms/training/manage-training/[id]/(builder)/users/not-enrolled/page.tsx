import NotEnrolledUsers from "@/src/view/main/lms/training/training-builder/users/not-enrolled-users/NotEnrolledUsers";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <NotEnrolledUsers trainingId={params.id} />;
};

export default page;
