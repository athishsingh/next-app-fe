"use client";
import React, { useEffect, useState } from "react";
import Table from "@/src/components/table/Table";
import { ManageLocationData } from "./manage-locations.data";
import { ManageLocationPropsType } from "./manage-locationstypes";
import LocationSectionTableCell from "./_components/location-section-table-cell/LocationSectionTableCell";
import LocationNameTableCell from "./_components/location-name-table-cell/LocationNameTableCell";
import LocationIdTableCell from "./_components/location-id-table-cell/LocationIdTableCell";
import LocationAddressTableCell from "./_components/location-address-table-cell/LocationAddressTableCell";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { NotePencil } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { useRouter } from "nextjs-toploader/app";

const ManageLocations = () => {
  const router = useRouter();
  const [manageLocations, setManageLocations] = useState<
    ManageLocationPropsType[]
  >([]);

  useEffect(() => {
    setManageLocations(ManageLocationData);
  }, []);
  return (
    <div>
      <Table
        rowsWidth={[200, 110, 435, 300]}
        headerText={["Location name", "Location ID", "Address", "Sections"]}
        rows={manageLocations.map((location, index) => ({
          id: index.toString(),
          cells: [
            {
              component: (
                <LocationNameTableCell locationName={location.locationName} />
              ),
            },
            {
              component: (
                <LocationIdTableCell locationId={location.locationId} />
              ),
            },
            {
              component: (
                <LocationAddressTableCell locationAddress={location.address} />
              ),
            },
            {
              component: (
                <LocationSectionTableCell
                  locationSectionsData={location.sections}
                />
              ),
            },
          ],
          rightComponent: (
            <div className="nu-flex nu-ai-center nu-gap-1">
              <Button
                title="Edit"
                onClick={() => {
                  router.push(
                    `/locations/manage-locations/${location.id}/locations`
                  );
                }}
                buttonType={ButtonType.tertiary}
                prefixIcon={<NotePencil size={IconSize.M} />}
              />
            </div>
          ),
        }))}
      />
    </div>
  );
};

export default ManageLocations;
