import React, { useEffect, useState } from "react";
import styles from "./add-location-drawer.module.scss";
import Drawer from "@/src/components/drawer/Drawer";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import LocationInfoComponent from "../location-info-component/LocationInfoComponent";
import SectionsComponent from "../sections-component/SectionsComponent";
import MembersComponent from "../members-component/MembersComponent";
import { useAddLocationStore } from "@/src/store/main/locations/add-location/useAddLocationStore";
import { getWeekStartingFrom } from "@/src/utils/week-names.utils";
import { CreateLocationTimingProps } from "../location-info-component/location.types";
import { sectionsData } from "../sections-component/sections-data";
import { noop } from "@/src/utils/general.utils";

type Section = "Location info" | "Sections" | "Members";

const AddLocationDrawer = ({
  showDrawer,
  setShowDrawer,
}: {
  showDrawer: boolean;
  setShowDrawer: () => void;
}) => {
  const [selectedSection, setSelectedSection] =
    useState<Section>("Location info");

  const { setLocationTimings, setSections } = useAddLocationStore();

  const generateTimings = () => {
    const weekNames = getWeekStartingFrom();
    let arr: CreateLocationTimingProps[] = [];
    weekNames.forEach((week, index) => {
      arr.push({
        closed: false,
        closing_time: "",
        day: index + 2,
        opening_time: "",
        dayName: week,
      });
    });
    setLocationTimings(arr);
  };

  const getAllSections = () => {
    setSections(sectionsData);
  };

  useEffect(() => {
    generateTimings();
    getAllSections();
  }, []);

  useEffect(() => {
    const alertUser = (e: any) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const sectionUiMap: Record<Section, JSX.Element> = {
    "Location info": <LocationInfoComponent />,
    Sections: <SectionsComponent />,
    Members: <MembersComponent />,
  };

  return (
    <Drawer
      showConfirmationModal
      confirmationModalDetails={{
        title: "Are you sure?",
        subtitle:
          "There's are a lot of unsaved changes, on confirming all the unsaved changes will be lost!",
        onCancelClick: () => {
          console.log("on cancel clicked");
        },
        onConfirmClick: () => {
          console.log("on confirm clicked");
        },
      }}
      headerText="New location"
      visible={showDrawer}
      setVisible={setShowDrawer}
      footerComponent={
        <div>
          <Button
            title="Add location"
            buttonType={ButtonType.primary}
            onClick={noop}
          />
        </div>
      }
    >
      <div className={styles["sections__main-con"]}>
        {["Location info", "Sections", "Members"].map((ele) => {
          return (
            <Button
              title={ele}
              onClick={() => {
                setSelectedSection(ele as Section);
              }}
              key={ele}
              buttonType={
                selectedSection === ele
                  ? ButtonType.tertiary
                  : ButtonType.secondary
              }
            />
          );
        })}
      </div>
      {sectionUiMap[selectedSection]}
    </Drawer>
  );
};

export default AddLocationDrawer;
