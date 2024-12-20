import ManageLocationsEditLayout from "@/src/layouts/location-layout/manage-locations-edit-layout/ManageLocationsEditLayout";
import React from "react";

const layout = ({
  params,
  children,
}: {
  params: { id: string };

  children: React.ReactNode;
}) => {
  return (
    <ManageLocationsEditLayout id={params.id}>
      {children}
    </ManageLocationsEditLayout>
  );
};

export default layout;
