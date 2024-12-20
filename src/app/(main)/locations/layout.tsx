import LocationsMainLayout from "@/src/layouts/location-layout/locations-main-layout/LocationsMainLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <LocationsMainLayout>{children}</LocationsMainLayout>;
};

export default layout;
