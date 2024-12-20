import React, { useState } from "react";
import styles from "./training-assessment-card.module.scss";
import {
  FileText,
  Gear,
  ListNumbers,
  Pencil,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import IconButton from "@/src/components/icon-button/IconButton";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";
import ConfirmationModal from "@/src/components/confirmation-modal/ConfirmationModal";
import TrainingQuestionDrawer from "../training-question-drawer/TrainingQuestionDrawer";
import Button from "@/src/components/button/Button";
import {
  AssessmentInfoType,
  TrainingSessionAssessmentType,
} from "@/src/types/lms/training-types";
import { deleteData } from "@/src/services/data.service";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import useToast from "@/src/hooks/useToast";

const TrainingAssessmentCard = ({
  details,
  shouldRefetch,
}: {
  details: AssessmentInfoType;
  shouldRefetch: () => void;
}) => {
  const {
    setDrawerAssessmentId,
    setShowAssessmentDrawer,
    setDrawerAssessentDetailsInfo,
    setShouldRefetchAssessments,
  } = useLmsTrainingStore();
  const { showSuccessToast } = useToast();
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showQuestionDrawer, setShowQuestionDrawer] = useState<boolean>(false);
  const [showDeleteAllQuestionModal, setShowDeleteAllQuestionModal] =
    useState<boolean>(false);
  const [showDeleteQuestionModal, setShowDeleteQuestionModal] =
    useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<TrainingSessionAssessmentType | null>(null);
  const [deleteQuestionId, setDeleteQuestionId] = useState<string>("");
  const [assessmentId, setAssessmentId] = useState<string>("");

  const handleDeleteAssessment = async () => {
    try {
      await deleteData(
        LMS_ENDPOINTS.TRAINING.ASSESSMENTS.DELETE_TRAINING_ASSESSMENT(
          details.id
        )
      );
      showSuccessToast({
        message: "Successful",
        description: "Assessment deleted successfully",
      });
      shouldRefetch();
    } catch (error) {}
  };

  const handleHandleDeleteQuestion = async () => {
    try {
      const data = {
        question_ids: [deleteQuestionId],
      };
      await deleteData(
        LMS_ENDPOINTS.TRAINING.ASSESSMENTS.DELETE_BULK_ASSESSMENT_QUESTIONS,
        data
      );
      showSuccessToast({
        message: "Successful",
        description: "Assessment question deleted successfully",
      });
      shouldRefetch();
    } catch (error) {
    } finally {
      setDeleteQuestionId("");
    }
  };

  const handleDeleteAllQuestions = async () => {
    try {
      const data = {
        question_ids: details.data.map((question) => question.id),
      };
      await deleteData(
        LMS_ENDPOINTS.TRAINING.ASSESSMENTS.DELETE_BULK_ASSESSMENT_QUESTIONS,
        data
      );
      showSuccessToast({
        message: "Successful",
        description: "Assessment questions deleted successfully",
      });
      shouldRefetch();
    } catch (error) {}
  };

  const questionTypeMap = {
    multiple_choice: "Mutiple choice",
    single_choice: "Single choice",
    long_answer: "Long answer",
    media_upload: "File upload",
  };

  return (
    <>
      <div className={styles["training__assessment-main-con"]}>
        <div className={styles["header__con"]}>
          <div className="nu-flex nu-gap-1 nu-ai-center">
            <FileText size={IconSize.M} />
            <p className={styles["assessment__name"]}>
              {details.assessment_name}
            </p>
          </div>
          <div className="nu-flex nu-gap-1 nu-ai-center">
            <IconButton
              icon={<Gear size={IconSize.M} />}
              onClick={() => {
                setShowAssessmentDrawer(true);
                setDrawerAssessmentId("test");
                const { data, ...info } = details;
                setDrawerAssessentDetailsInfo(info);
              }}
            />
            <IconButton
              icon={<Trash size={IconSize.M} />}
              onClick={() => setShowConfirmationModal(true)}
            />
          </div>
        </div>
        <div className={styles["score__info-con"]}>
          <div className="nu-flex nu-ai-center nu-gap-3">
            <div className="nu-flex nu-ai-center nu-gap-1">
              <p className={styles["label__text"]}>Scoring type:</p>
              <p className={styles["value__text"]}>Score for each step</p>
            </div>
            {details.data.length > 0 && (
              <div className="nu-flex nu-ai-center nu-gap-1">
                <p className={styles["label__text"]}>Total points:</p>
                <p className={styles["value__text"]}>
                  {details.data.reduce(
                    (total, question) => total + question.max_score,
                    0
                  )}
                </p>
              </div>
            )}
          </div>
          <div className="nu-flex nu-ai-center nu-gap-5">
            {(details.data ?? []).length > 0 && (
              <IconButton
                icon={
                  <div className="nu-flex nu-ai-center nu-gap-2">
                    <div className={styles["plus__icon"]}>
                      <Plus
                        size={IconSize.S}
                        color="var(--text-primary-color)"
                      />
                    </div>
                    <p className={styles["add__question-text"]}>
                      Add questions
                    </p>
                  </div>
                }
                onClick={() => {
                  setAssessmentId(details.id);
                  setShowQuestionDrawer(true);
                }}
              />
            )}
            {(details.data ?? []).length > 0 && (
              <IconButton
                icon={
                  <div className="nu-flex nu-ai-center nu-gap-2">
                    <Trash size={IconSize.S} color="#D26300" />
                    <p className={styles["delete__all-text"]}>
                      Delete all questions
                    </p>
                  </div>
                }
                onClick={() => setShowDeleteAllQuestionModal(true)}
              />
            )}
          </div>
        </div>
        {details.data.length === 0 && (
          <div className="nu-f-center nu-py-15">
            <div className="nu-f-center nu-column nu-gap-2">
              <p className={styles["no__question-text"]}>
                No questions are present for this assessment
              </p>
              <div>
                <Button
                  title="Add question"
                  prefixIcon={<Plus size={IconSize.M} />}
                  onClick={() => {
                    setAssessmentId(details.id);
                    setShowQuestionDrawer(true);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {(details.data ?? []).map((question, index) => {
          return (
            <div key={index} className={styles["assessment__question-con"]}>
              <div className="nu-flex nu-ai-center nu-jc-sb nu-gap-3">
                <div className="nu-flex nu-gap-3 nu-ai-center">
                  <IconButton
                    icon={<Trash color="#8E8EA9" size={IconSize.M} />}
                    onClick={() => {
                      setDeleteQuestionId(question.id);
                      setShowDeleteQuestionModal(true);
                    }}
                  />
                  <p className={styles["question__text"]}>
                    {question.question}
                  </p>
                </div>
                <div className="nu-flex nu-ai-center nu-gap-3">
                  <div className={styles["question__type-con"]}>
                    <ListNumbers size={IconSize.M} />
                    <p className={styles["question__type"]}>
                      {questionTypeMap[question.question_type]}
                    </p>
                  </div>
                  <IconButton
                    icon={<Pencil color="#8E8EA9" size={IconSize.M} />}
                    onClick={() => {
                      setAssessmentId(details.id);
                      setSelectedQuestion(question);
                      setShowQuestionDrawer(true);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          visible={showConfirmationModal}
          description="You are about the delete an assessment and this action is not reversible!"
          setVisible={() => setShowConfirmationModal(false)}
          onCancelClick={() => setShowConfirmationModal(false)}
          onConfirmClick={handleDeleteAssessment}
          isConfirmButtonLoading={false}
          confirmButtonText="Delete"
        />
      )}
      {showDeleteAllQuestionModal && (
        <ConfirmationModal
          visible={showDeleteAllQuestionModal}
          description="You are about the delete all the questions of an assessment and this action is not reversible!"
          setVisible={() => setShowDeleteAllQuestionModal(false)}
          onCancelClick={() => setShowDeleteAllQuestionModal(false)}
          onConfirmClick={handleDeleteAllQuestions}
          isConfirmButtonLoading={false}
          confirmButtonText="Delete"
        />
      )}
      {showDeleteQuestionModal && (
        <ConfirmationModal
          visible={showDeleteQuestionModal}
          description="You are about the delete a question of an assessment and this action is not reversible!"
          setVisible={() => setShowDeleteQuestionModal(false)}
          onCancelClick={() => setShowDeleteQuestionModal(false)}
          onConfirmClick={handleHandleDeleteQuestion}
          isConfirmButtonLoading={false}
          confirmButtonText="Delete"
        />
      )}
      {showQuestionDrawer && (
        <TrainingQuestionDrawer
          visible={showQuestionDrawer}
          assessmentId={assessmentId}
          setVisible={() => {
            setSelectedQuestion(null);
            setShowQuestionDrawer(false);
            setAssessmentId("");
          }}
          questionDetails={selectedQuestion as TrainingSessionAssessmentType}
        />
      )}
    </>
  );
};

export default TrainingAssessmentCard;
