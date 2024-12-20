"use client";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import Header from "@/src/components/header/Header";
import IconButton from "@/src/components/icon-button/IconButton";
import { IconSize } from "@/src/constants/iconsize.constant";
import { getCapitalized } from "@/src/utils/general.utils";
import { ArrowLeft, Export, X } from "@phosphor-icons/react";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./lms-training-builder-layout.module.scss";
import { useRouter } from "nextjs-toploader/app";
import TrainingBuilderNavbar from "@/src/view/main/lms/training/training-builder/_components/training-builder-navbar/TrainingBuilderNavbar";
import useFetch from "@/src/hooks/useFetchHook";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import { TrainingTypes } from "@/src/types/lms/training-types";
import Shrimmer from "@/src/components/shrimmer/Shrimmer";
import { postData } from "@/src/services/data.service";
import axios from "axios";
import useToast from "@/src/hooks/useToast";
import { cn } from "@/src/utils/class.utils";
import { getSessionOrCourseStatus } from "@/src/view/main/lms/training/utils/training-utils";

const LmsTrainingBuilderLayout = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();

  const handleBackClick = () => {
    router.push("/lms/training/manage-training");
  };

  const [details, setDetails] = useState<TrainingTypes | null>(null);

  const { response, isLoading } = useFetch<TrainingTypes>(
    id === "create" ? null : LMS_ENDPOINTS.TRAINING.TRAINING.GET_TRAINING(id),
    []
  );

  const handlePublishClick = async () => {
    try {
      await postData(LMS_ENDPOINTS.TRAINING.TRAINING.PUBLISH_TRAINING, {
        training_id: id,
      });
      router.replace("/lms/training/manage-training");
      showSuccessToast({
        message: "Successfull",
        description: "Training published successfully!",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorToast({
          duration: 10000,
          description: error?.response?.data?.message || "",
          message: "Failed to publish the training!",
        });
      }
    }
  };

  useEffect(() => {
    if (response) setDetails(response);
  }, [response]);

  const status = useMemo(() => {
    if (!response || !response.start_date) return "-";
    return getSessionOrCourseStatus(
      response?.start_date.split(" ")[0],
      response?.end_date.split(" ")[0],
      "00:00:00",
      "00:00:00"
    );
  }, [response]);
  return (
    <div>
      <Header
        classnames="nu-ai-center"
        paddingTop={12}
        paddingBottom={12}
        rightComponent={
          <div className="nu-flex nu-gap-5 nu-ai-center">
            {id !== "create" && !details?.training_live && !isLoading && (
              <Button
                title="Publish"
                onClick={handlePublishClick}
                buttonType={ButtonType.primary}
                prefixIcon={<Export size={IconSize.M} color="white" />}
              />
            )}
            <IconButton
              onClick={handleBackClick}
              icon={<X size={IconSize.L} />}
            />
            <div style={{ height: "36px", visibility: "hidden" }}></div>
          </div>
        }
        leftComponent={
          <div className="nu-flex nu-ai-center nu-gap-2">
            <IconButton
              icon={<ArrowLeft size={IconSize.L} />}
              onClick={handleBackClick}
            />
            {id === "create" ? (
              <>
                <p className={styles["course__name-text"]}>New Training</p>
              </>
            ) : isLoading ? (
              <>
                <Shrimmer width={200} height={18} borderRadius={2} />
              </>
            ) : (
              <>
                <p className={styles["course__name-text"]}>
                  {getCapitalized(details?.training_name || "")}
                </p>
                {response?.start_date && response?.end_date && (
                  <div className="nu-flex nu-ai-center nu-gap-1">
                    <div className={cn(styles["dot"], styles[status])} />
                    <p className={cn(styles["status__text"], styles[status])}>
                      {status}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        }
      />
      <TrainingBuilderNavbar id={id} />
      {children}
    </div>
  );
};

export default LmsTrainingBuilderLayout;
