"use client";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import Drawer from "@/src/components/drawer/Drawer";
import Input from "@/src/components/input/Input";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";
import React, { useEffect, useState } from "react";
import styles from "./training-assessment-drawer.module.scss";
import DatePicker from "@/src/components/datepicker/DatePicker";
import Toggle from "@/src/components/toggle/Toggle";
import {
  AssessmentDetailsInfoType,
  TrainingSessionPropsType,
} from "@/src/types/lms/training-types";
import { postData, putData } from "@/src/services/data.service";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import { isDataModified } from "@/src/utils/comparision.utils";
import useToast from "@/src/hooks/useToast";

const TrainingAssessmentDrawer = ({
  trainingId,
  session,
  onSuccess,
}: {
  trainingId: string;
  session: TrainingSessionPropsType;
  onSuccess: () => void;
}) => {
  const { showSuccessToast } = useToast();
  const {
    showAssessmentDrawer,
    drawerAssessmentDetailsInfo,
    setDrawerAssessentDetailsInfo,
    setShowAssessmentDrawer,
    setDrawerAssessmentId,
    drawerAssessmentId,
  } = useLmsTrainingStore();
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [assessmentName, setAssessmentName] = useState<string>(
    drawerAssessmentDetailsInfo?.assessment_name || ""
  );
  // const [assessmentStartDate, setAssessmentStartDate] = useState<string>("");
  // const [assessmentEndDate, setAssessmentEndDate] = useState<string>("");
  const [assesmentPassingPercentage, setAssessmentPassingPercentage] =
    useState<number>(drawerAssessmentDetailsInfo?.passing_percentage || 0);
  const [isMandatory, setIsMandatory] = useState<boolean>(
    drawerAssessmentDetailsInfo?.test_mandatory || false
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  type AssessmentTypeProps = {
    assessment_name: string;
    test_mandatory: boolean;
    passing_percentage: number;
  };

  type CreateAssessmentResponseType = {
    message: string;
    assessment_id: string;
  };

  useEffect(() => {
    const data = createData();
    const isChanged = isDataModified(
      data,
      drawerAssessmentDetailsInfo as AssessmentDetailsInfoType
    );

    setIsEdited(isChanged);
  }, [assessmentName, assesmentPassingPercentage, isMandatory]);

  const createData = () => {
    const data = {
      id: drawerAssessmentDetailsInfo?.id,
      assessment_name: assessmentName || "",
      test_mandatory: isMandatory || false,
      passing_percentage: assesmentPassingPercentage || 0,
    };
    return data;
  };

  const handleSuccessCallBack = (shouldCallSuccess = false) => {
    setShowAssessmentDrawer(false);
    setDrawerAssessmentId("");
    setDrawerAssessentDetailsInfo(null);
    if (shouldCallSuccess) {
      onSuccess();
    }
  };

  const handleCreateAssessment = async () => {
    try {
      setIsLoading(true);
      const data = createData();
      const res = await postData<
        AssessmentTypeProps,
        CreateAssessmentResponseType
      >(LMS_ENDPOINTS.TRAINING.ASSESSMENTS.CREATE_ASSESSMENT, data);
      await handleAssessmentMapping(res.assessment_id);
      showSuccessToast({
        message: "Successful",
        description: "Assessment created successfully!!",
      });
      handleSuccessCallBack(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const updateAssessment = async () => {
    try {
      setIsLoading(true);
      const data = createData();

      await putData(
        LMS_ENDPOINTS.TRAINING.ASSESSMENTS.UPDATE_ASSESSMENT(
          drawerAssessmentDetailsInfo?.id || ""
        ),
        data
      );
      showSuccessToast({
        message: "Successful",
        description: "Assessment updated successfully!!",
      });
      handleSuccessCallBack(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssessmentMapping = async (assessmentId: string) => {
    if (!assessmentId) return;
    try {
      await postData(
        LMS_ENDPOINTS.TRAINING.ASSESSMENTS.MAP_ASSESSMENT_TO_SESSION,
        {
          session_id: session.id,
          assessment_id: assessmentId,
        }
      );
    } catch (error) {}
  };
  return (
    <>
      <Drawer
        width={450}
        showConfirmationModal={isLoading}
        headerText="Assessment settings"
        visible={showAssessmentDrawer}
        setVisible={handleSuccessCallBack}
        footerComponent={
          <>
            <Button
              isLoading={isLoading}
              isDisabled={!isEdited || assessmentName === ""}
              title={
                drawerAssessmentId === "add"
                  ? "Add assessment"
                  : "Updated assessment"
              }
              onClick={
                drawerAssessmentId === "add"
                  ? handleCreateAssessment
                  : updateAssessment
              }
              buttonType={ButtonType.primary}
            />
          </>
        }
      >
        <div className="nu-px-15 nu-py-7 nu-border-bottom nu-flex nu-column">
          <Input
            value={assessmentName}
            onChange={(val) => setAssessmentName(val)}
            placeholder="Enter assessment name"
            autoWidth
            label="Assessment name"
            showLabelText
          />
        </div>
        <div className="nu-px-15 nu-py-7 nu-border-bottom nu-flex nu-column nu-gap-3">
          <p className={styles["header__text"]}>Rules & settings</p>
          <p className={styles["description__text"]}>
            Define the rules regarding whether this test is mandatory or not and
            if it is a time constraint test or not.
          </p>
          <div className="nu-flex nu-ai-center nu-jc-sb nu-gap-2">
            <p className={styles["header__text"]}>Mandatory</p>
            <Toggle
              checked={isMandatory}
              onChange={() => setIsMandatory(!isMandatory)}
            />
          </div>
          {/* <div className="nu-flex nu-gap-1 nu-jc-sb nu-ai-center">
            <DatePicker
              date={null}
              minDate={new Date(`${session.session_date}T00:00:00.000Z`)}
              onSelect={() => {}}
              label="From date"
            />
            <DatePicker date={null} onSelect={() => {}} label="To date" />
          </div> */}
        </div>
        <div className="nu-px-15 nu-py-7 nu-border-bottom nu-flex nu-column">
          <Input
            type="num"
            value={assesmentPassingPercentage.toString()}
            onChange={(val) => setAssessmentPassingPercentage(Number(val))}
            placeholder="Enter passing percentage name"
            autoWidth
            label="Passing percentage"
            showLabelText
          />
        </div>
      </Drawer>
    </>
  );
};

export default TrainingAssessmentDrawer;
