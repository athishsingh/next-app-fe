"use client";
import React from "react";
import { coursesTabsData } from "../../data/courses-tabs.data";
import Tabs from "@/src/components/tabs/Tabs";
import { usePathname } from "next/navigation";

function CoursesSubNavBar() {
  const pathName = usePathname();
  const getIsActive = (route: string) => {
    return pathName.includes(route);
  };
  return (
    <div className="nu-flex nu-gap-8 nu-h-full">
      {coursesTabsData.map((coursesTab) => {
        return (
          <div className="nu-f-center nu-h-full" key={coursesTab.name}>
            <Tabs
              isActive={getIsActive(coursesTab.route)}
              route={coursesTab.route}
              title={coursesTab.name}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CoursesSubNavBar;
