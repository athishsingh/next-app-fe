import CreatePassword from "@/src/view/auth/create-password/CreatePassword";
import React from "react";

const page = ({
  searchParams,
}: {
  searchParams: {
    email: string;
  };
}) => {
  return <CreatePassword _email={searchParams.email || ""} />;
};

export default page;
