import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import Header from "@/src/components/header/Header";
import { IconSize } from "@/src/constants/iconsize.constant";
import { Plus } from "@phosphor-icons/react";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { TrainingBuilderTabs } from "./training-builder-navbar.data";
import Tabs from "@/src/components/tabs/Tabs";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";

const TrainingBuilderNavbar = ({ id }: { id: string }) => {
  const pathName = usePathname();
  const {
    setShowSessionDrawer,
    setDrawerSessionId,
    setShowAssessmentDrawer,
    setDrawerAssessmentId,
  } = useLmsTrainingStore();

  const getIsActive = (route: string) => {
    return pathName.includes(route);
  };

  const TabsPresent = useMemo(() => {
    if (id === "create") {
      return TrainingBuilderTabs.filter(
        (tab) => tab.name === "Training details"
      );
    } else {
      return TrainingBuilderTabs;
    }
  }, [id]);
  if (id === "create") return null;
  return (
    <>
      <Header
        leftComponent={
          <div className="nu-flex nu-gap-1 nu-h-full">
            {TabsPresent.map((trainingTab) => {
              return (
                <div className="nu-f-center nu-h-full" key={trainingTab.name}>
                  <Tabs
                    isActive={getIsActive(trainingTab.activeKey)}
                    route={trainingTab.route(id)}
                    title={trainingTab.name}
                  />
                </div>
              );
            })}
          </div>
        }
        rightComponent={
          id !== "create" ? (
            <div className="nu-mt-6 nu-mb-6 nu-flex nu-ai-center nu-gap-5">
              {pathName === `/lms/training/manage-training/${id}/sessions` && (
                <Button
                  prefixIcon={<Plus size={IconSize.M} />}
                  title="Add session"
                  onClick={() => {
                    setShowSessionDrawer(true);
                    setDrawerSessionId("add");
                  }}
                  buttonType={ButtonType.secondary}
                />
              )}
              {/* {pathName ===
                `/lms/training/manage-training/${id}/assessment` && (
                <Button
                  prefixIcon={<Plus size={IconSize.M} />}
                  title="Add assessment"
                  onClick={() => {
                    setShowAssessmentDrawer(true);
                    setDrawerAssessmentId("add");
                  }}
                  buttonType={ButtonType.secondary}
                />
              )} */}
              <div style={{ height: "36px" }}></div>
            </div>
          ) : (
            <div className="nu-my-6">
              <div style={{ height: "36px" }}></div>
            </div>
          )
        }
      />
    </>
  );
};

export default TrainingBuilderNavbar;
