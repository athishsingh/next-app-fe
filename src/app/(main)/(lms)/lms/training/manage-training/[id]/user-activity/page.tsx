import UserActivity from "@/src/view/main/lms/training/user-activity/UserActivity";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <UserActivity trainingId={params.id} />;
};

export default page;
