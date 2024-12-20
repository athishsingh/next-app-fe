"use client";
import Header from "@/src/components/header/Header";
import React from "react";
import { TrainingUsersTabs } from "./training-users-navbar-data";
import { usePathname } from "next/navigation";
import Tabs from "@/src/components/tabs/Tabs";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { Briefcase } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { deleteData, postData } from "@/src/services/data.service";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";
import useToast from "@/src/hooks/useToast";
import { useRouter } from "nextjs-toploader/app";

const TrainingUsersNavbar = ({ id }: { id: string }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { showSuccessToast } = useToast();
  const {
    selectedEnrolledUserIds,
    selectedUnEnrolledUserIds,
    setSelectedEnrolledUserIds,
    setFetchEnrolledUsersAgain,
    setFetchUnEnrolledUsersAgain,
    setSelectedUnEnrolledUserIds,
  } = useLmsTrainingStore();

  const getIsActive = (route: string) => {
    return pathName.includes(route);
  };

  const handleUnAssignTrainingToUsers = async () => {
    try {
      const data = {
        training_mapping_ids: selectedEnrolledUserIds,
      };
      await deleteData(
        LMS_ENDPOINTS.TRAINING.USERS.DELETE_USER_FROM_TRAINING,
        data
      );
      showSuccessToast({
        message: "Successful",
        description: `${
          selectedEnrolledUserIds.length > 1 ? "Users" : "User"
        } unassigned successfully!`,
      });
      setFetchEnrolledUsersAgain();
      setSelectedEnrolledUserIds([]);
    } catch (error) {}
  };

  const handleAssignTrainingToUsers = async () => {
    try {
      const data = selectedUnEnrolledUserIds.map((userId) => ({
        user: userId,
        training: id,
      }));
      await postData(
        LMS_ENDPOINTS.TRAINING.USERS.ENROLL_USER_TO_TRAINING,
        data
      );
      showSuccessToast({
        message: "Successful",
        description: `${
          selectedUnEnrolledUserIds.length > 1 ? "Users" : "User"
        } assigned successfully!`,
      });
      setFetchUnEnrolledUsersAgain();
      setSelectedUnEnrolledUserIds([]);
    } catch (error) {}
  };

  return (
    <div>
      <Header
        leftComponent={
          <div className="nu-flex nu-gap-1 nu-h-full">
            {TrainingUsersTabs.map((users) => {
              return (
                <div className="nu-f-center nu-h-full" key={users.name}>
                  <Tabs
                    isActive={getIsActive(users.route(id))}
                    route={users.route(id)}
                    title={users.name}
                  />
                </div>
              );
            })}
          </div>
        }
        rightComponent={
          <div className="nu-my-6 nu-flex nu-ai-center nu-gap-5">
            {pathName ===
              `/lms/training/manage-training/${id}/users/enrolled` &&
              selectedEnrolledUserIds.length !== 0 && (
                <Button
                  prefixIcon={
                    <Briefcase
                      size={IconSize.M}
                      color="#D26300"
                      weight="fill"
                    />
                  }
                  title="Un-assign"
                  onClick={handleUnAssignTrainingToUsers}
                  buttonType={ButtonType.tertiary}
                />
              )}
            {pathName ===
              `/lms/training/manage-training/${id}/users/not-enrolled` &&
              selectedUnEnrolledUserIds.length !== 0 && (
                <Button
                  prefixIcon={
                    <Briefcase
                      size={IconSize.M}
                      color="#D26300"
                      weight="fill"
                    />
                  }
                  title="Assign"
                  onClick={handleAssignTrainingToUsers}
                  buttonType={ButtonType.tertiary}
                />
              )}
            <Button
              title="View user activity"
              onClick={() => {
                router.push(
                  `/lms/training/manage-training/${id}/user-activity`
                );
              }}
              buttonType={ButtonType.secondary}
            />
          </div>
        }
      />
    </div>
  );
};

export default TrainingUsersNavbar;
