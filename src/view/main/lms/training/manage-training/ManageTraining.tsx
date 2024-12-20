"use client";
import React, { useEffect, useState } from "react";
import Table from "@/src/components/table/Table";
import TrainingInfoTableCell from "./_components/TrainingInfoTableCell";
import TrainingCreatedByCell from "./_components/TrainingCreatedByCell";
import TrainingTotalSessionsCells from "./_components/TrainingTotalSessionsCells";
import TrainingTotalUsersCell from "./_components/TrainingTotalUsersCell";
import TrainingDateCell from "./_components/TrainingDateCell";
import TrainingActionCell from "./_components/TrainingActionCell";
import { PaginationType } from "@/src/types/common-types";
import { TrainingDetailsType } from "@/src/types/lms/training-types";
import { postData } from "@/src/services/data.service";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import { convertDate } from "@/src/utils/date.utils";
import Pagination from "@/src/components/pagination/Pagination";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";
import { useDebouncedSearch } from "@/src/hooks/useDebouncedSearch";
import TrainingStatusCell from "./_components/TrainingStatusCell";
import { getSessionOrCourseStatus } from "../utils/training-utils";

const ManageTraining = () => {
  const [response, setResponse] = useState<
    PaginationType & { results: TrainingDetailsType[] }
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { searchTraining } = useLmsTrainingStore();
  const debouncedSearch = useDebouncedSearch(searchTraining);

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await postData<
        unknown,
        PaginationType & { results: TrainingDetailsType[] }
      >(
        LMS_ENDPOINTS.TRAINING.TRAINING.LIST_TRAINING({
          pageNumber: pageNumber,
        }),
        {
          is_live: true,
          training_name: debouncedSearch,
        }
      );

      setResponse(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [pageNumber, debouncedSearch]);

  return (
    <div className="nu-flex nu-column nu-gap-5">
      <Table
        isTableEmpty={response?.results.length === 0}
        emptyTableText={`No training found ${
          debouncedSearch !== "" ? `for "${debouncedSearch}"` : ""
        }`}
        isLoading={isLoading}
        rows={(response?.results ?? []).map((trainie, index) => ({
          id: index.toString(),
          cells: [
            {
              component: (
                <TrainingInfoTableCell
                  category={(trainie?.training_categories ?? [])
                    .map((category) => category?.category_name)
                    .join(" ,")}
                  createdOn={convertDate(trainie.training_created_on)}
                  imgUrl={
                    trainie?.training_banner_media?.media_pre_url ||
                    "/images/default-pic.svg"
                  }
                  name={trainie?.training_name}
                />
              ),
            },
            {
              component: (
                <TrainingCreatedByCell
                  createdBy={trainie?.training_created_by_name}
                />
              ),
            },
            {
              component: (
                <TrainingTotalSessionsCells
                  total={trainie.total_session ?? 0}
                />
              ),
            },
            {
              component: (
                <TrainingTotalUsersCell totalUsers={trainie.total_users ?? 0} />
              ),
            },
            {
              component: (
                <TrainingDateCell
                  description={"Start date"}
                  date={convertDate(trainie?.start_date)}
                />
              ),
            },
            {
              component: (
                <TrainingDateCell
                  description={"End date"}
                  date={convertDate(trainie?.end_date)}
                />
              ),
            },
            {
              component: (
                <TrainingStatusCell
                  status={
                    trainie.start_date && trainie.end_date
                      ? getSessionOrCourseStatus(
                          trainie.start_date.split(" ")[0],
                          trainie.end_date.split(" ")[0],
                          "00:00:00",
                          "00:00:00"
                        )
                      : "-"
                  }
                />
              ),
            },
          ],
          rightComponent: (
            <TrainingActionCell
              id={trainie.id}
              key={trainie.id}
              showActivityButton
            />
          ),
        }))}
      />
      <Pagination
        currentPage={pageNumber}
        onNextClick={(val) => setPageNumber(val)}
        onPreviousClick={(val) => setPageNumber(val)}
        onSkipFirstClicked={(val) => setPageNumber(val)}
        onSkipLastClicked={(val) => setPageNumber(val)}
        totalCount={response?.count || 0}
      />
    </div>
  );
};

export default ManageTraining;
