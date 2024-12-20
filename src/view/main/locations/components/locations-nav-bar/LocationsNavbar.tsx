"use client";
import React, { useState } from "react";
import { LOCATIONS_NAVBAR_ROUTES } from "./locations-navbar-data";
import Tabs from "@/src/components/tabs/Tabs";
import { usePathname } from "next/navigation";
import Header from "@/src/components/header/Header";
import Input from "@/src/components/input/Input";
import { MagnifyingGlass, Plus, UploadSimple } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Button from "@/src/components/button/Button";
import AddLocationDrawer from "../add-location/add-location-drawer/AddLocationDrawer";
import { ButtonType } from "@/src/components/button/types";

const LocationsNavbar = () => {
  const pathName = usePathname();

  const getIsActive = (string: string): boolean => {
    return pathName.includes(string);
  };
  const [showAddLocationDrawer, setShowAddLocationDrawer] =
    useState<boolean>(false);

  const handleAddLocationClick = () => {
    setShowAddLocationDrawer(true);
  };
  return (
    <>
      <Header
        leftComponent={
          <div className="nu-flex nu-h-full nu-gap-1">
            {LOCATIONS_NAVBAR_ROUTES.map((ele) => {
              return (
                <Tabs
                  isActive={getIsActive(ele.key)}
                  route={ele.route}
                  title={ele.name}
                  key={ele.name}
                />
              );
            })}
          </div>
        }
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-5 nu-py-7">
            <Input
              value=""
              onChange={() => {}}
              placeholder="Quick search"
              prefixIcon={<MagnifyingGlass size={IconSize.M} />}
            />
            <Button
              title="Bulk upload"
              onClick={() => {}}
              buttonType={ButtonType.secondary}
              prefixIcon={<UploadSimple size={IconSize.M} />}
            />
            <Button
              title="Add location"
              onClick={handleAddLocationClick}
              prefixIcon={<Plus size={IconSize.M} />}
              buttonType={ButtonType.tertiary}
            />
          </div>
        }
      />
      {showAddLocationDrawer && (
        <AddLocationDrawer
          setShowDrawer={() => setShowAddLocationDrawer(false)}
          showDrawer={showAddLocationDrawer}
        />
      )}
    </>
  );
};

export default LocationsNavbar;
