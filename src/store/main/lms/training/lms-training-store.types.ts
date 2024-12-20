import { LmsUsersType } from "@/src/types/lms/lms-common-types";
import {
  AssessmentDetailsInfoType,
  TrainingSessionPropsType,
} from "@/src/types/lms/training-types";

export interface LmsTrainingStoreType {
  showSessionDrawer: boolean;
  showAssessmentDrawer: boolean;
  drawerSessionId: string;
  drawerAssessmentId: string;
  enrolledUsersData: LmsUsersType[];
  notEnrolledUsersData: LmsUsersType[];
  drawerSessionInfo: TrainingSessionPropsType | null;
  drawerSessionInfoCopy: TrainingSessionPropsType | null;
  selectedEnrolledUserIds: string[];
  selectedUnEnrolledUserIds: string[];
  fetchEnrolledUsersAgain: boolean;
  fetchUnEnrolledUsersAgain: boolean;
  drawerAssessmentDetailsInfo: AssessmentDetailsInfoType | null;
  shouldRefetchAssessments: boolean;
  searchTraining: string;
  setSearchTraining: (search: string) => void;
  setShouldRefetchAssessments: () => void;
  setDrawerAssessentDetailsInfo: (
    val: AssessmentDetailsInfoType | null
  ) => void;
  setShowSessionDrawer: (val: boolean) => void;
  setShowAssessmentDrawer: (val: boolean) => void;
  setDrawerSessionId: (val: string) => void;
  setDrawerAssessmentId: (val: string) => void;
  setDrawerSessionInfo: (val: TrainingSessionPropsType | null) => void;
  setDrawerSessionInfoCopy: (val: TrainingSessionPropsType | null) => void;
  setEnrolledUsersData: (val: LmsUsersType[]) => void;
  setNotEnrolledUsersData: (val: LmsUsersType[]) => void;
  setSelectedEnrolledUserIds: (val: string[]) => void;
  setSelectedUnEnrolledUserIds: (val: string[]) => void;
  setFetchEnrolledUsersAgain: () => void;
  setFetchUnEnrolledUsersAgain: () => void;
}
