"use client";
import React, { useEffect, useState } from "react";
import styles from "./training-assessment.module.scss";
import TrainingAssessmentDrawer from "../_components/training-assessment-drawer/TrainingAssessmentDrawer";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";
import { Plus } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import TrainingAssessmentCard from "../_components/training-assessment-card/TrainingAssessmentCard";
import useFetch from "@/src/hooks/useFetchHook";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import {
  AssessmentInfoType,
  TrainingSessionPropsType,
} from "@/src/types/lms/training-types";
import TrainingAssessmentSessionCard from "../_components/training-assessment-session-card/TrainingAssessmentSessionCard";
import TrainingAssessmentSessionCardLoading from "../_components/training-assessment-session-card/TrainingAssessmentSessionCardLoading";
import { cn } from "@/src/utils/class.utils";
import Button from "@/src/components/button/Button";
import { useRouter } from "nextjs-toploader/app";
import TrainingAssessmentCardShrimmer from "../_components/training-assessment-card/TrainingAssessmentCardShrimmer";

const TrainingAssessment = ({ trainingId }: { trainingId: string }) => {
  const router = useRouter();
  const { showAssessmentDrawer } = useLmsTrainingStore();
  const [selectedSession, setSelecetedSession] =
    useState<TrainingSessionPropsType | null>(null);

  const {
    shouldRefetchAssessments,
    setShowSessionDrawer,
    setDrawerSessionId,
    setShowAssessmentDrawer,
    setDrawerAssessmentId,
    setShouldRefetchAssessments,
  } = useLmsTrainingStore();
  const { response: trainingSessions, isLoading: isSessionLoading } = useFetch<{
    count: number;
    results: TrainingSessionPropsType[];
  }>(LMS_ENDPOINTS.TRAINING.SESSIONS.LIST_TRAINING_SESSIONS(trainingId), [
    trainingId,
  ]);

  const {
    response: sessionAssessment,
    isLoading: assessmentLoading,
    setResponse: setAssessmentResponse,
  } = useFetch<{
    count: number;
    results: AssessmentInfoType[];
  }>(
    (selectedSession?.id ?? "") === "" || selectedSession?.id === null
      ? null
      : LMS_ENDPOINTS.TRAINING.ASSESSMENTS.LIST_TRAINING_SESSION_ASSESSMENT(
          selectedSession?.id ?? ""
        ),
    [selectedSession?.id, shouldRefetchAssessments]
  );

  useEffect(() => {
    if ((trainingSessions?.results ?? []).length > 0) {
      const [firstData] = trainingSessions?.results ?? [];
      setSelecetedSession(firstData);
    }
  }, [trainingSessions]);

  const handleCreateSessionPush = () => {
    router.push(`/lms/training/manage-training/${trainingId}/sessions`);
    setDrawerSessionId("add");
    setShowSessionDrawer(true);
  };

  return (
    <>
      <div className={styles["training__assessment-main-container"]}>
        <div
          className={cn(styles["assessment__sideabar-main-con"], {
            [styles["hidden"]]:
              !isSessionLoading &&
              (trainingSessions?.results ?? []).length === 0,
          })}
        >
          {isSessionLoading ? (
            <TrainingAssessmentSessionCardLoading />
          ) : (trainingSessions?.results ?? []).length !== 0 ? (
            <>
              {/* <Input
                value=""
                onChange={() => {}}
                placeholder="Search assessment"
                prefixIcon={<MagnifyingGlass size={IconSize.M} />}
                classnames="nu-px-15 nu-py-7 nu-border-bottom"
                autoWidth
              /> */}
              {trainingSessions?.results.map((session) => {
                return (
                  <TrainingAssessmentSessionCard
                    session_name={session.session_name}
                    key={session.id}
                    isSelected={session.id === selectedSession?.id}
                    onClick={() => {
                      if (selectedSession?.id !== session?.id) {
                        setSelecetedSession(session);
                        setAssessmentResponse(null);
                      }
                    }}
                  />
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          className={cn(
            styles["children__main-con"],
            `${
              (trainingSessions?.results.length === 0 ||
                sessionAssessment?.results.length === 0) &&
              "nu-f-center"
            }`
          )}
        >
          <div className={cn(styles["children__con"])}>
            {isSessionLoading || assessmentLoading ? (
              <TrainingAssessmentCardShrimmer />
            ) : trainingSessions?.results.length === 0 ? (
              <div className="nu-w-full nu-h-full nu-f-center nu-column nu-gap-3">
                <p>Create a session to add an assessment</p>
                <div>
                  <Button
                    prefixIcon={<Plus size={IconSize.M} />}
                    title="Create session"
                    onClick={handleCreateSessionPush}
                  />
                </div>
              </div>
            ) : (sessionAssessment?.results ?? []).length === 0 &&
              trainingSessions?.results.length !== 0 ? (
              <div className="nu-w-full nu-h-full nu-f-center nu-column nu-gap-3">
                <p>Add an assessment</p>
                <div>
                  <Button
                    prefixIcon={<Plus size={IconSize.M} />}
                    title="Add assessment"
                    onClick={() => {
                      setShowAssessmentDrawer(true);
                      setDrawerAssessmentId("add");
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                {(sessionAssessment?.results ?? []).map((assessment, index) => {
                  return (
                    <TrainingAssessmentCard
                      details={assessment}
                      key={index}
                      shouldRefetch={() => {
                        setAssessmentResponse(null);
                        setShouldRefetchAssessments();
                      }}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      {showAssessmentDrawer && selectedSession?.id && (
        <TrainingAssessmentDrawer
          session={selectedSession as TrainingSessionPropsType}
          trainingId={trainingId}
          onSuccess={() => {
            setAssessmentResponse(null);
            setShouldRefetchAssessments();
          }}
        />
      )}
    </>
  );
};

export default TrainingAssessment;
