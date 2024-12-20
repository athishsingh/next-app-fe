"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./user-activity.module.scss";
import Header from "@/src/components/header/Header";
import Button from "@/src/components/button/Button";
import IconButton from "@/src/components/icon-button/IconButton";
import { useRouter } from "nextjs-toploader/app";
import { ArrowLeft, DownloadSimple, Info, X } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import LiveSessionAttendanceComponent from "./_components/live-session-attendance-component/LiveSessionAttendanceComponent";
import PastSessionAttendanceComponent from "./_components/past-session-attendance-component/PastSessionAttendanceComponent";
import useFetch from "@/src/hooks/useFetchHook";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import {
  TrainingSessionPropsType,
  TrainingTypes,
} from "@/src/types/lms/training-types";
import UserActivityShrimmer from "./UserActivityShrimmer";
import Shrimmer from "@/src/components/shrimmer/Shrimmer";
import { getCapitalized } from "@/src/utils/general.utils";
import UpcomingSessionAttendanceComponent from "./_components/upcoming-session-attendance-component/UpcomingSessionAttendanceComponent";
import { getSessionOrCourseStatus } from "../utils/training-utils";
import { ButtonType } from "@/src/components/button/types";
import { cn } from "@/src/utils/class.utils";

const UserActivity = ({ trainingId }: { trainingId: string }) => {
  const router = useRouter();

  const { response: sessionsListResponse, isLoading } = useFetch<{
    results: TrainingSessionPropsType[];
  }>(LMS_ENDPOINTS.TRAINING.SESSIONS.LIST_TRAINING_SESSIONS(trainingId));

  const [name, setName] = useState<string>("Existing Training");

  const { response, isLoading: isNameLoading } = useFetch<TrainingTypes>(
    LMS_ENDPOINTS.TRAINING.TRAINING.GET_TRAINING(trainingId),
    []
  );
  useEffect(() => {
    if (response?.training_name)
      if (name !== response?.training_name) {
        setName(response?.training_name || "");
      }
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
    <div className={styles["user__activity-main-con"]}>
      <Header
        classnames="nu-ai-center"
        leftComponent={
          <div className="nu-flex nu-ai-center nu-gap-3">
            <IconButton
              icon={<ArrowLeft size={IconSize.M} />}
              onClick={router.back}
            />

            {isNameLoading ? (
              <>
                <Shrimmer width={155} height={18} borderRadius={2} />
              </>
            ) : (
              <>
                <p className={styles["training__name"]}>
                  {getCapitalized(name)}
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
        rightComponent={
          <div className="nu-flex nu-my-6 nu-ai-center nu-gap-5">
            <Button
              title="View training details"
              onClick={() => {
                router.push(
                  `/lms/training/manage-training/${trainingId}/training-details`
                );
              }}
              prefixIcon={<Info size={IconSize.M} />}
              buttonType={ButtonType.tertiary}
            />
            <IconButton onClick={router.back} icon={<X size={IconSize.M} />} />
          </div>
        }
      />
      <Header
        classnames="nu-ai-center"
        leftComponent={
          <p className={styles["user__activity-header-text"]}>User activity</p>
        }
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-5 nu-my-6">
            <Button
              title="Download"
              onClick={() => {}}
              prefixIcon={<DownloadSimple size={IconSize.M} />}
            />
          </div>
        }
      />
      <div className="nu-flex nu-column nu-px-30 nu-py-7 nu-gap-5">
        {isLoading ? (
          <UserActivityShrimmer />
        ) : (
          <>
            {(sessionsListResponse?.results ?? []).map((session) => {
              const sessionType = getSessionOrCourseStatus(
                session.session_date,
                session.session_date,
                session.session_start_time,
                session.session_end_time
              );
              if (sessionType === "live")
                return (
                  <LiveSessionAttendanceComponent
                    trainingId={trainingId}
                    sessionDate={session.session_date}
                    sessionId={session.id}
                    sessionName={session.session_name}
                    key={session.id}
                  />
                );
              else if (sessionType === "upcoming") {
                return (
                  <UpcomingSessionAttendanceComponent
                    key={session.id}
                    trainingId={trainingId}
                    sessionDate={session.session_date}
                    sessionId={session.id}
                    sessionName={session.session_name}
                  />
                );
              } else if (sessionType === "completed") {
                return (
                  <PastSessionAttendanceComponent
                    key={session.id}
                    trainingId={trainingId}
                    sessionDate={session.session_date}
                    sessionId={session.id}
                    sessionName={session.session_name}
                  />
                );
              }
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default UserActivity;
