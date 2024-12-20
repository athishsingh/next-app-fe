import ForgotPassword from "@/src/view/auth/forgot-password/ForgotPassword";
import React from "react";

const page = ({
  searchParams,
}: {
  searchParams: {
    sent: string;
  };
}) => {
  return <ForgotPassword sent={searchParams.sent} />;
};

export default page;
