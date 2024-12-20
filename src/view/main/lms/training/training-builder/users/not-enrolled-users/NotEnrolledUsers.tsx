"use client";
import React, { useEffect, useState } from "react";
import Table from "@/src/components/table/Table";
import TrainingUsersInfoComponent from "../_components/TrainingUsersInfoComponent";
import { getCapitalized } from "@/src/utils/general.utils";
import TrainingUserCellComponent from "../_components/TrainingUserCellComponent";
import styles from "../_components/styles/training-users-table.module.scss";
import useFetch from "@/src/hooks/useFetchHook";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import Pagination from "@/src/components/pagination/Pagination";
import { LmsUsersType } from "@/src/types/lms/lms-common-types";
import Checkbox from "@/src/components/checkbox/Checkbox";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";

const NotEnrolledUsers = ({ trainingId }: { trainingId: string }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const {
    notEnrolledUsersData,
    fetchUnEnrolledUsersAgain,
    selectedUnEnrolledUserIds,
    setNotEnrolledUsersData,
    setSelectedUnEnrolledUserIds,
  } = useLmsTrainingStore();

  const { response: usersResponse, isLoading } = useFetch<{
    count: number;
    next: string;
    previous: string;
    results: LmsUsersType[];
  }>(
    LMS_ENDPOINTS.TRAINING.USERS.LIST_USERS_OF_COURSE({
      isEnrolled: false,
      pageNumber: pageNumber,
      trainingId: trainingId,
    }),
    [pageNumber, trainingId, fetchUnEnrolledUsersAgain]
  );

  useEffect(() => {
    if (usersResponse?.results) {
      setNotEnrolledUsersData(usersResponse?.results ?? []);
    }
  }, [usersResponse?.results]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pageNumber]);

  const handleSingleSelect = (userId: string) => {
    let tempArr = [...selectedUnEnrolledUserIds];
    let index = tempArr.findIndex((id) => id === userId);
    if (index !== -1) {
      tempArr.splice(index, 1);
    } else {
      tempArr.push(userId);
    }
    setSelectedUnEnrolledUserIds(tempArr);
  };
  const handleSelectAllOrUnSelectAll = () => {
    if (selectedUnEnrolledUserIds.length === notEnrolledUsersData.length) {
      setSelectedUnEnrolledUserIds([]);
    } else {
      setSelectedUnEnrolledUserIds(notEnrolledUsersData.map((user) => user.id));
    }
  };

  useEffect(() => {
    return () => {
      setSelectedUnEnrolledUserIds([]);
    };
  }, []);

  if (!isLoading && usersResponse?.results.length === 0)
    return (
      <div className="nu-w-full nu-h-full nu-f-center nu-py-30">
        No non-enrolled users found!!
      </div>
    );

  return (
    <div className="nu-flex nu-column nu-gap-5">
      <div className="nu-flex nu-column">
        <div className="nu-py-7 nu-px-30 nu-flex nu-ai-center nu-jc-sb nu-w-full nu-border-bottom">
          <p> </p>
          {notEnrolledUsersData.length > 0 && (
            <Checkbox
              isSelected={
                notEnrolledUsersData.length === selectedUnEnrolledUserIds.length
              }
              onChange={handleSelectAllOrUnSelectAll}
              label={
                notEnrolledUsersData.length === selectedUnEnrolledUserIds.length
                  ? "Unselect all"
                  : "Select all"
              }
            />
          )}
        </div>
        <Table
          shrimmerRowHeight={67}
          isLoading={isLoading}
          rows={(notEnrolledUsersData ?? []).map((userInfo) => ({
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
                    onSelect={() => handleSingleSelect(userInfo.id)}
                    isSelected={selectedUnEnrolledUserIds.includes(userInfo.id)}
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
                <p className={styles["not__enrolled-text"]}>Not enrolled</p>
              </>
            ),
          }))}
        />
      </div>
      <Pagination
        currentPage={pageNumber}
        onNextClick={(val) => {
          setSelectedUnEnrolledUserIds([]);
          setPageNumber(val);
        }}
        onPreviousClick={(val) => {
          setSelectedUnEnrolledUserIds([]);
          setPageNumber(val);
        }}
        onSkipFirstClicked={(val) => {
          setSelectedUnEnrolledUserIds([]);
          setPageNumber(val);
        }}
        onSkipLastClicked={(val) => {
          setSelectedUnEnrolledUserIds([]);
          setPageNumber(val);
        }}
        totalCount={usersResponse?.count || 0}
      />
    </div>
  );
};

export default NotEnrolledUsers;
