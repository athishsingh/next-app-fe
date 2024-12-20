"use client";
import React, { useEffect, useState } from "react";
import Table from "@/src/components/table/Table";
import TrainingUsersInfoComponent from "../_components/TrainingUsersInfoComponent";
import TrainingUserCellComponent from "../_components/TrainingUserCellComponent";
import { getCapitalized } from "@/src/utils/general.utils";
import styles from "../_components/styles/training-users-table.module.scss";
import useFetch from "@/src/hooks/useFetchHook";
import { LmsUsersType } from "@/src/types/lms/lms-common-types";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import Pagination from "@/src/components/pagination/Pagination";
import Checkbox from "@/src/components/checkbox/Checkbox";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";

const EnrolledUsers = ({ trainingId }: { trainingId: string }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const {
    enrolledUsersData,
    selectedEnrolledUserIds,
    fetchEnrolledUsersAgain,
    setSelectedEnrolledUserIds,
    setEnrolledUsersData,
  } = useLmsTrainingStore();
  const { response: usersResponse, isLoading } = useFetch<{
    count: number;
    next: string;
    previous: string;
    results: LmsUsersType[];
  }>(
    LMS_ENDPOINTS.TRAINING.USERS.LIST_USERS_OF_COURSE({
      isEnrolled: true,
      pageNumber: pageNumber,
      trainingId: trainingId,
    }),
    [pageNumber, trainingId, fetchEnrolledUsersAgain]
  );

  useEffect(() => {
    if (usersResponse?.results) {
      setEnrolledUsersData(usersResponse?.results ?? []);
    }
  }, [usersResponse?.results]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pageNumber]);

  const handleSingleSelect = (userId: string) => {
    let tempArr = [...selectedEnrolledUserIds];
    let index = tempArr.findIndex((id) => id === userId);
    if (index !== -1) {
      tempArr.splice(index, 1);
    } else {
      tempArr.push(userId);
    }
    setSelectedEnrolledUserIds(tempArr);
  };

  const handleSelectAllOrUnSelectAll = () => {
    if (selectedEnrolledUserIds.length === enrolledUsersData.length) {
      setSelectedEnrolledUserIds([]);
    } else {
      setSelectedEnrolledUserIds(
        enrolledUsersData.map((user) => user.user_training_mapping_id ?? "")
      );
    }
  };

  useEffect(() => {
    return () => {
      setSelectedEnrolledUserIds([]);
    };
  }, []);

  if (!isLoading && usersResponse?.results.length === 0)
    return (
      <div className="nu-w-full nu-h-full nu-f-center nu-py-30">
        No enrolled users found!!
      </div>
    );

  return (
    <div className="nu-flex nu-column nu-gap-5">
      <div className="nu-flex nu-column">
        <div className="nu-py-7 nu-px-30 nu-flex nu-ai-center nu-jc-sb nu-w-full nu-border-bottom">
          <p> </p>
          {enrolledUsersData.length > 0 && (
            <Checkbox
              isSelected={
                enrolledUsersData.length === selectedEnrolledUserIds.length
              }
              onChange={handleSelectAllOrUnSelectAll}
              label={
                enrolledUsersData.length === selectedEnrolledUserIds.length
                  ? "Unselect all"
                  : "Select all"
              }
            />
          )}
        </div>
        <Table
          shrimmerRowHeight={67}
          isLoading={isLoading}
          rows={(enrolledUsersData ?? []).map((userInfo) => ({
            cells: [
              {
                component: (
                  <TrainingUsersInfoComponent
                    designation={getCapitalized(
                      userInfo?.designation?.name || ""
                    )}
                    imgUrl={
                      "https://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-EKq9qNA-600.jpg"
                    }
                    name={userInfo.full_name}
                    onSelect={() =>
                      handleSingleSelect(
                        userInfo.user_training_mapping_id ?? ""
                      )
                    }
                    isSelected={selectedEnrolledUserIds.includes(
                      userInfo.user_training_mapping_id ?? ""
                    )}
                    role="Part time"
                  />
                ),
              },
              {
                component: (
                  <TrainingUserCellComponent
                    customClassname="store__main-con"
                    description="Store"
                    header={userInfo?.store?.name || "-"}
                  />
                ),
              },
              {
                component: (
                  <TrainingUserCellComponent
                    customClassname="region-cell"
                    description="Region"
                    header={"Region name"}
                  />
                ),
              },
              {
                component: (
                  <TrainingUserCellComponent
                    customClassname="marketing-cell"
                    description="Category"
                    header={"Marketing"}
                  />
                ),
              },
              {
                component: (
                  <TrainingUserCellComponent
                    customClassname="hire__date-cell"
                    description="Hire date"
                    header={userInfo?.joining_date || "-"}
                  />
                ),
              },
            ],
            id: userInfo.id,
            rightComponent: (
              <>
                <div className="nu-flex nu-column nu-gap-1">
                  <p className={styles["enrolled__text"]}>Enrolled</p>
                  <p className={styles["enrolled__date-text"]}>
                    On: 28/09/2024
                  </p>
                </div>
              </>
            ),
          }))}
        />
      </div>
      <Pagination
        currentPage={pageNumber}
        onNextClick={(val) => {
          setSelectedEnrolledUserIds([]);
          setPageNumber(val);
        }}
        onPreviousClick={(val) => {
          setSelectedEnrolledUserIds([]);
          setPageNumber(val);
        }}
        onSkipFirstClicked={(val) => {
          setSelectedEnrolledUserIds([]);
          setPageNumber(val);
        }}
        onSkipLastClicked={(val) => {
          setSelectedEnrolledUserIds([]);
          setPageNumber(val);
        }}
        totalCount={usersResponse?.count || 0}
      />
    </div>
  );
};

export default EnrolledUsers;
