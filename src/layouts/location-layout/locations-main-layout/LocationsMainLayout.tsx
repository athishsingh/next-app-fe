import LocationsNavbar from "@/src/view/main/locations/components/locations-nav-bar/LocationsNavbar";
import React from "react";

const LocationsMainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LocationsNavbar />
      {children}
    </div>
  );
};

export default LocationsMainLayout;
