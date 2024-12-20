import React from "react";
import styles from "./sections-component.module.scss";
import { useAddLocationStore } from "@/src/store/main/locations/add-location/useAddLocationStore";
import Toggle from "@/src/components/toggle/Toggle";
import { cn } from "@/src/utils/class.utils";

const SectionsComponent = () => {
  const { sections, selectedSections, setSelectedSections } =
    useAddLocationStore();
  return (
    <div className={styles["sections__main-info"]}>
      <p className={styles["sections__header"]}>Sections info</p>
      <div className={styles["sections__parent-container"]}>
        {sections.map((section) => {
          return (
            <div key={section} className={styles["section__container"]}>
              <p
                className={cn(styles["section__name"], {
                  [styles["selected"]]: selectedSections.includes(section),
                })}
              >
                {section}
              </p>
              <div className={styles["divider"]} />
              <Toggle
                checked={selectedSections.includes(section)}
                onChange={(value) => {
                  if (value === true) {
                    setSelectedSections([...selectedSections, section]);
                  } else {
                    setSelectedSections(
                      selectedSections.filter((e) => e !== section)
                    );
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionsComponent;
