"use client";
import Table from "@/src/components/table/Table";
import { postData } from "@/src/services/data.service";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import { PaginationType } from "@/src/types/common-types";
import { TrainingDetailsType } from "@/src/types/lms/training-types";
import React, { useEffect, useState } from "react";
import TrainingInfoTableCell from "../manage-training/_components/TrainingInfoTableCell";
import { convertDate } from "@/src/utils/date.utils";
import TrainingCreatedByCell from "../manage-training/_components/TrainingCreatedByCell";
import TrainingActionCell from "../manage-training/_components/TrainingActionCell";
import Pagination from "@/src/components/pagination/Pagination";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";
import { useDebouncedSearch } from "@/src/hooks/useDebouncedSearch";

const DraftTraining = () => {
  const [response, setResponse] = useState<
    PaginationType & { results: TrainingDetailsType[] }
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { searchTraining } = useLmsTrainingStore();
  const debouncedSearchTerm = useDebouncedSearch(searchTraining);

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
          is_live: false,
          training_name: debouncedSearchTerm,
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
  }, [pageNumber, debouncedSearchTerm]);

  return (
    <>
      <div className="nu-flex nu-column nu-gap-5">
        <Table
          isTableEmpty={response?.results.length === 0}
          emptyTableText={`No draft training found ${
            debouncedSearchTerm !== "" ? `for "${debouncedSearchTerm}"` : ""
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
            ],
            rightComponent: (
              <TrainingActionCell id={trainie.id} key={trainie.id} />
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
    </>
  );
};

export default DraftTraining;
