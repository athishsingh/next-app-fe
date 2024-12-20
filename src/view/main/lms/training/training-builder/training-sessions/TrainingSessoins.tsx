"use client";
import React, { useState } from "react";
import styles from "./training-sessions.module.scss";
import SessionCard from "../_components/session-card/SessionCard";
import ConfirmationModal from "@/src/components/confirmation-modal/ConfirmationModal";
import TrainingSessionDrawer from "../_components/training-session-drawer/TrainingSessionDrawer";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";
import useFetch from "@/src/hooks/useFetchHook";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import TrainingSessionShrimmer from "./TrainingSessionShrimmer";
import { TrainingSessionPropsType } from "@/src/types/lms/training-types";
import { deleteData } from "@/src/services/data.service";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import useToast from "@/src/hooks/useToast";

const TrainingSessoins = ({ id }: { id: string }) => {
  const [selectedSession, setSelectedSession] =
    useState<TrainingSessionPropsType | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const {
    setShowSessionDrawer,
    setDrawerSessionId,
    setDrawerSessionInfo,
    setDrawerSessionInfoCopy,
    showSessionDrawer,
  } = useLmsTrainingStore();
  const [deleteCount, setDeletedCount] = useState<number>(0);
  const { showSuccessToast } = useToast();

  const { response, isLoading } = useFetch<{
    count: number;
    results: TrainingSessionPropsType[];
  }>(LMS_ENDPOINTS.TRAINING.SESSIONS.LIST_TRAINING_SESSIONS(id), [deleteCount]);

  const handleDeleteSession = async () => {
    if (!selectedSession?.id) return;
    setIsDeleting(true);
    try {
      await deleteData(
        LMS_ENDPOINTS.TRAINING.SESSIONS.DELETE_TRAINING_SESSION(
          selectedSession.id
        )
      );
      setDeletedCount(deleteCount + 1);
      showSuccessToast({
        message: "Sucessful",
        description: "Session deleted successfully!",
      });
    } catch (error) {
    } finally {
      setShowConfirmationModal(false);
      setIsDeleting(false);
      setSelectedSession(null);
    }
  };

  const onAddOrUpdateSession = () => {
    setDeletedCount(deleteCount + 1);
  };

  if (isLoading) return <TrainingSessionShrimmer />;

  return (
    <>
      <div className={styles["training__session-main-con"]}>
        {(response?.count ?? 0) > 0 && (
          <>
            {response?.results.map((sessionInfo, index) => {
              return (
                <SessionCard
                  key={sessionInfo.id}
                  endTime={sessionInfo.session_end_time}
                  sessionName={sessionInfo.session_name}
                  sessionDate={sessionInfo.session_date}
                  seriesNumber={index + 1}
                  startTime={sessionInfo.session_start_time}
                  trainerName={sessionInfo.session_trainer_name}
                  trainingType={sessionInfo.session_location}
                  locationName={sessionInfo.session_store_name ?? "-"}
                  meetingLink={sessionInfo.session_link}
                  onDeleteClick={() => {
                    setSelectedSession(sessionInfo);
                    setShowConfirmationModal(true);
                  }}
                  onEditClick={() => {
                    setShowSessionDrawer(true);
                    setDrawerSessionId(sessionInfo.id);
                    setDrawerSessionInfo(sessionInfo);
                    setDrawerSessionInfoCopy(sessionInfo);
                  }}
                />
              );
            })}
          </>
        )}
        {response?.count === 0 && (
          <div className="nu-flex nu-w-full nu-h-full nu-ai-center nu-jc-center nu-mt-auto nu-column nu-gap-4">
            <p>No sessions added for this training course</p>
            <div style={{ width: "max-content" }}>
              <Button
                buttonType={ButtonType.tertiary}
                title="Click to add session"
                onClick={() => {
                  setShowSessionDrawer(true);
                  setDrawerSessionId("add");
                }}
              />
            </div>
          </div>
        )}
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          visible={showConfirmationModal}
          description="You are about the delete a session and this action is not reversible!"
          setVisible={() => setShowConfirmationModal(false)}
          onCancelClick={() => {
            setShowConfirmationModal(false);
            setSelectedSession(null);
          }}
          onConfirmClick={handleDeleteSession}
          isConfirmButtonLoading={isDeleting}
          confirmButtonText="Delete"
        />
      )}
      {showSessionDrawer && (
        <TrainingSessionDrawer
          trainingId={id}
          onSuccess={onAddOrUpdateSession}
        />
      )}
    </>
  );
};

export default TrainingSessoins;
