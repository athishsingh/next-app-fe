"use client";
import React, { useState } from "react";
import styles from "./past-session-attendance-component.module.scss";
import Accordion from "@/src/components/accordion/Accordion";
import SessionAttendanceAccordionHeader from "../session-attendance-accordion-header/SessionAttendanceAccordionHeader";
import { cn } from "@/src/utils/class.utils";
import { Check, Eye, Funnel } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Checkbox from "@/src/components/checkbox/Checkbox";
import { noop } from "@/src/utils/general.utils";
// import { useRouter } from "nextjs-toploader/app";
import SessionAttendaceUserInfo from "../../../training-builder/users/_components/session-attendance-user-info/SessionAttendaceUserInfo";
import IconButton from "@/src/components/icon-button/IconButton";
import ConfirmationModal from "@/src/components/confirmation-modal/ConfirmationModal";

const PastSessionAttendanceComponent = ({
  trainingId,
  sessionDate,
  sessionId,
  sessionName,
}: {
  trainingId: string;
  sessionId: string;
  sessionName: string;
  sessionDate: string;
}) => {
  // const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const handleMarkAllPresent = () => {};
  return (
    <>
      <div className={styles["past__session-main-con"]}>
        <Accordion
          foreignVisible={isVisible}
          onChange={() => setIsVisible(!isVisible)}
          header={
            <SessionAttendanceAccordionHeader
              date={sessionDate}
              sessionName={sessionName}
              attendedCount={70}
            />
          }
        >
          <div className={styles["filters__con"]}>
            <div className="nu-flex nu-ai-center nu-gap-5">
              <div className="nu-flex nu-ai-center nu-gap-2">
                <Funnel size={IconSize.M} />
                <p className={styles["filter__text"]}>Filters:</p>
              </div>
              <Checkbox isSelected={false} onChange={noop} label="Attended" />
              <Checkbox
                isSelected={false}
                onChange={noop}
                label="Not attended"
              />
            </div>
            <IconButton
              icon={
                <div className="nu-flex nu-ai-center nu-gap-1">
                  <Check size={IconSize.M} />
                  <p>Mark All present</p>
                </div>
              }
              onClick={() => setShowConfirmationModal(true)}
            />
          </div>
          {usersData.map((user) => {
            return (
              <div key={user.id} className={styles["users__main-con"]}>
                <div className={styles["sub_con"]}>
                  <SessionAttendaceUserInfo
                    designation={user.designation}
                    imgUrl={user.imgUrl}
                    name={user.name}
                    role={user.role}
                  />
                  <InfoComponent
                    classname={styles["reporting__status-con"]}
                    title={user.status}
                    description="Reporting status"
                    errorText={user.status === "Not attended"}
                  />
                  <InfoComponent
                    classname={styles["submission__date-con"]}
                    title={user.submissionDate}
                    description="Submission date"
                  />
                  <InfoComponent
                    classname={styles["score__con"]}
                    title={user.score}
                    description="Assessment Score"
                  />
                </div>

                <div className="nu-flex nu-gap-3 nu-ai-center nu-wrap">
                  {/* <ViewTestButton
                  onClick={() => {
                    router.push(
                      `/lms/training/manage-training/${trainingId}/submited-assessment/${user.id}`
                    );
                  }}
                /> */}
                  <ActionButton title="Present" onClick={() => {}} />
                  <ActionButton title="Completed" onClick={() => {}} />
                </div>
              </div>
            );
          })}
        </Accordion>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          visible={showConfirmationModal}
          description="You are about to mark all as present. Are you sure?"
          setVisible={() => setShowConfirmationModal(false)}
          onCancelClick={() => setShowConfirmationModal(false)}
          onConfirmClick={handleMarkAllPresent}
          isConfirmButtonLoading={false}
          confirmButtonText="Delete"
        />
      )}
    </>
  );
};

const InfoComponent = ({
  title,
  description,
  errorText = false,
  classname,
}: {
  title: string;
  description: string;
  errorText?: boolean;
  classname?: string;
}) => {
  return (
    <div className={cn(`nu-flex nu-column nu-gap-1 ${classname}`)}>
      <p
        className={`${
          errorText ? styles["error__text"] : styles["title__text"]
        }`}
      >
        {title}
      </p>
      <p className={styles["info__text"]}>{description}</p>
    </div>
  );
};

const ViewTestButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={styles["view__test-button"]} onClick={onClick}>
      <p className={styles["text"]}>View test</p>
      <Eye size={IconSize.M} color="#8E8EA9" />
    </button>
  );
};

const ActionButton = ({
  title,
  onClick,
  isSelected = true,
}: {
  title: string;
  onClick: () => void;
  isSelected?: boolean;
}) => {
  return (
    <button className={styles["action__button"]} onClick={onClick}>
      <p className={styles["text"]}>{title}</p>
      <Checkbox onChange={noop} isSelected={isSelected} tabIndex={-1} />
    </button>
  );
};

export default PastSessionAttendanceComponent;

const usersData = [
  {
    name: "Testing one",
    id: "uyregfhbkuyewgf",
    designation: "FE developer",
    role: "Part time",
    status: "09:00 am - 10:00 am",
    submissionDate: "02 / 04 / 2023",
    score: "23 / 30",
    imgUrl:
      "https://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-EKq9qNA-600.jpg",
  },
  {
    name: "Testing two",
    id: "hjbfrhuqohrgfipuyqgreh",
    designation: "FE developer",
    role: "Part time",
    status: "09:00 am - 10:00 am",
    submissionDate: "02 / 04 / 2023",
    score: "23 / 30",
    imgUrl:
      "https://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-EKq9qNA-600.jpg",
  },
  {
    name: "Testing three",
    id: "lhergfblqiygrfliuyreghbfkuy",
    designation: "FE developer",
    role: "Part time",
    status: "Not attended",
    submissionDate: "02 / 04 / 2023",
    score: "23 / 30",
    imgUrl:
      "https://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-EKq9qNA-600.jpg",
  },
];
