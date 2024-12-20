"use client";
import Header from "@/src/components/header/Header";
import { usePathname } from "next/navigation";
import React from "react";
import { trainingTabsData } from "../data/training-tabs.data";
import Tabs from "@/src/components/tabs/Tabs";
import Input from "@/src/components/input/Input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";

const TrainingSubNavbar = () => {
  const pathName = usePathname();
  const getIsActive = (route: string) => {
    return pathName.includes(route);
  };
  const { searchTraining, setSearchTraining } = useLmsTrainingStore();
  return (
    <>
      <Header
        leftComponent={
          <div className="nu-flex nu-gap-8 nu-h-full">
            {trainingTabsData.map((trainingTab) => {
              return (
                <div
                  className="nu-f-center nu-h-full"
                  key={trainingTab.name}
                  onClick={() => {
                    const isActive = getIsActive(trainingTab.route);
                    if (isActive) return;
                    setSearchTraining("");
                  }}
                >
                  <Tabs
                    isActive={getIsActive(trainingTab.route)}
                    route={trainingTab.route}
                    title={trainingTab.name}
                  />
                </div>
              );
            })}
          </div>
        }
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-2 nu-my-7">
            <Input
              prefixIcon={<MagnifyingGlass size={IconSize.M} />}
              value={searchTraining}
              onChange={setSearchTraining}
              placeholder="Search training"
            />
          </div>
        }
      />
    </>
  );
};

export default TrainingSubNavbar;
