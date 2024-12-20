"use client";
import Dropdown from "@/src/components/dropdown/Dropdown";
import { DropdownSelectUIType } from "@/src/components/dropdown/dropdown.types";
import Header from "@/src/components/header/Header";
import useFetch from "@/src/hooks/useFetchHook";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import { PaginationType } from "@/src/types/common-types";
import React, { useState } from "react";
import ManageTrainingGraph from "../manage-training-graph/ManageTrainingGraph";

const TrainingNavbar = () => {
  const { response, error, isLoading } = useFetch<
    PaginationType & { results: { id: string; training_name: string }[] }
  >(LMS_ENDPOINTS.TRAINING.TRAINING.LIST_ALL_TRAININGS_NAMES);

  const [selectedTraining, setSelectedTraining] = useState<{
    label: string;
    value: string;
  }>({ label: "", value: "" });

  return (
    <>
      <Header
        paddingBottom={14}
        paddingTop={14}
        leftComponent={
          <div className="nu-f-center nu-h-full">
            <p>Training summary</p>
          </div>
        }
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-2">
            <div style={{ width: "250px" }}>
              <Dropdown
                uiType={DropdownSelectUIType.advanced}
                placeHolderLabel="Training"
                placeholder="Select training"
                selectedOption={
                  selectedTraining.label ? [selectedTraining] : []
                }
                options={(response?.results ?? []).map((training) => ({
                  label: training.training_name,
                  value: training.id,
                }))}
                onChange={([val]) => {
                  setSelectedTraining(val);
                }}
                isLoading={isLoading}
                width="150%"
              />
            </div>
          </div>
        }
      />
      <ManageTrainingGraph />
    </>
  );
};

export default TrainingNavbar;
