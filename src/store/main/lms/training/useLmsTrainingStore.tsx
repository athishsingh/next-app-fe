import { create } from "zustand";
import { LmsTrainingStoreType } from "./lms-training-store.types";

export const useLmsTrainingStore = create<LmsTrainingStoreType>((set, get) => ({
  showSessionDrawer: false,
  showAssessmentDrawer: false,
  drawerSessionId: "",
  drawerAssessmentId: "",
  drawerSessionInfo: null,
  drawerSessionInfoCopy: null,
  enrolledUsersData: [],
  notEnrolledUsersData: [],
  selectedEnrolledUserIds: [],
  selectedUnEnrolledUserIds: [],
  fetchEnrolledUsersAgain: false,
  fetchUnEnrolledUsersAgain: false,
  drawerAssessmentDetailsInfo: null,
  shouldRefetchAssessments: false,
  searchTraining: "",
  setSearchTraining: (search) => set({ searchTraining: search }),
  setDrawerAssessentDetailsInfo: (val) =>
    set({ drawerAssessmentDetailsInfo: val }),
  setShowSessionDrawer: (val) => set({ showSessionDrawer: val }),
  setShowAssessmentDrawer: (val) => set({ showAssessmentDrawer: val }),
  setDrawerSessionId: (val) => set({ drawerSessionId: val }),
  setDrawerAssessmentId: (val) => set({ drawerAssessmentId: val }),
  setDrawerSessionInfo: (val) => set({ drawerSessionInfo: val }),
  setDrawerSessionInfoCopy: (val) => set({ drawerSessionInfoCopy: val }),
  setEnrolledUsersData: (val) => set({ enrolledUsersData: val }),
  setNotEnrolledUsersData: (val) => set({ notEnrolledUsersData: val }),
  setSelectedEnrolledUserIds: (val) => set({ selectedEnrolledUserIds: val }),
  setSelectedUnEnrolledUserIds: (val) =>
    set({ selectedUnEnrolledUserIds: val }),
  setFetchEnrolledUsersAgain: () => {
    const val = get().fetchEnrolledUsersAgain;
    set({ fetchEnrolledUsersAgain: !val });
  },
  setFetchUnEnrolledUsersAgain: () => {
    const val = get().fetchUnEnrolledUsersAgain;
    set({ fetchUnEnrolledUsersAgain: !val });
  },
  setShouldRefetchAssessments: () => {
    const val = get().shouldRefetchAssessments;
    set({ shouldRefetchAssessments: !val });
  },
}));
