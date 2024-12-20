"use client";
import React, { useState } from "react";
import styles from "./session-card.module.scss";
import IconButton from "@/src/components/icon-button/IconButton";
import {
  CalendarDots,
  Clock,
  CopySimple,
  NotePencil,
  Trash,
} from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { cn } from "@/src/utils/class.utils";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { convertTo12HourFormat } from "@/src/utils/time.utils";
import { getCapitalized } from "@/src/utils/general.utils";
import { getDayInfo } from "@/src/utils/date.utils";

const SessionCard = ({
  sessionName,
  sessionDate,
  startTime,
  endTime,
  trainingType,
  trainerName,
  meetingLink,
  locationName,
  seriesNumber,
  onDeleteClick,
  onEditClick,
}: {
  sessionName: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  trainingType: "virtual" | "in_store" | "hybrid";
  trainerName: string;
  meetingLink?: string;
  locationName?: string;
  seriesNumber: number;
  onDeleteClick: () => void;
  onEditClick: () => void;
}) => {
  const trainingTypemap = {
    virtual: "Virtual",
    in_store: "In store",
    hybrid: "Hybrid",
  };
  return (
    <div className={styles["session__card-main-con"]}>
      <div className={styles["session__info-con"]}>
        <div className="nu-flex nu-gap-3 nu-ai-center">
          <div className={styles["date__container"]}>
            <p className={styles["day"]}>{getDayInfo(sessionDate).day}</p>
            <p className={styles["date"]}>{getDayInfo(sessionDate).date}</p>
          </div>
          <div className="nu-flex nu-gap-1 nu-ai-center nu-wrap">
            <p className={styles["session__count-text"]}>
              Session {seriesNumber}:
            </p>
            <p className={styles["session__name-text"]}>{sessionName}</p>
          </div>
        </div>
        <IconButton
          icon={
            <div className="nu-flex nu-gap-1">
              <Trash size={IconSize.M} />
              <p className={styles["delete"]}>Delete</p>
            </div>
          }
          onClick={onDeleteClick}
        />
      </div>
      <div className={styles["session__details-con"]}>
        <div className="nu-flex nu-ai-center nu-gap-8 nu-wrap">
          <DetailsCon
            description="Session date"
            titleComponent={
              <div className="nu-flex nu-ai-center nu-gap-1 ">
                <CalendarDots size={IconSize.S} />
                <p>{sessionDate}</p>
              </div>
            }
          />
          <DetailsCon
            description="Start time - End time"
            titleComponent={
              <div className="nu-flex nu-ai-center">
                <div className="nu-flex nu-gap-1 nu-ai-center">
                  <Clock size={IconSize.S} color="#b2b1ff" weight="fill" />
                  <p>{convertTo12HourFormat(startTime) as string}</p>
                </div>
                <p className="nu-mx-4"> - </p>
                <div className="nu-flex nu-gap-1 nu-ai-center">
                  <Clock size={IconSize.S} color="#b2b1ff" weight="fill" />
                  <p>{convertTo12HourFormat(endTime) as string}</p>
                </div>
              </div>
            }
          />
          <DetailsCon
            description="Training type"
            titleComponent={
              <p className="nu-capitalize">{trainingTypemap[trainingType]}</p>
            }
          />
          <DetailsCon
            description="Trainer"
            titleComponent={<p>{getCapitalized(trainerName)}</p>}
          />
          {trainingType === "hybrid" && (
            <DetailsCon
              description="Meeting location"
              titleComponent={<p>{locationName}</p>}
            />
          )}
          <DetailsCon
            showCopy={trainingType !== "in_store"}
            copyLink={meetingLink}
            description={
              trainingType === "in_store" ? "Meeting location" : "Meet info"
            }
            titleComponent={
              <p className={cn(styles["meeting__url-con"], "nu-ellipsis")}>
                {trainingType === "in_store" ? locationName : meetingLink}
              </p>
            }
          />
        </div>
        <div>
          <Button
            title="Edit"
            onClick={onEditClick}
            prefixIcon={<NotePencil size={IconSize.M} />}
            buttonType={ButtonType.tertiary}
          />
        </div>
      </div>
    </div>
  );
};

const DetailsCon = ({
  className,
  titleComponent,
  description,
  showCopy = false,
  copyLink,
}: {
  titleComponent: React.ReactNode;
  description: string;
  className?: string;
  copyLink?: string;
  showCopy?: boolean;
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <div className={cn(styles["details__con"], className)}>
      <div className={styles["title__component"]}>
        {titleComponent}
        {showCopy && (
          <IconButton
            icon={
              <CopySimple
                size={IconSize.S}
                color={copied ? "#66BB6A" : "#212121"}
              />
            }
            onClick={() => {
              navigator.clipboard.writeText(copyLink || "");
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          />
        )}
      </div>
      <p className={styles["description__text"]}>{description}</p>
    </div>
  );
};
export default SessionCard;
