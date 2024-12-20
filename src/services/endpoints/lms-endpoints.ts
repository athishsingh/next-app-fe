import { PAGE_LIMIT } from "@/src/constants/general";

export const LMS_ENDPOINTS = {
  TRAINING: {
    TRAINING: {
      LIST_TRAINING: ({ pageNumber }: { pageNumber: number }) =>
        `/api/v1/lms/training/list-training/?page=${pageNumber}&page_size=${PAGE_LIMIT}`,
      LIST_ALL_TRAININGS_NAMES: "/api/v1/lms/training/list-training-names/",
      CREATE_TRAINING: "/api/v1/lms/training/create-training/",
      UPDATE_TRAINING: (trainingId: string) =>
        `/api/v1/lms/training/${trainingId}/update-training/`,
      GET_TRAINING: (trainingId: string) =>
        `/api/v1/lms/training/${trainingId}/get-training/`,
      DELETE_TRAINING: (trainingId: string) =>
        `/api/v1/lms/training/${trainingId}/delete-training/`,
      PUBLISH_TRAINING: "/api/v1/lms/training/publish-training/",
    },
    SESSIONS: {
      LIST_TRAINING_SESSIONS: (trainingId: string) =>
        `/api/v1/lms/training-session/list-training-sessions?training_id=${trainingId}`,
      CREATE_TRAINING_SESSION:
        "/api/v1/lms/training-session/create-training-session/",
      GET_TRAINING_SESSION: (trainingId: string) =>
        `/api/v1/lms/training-session/${trainingId}/get-training-session/`,
      UPDATE_TRAINING_SESSION: (trainingId: string) =>
        `/api/v1/lms/training-session/${trainingId}/update-training-session/`,
      DELETE_TRAINING_SESSION: (trainingId: string) =>
        `/api/v1/lms/training-session/${trainingId}/delete-training-session/`,
    },
    ASSESSMENTS: {
      LIST_TRAINING_SESSION_ASSESSMENT: (sessionId: string) =>
        `/api/v1/lms/training-assessment-question/training-assessment-question-list/?session_id=${sessionId}`,
      CREATE_ASSESSMENT:
        "/api/v1/lms/training-assessment/create-training-assessment/",
      MAP_ASSESSMENT_TO_SESSION:
        "/api/v1/lms/training-session/map-session-assessment/",
      UPDATE_ASSESSMENT: (assessmentId: string) =>
        `/api/v1/lms/training-assessment/${assessmentId}/update-training-assessment/`,
      DELETE_TRAINING_ASSESSMENT: (assessmentId: string) =>
        `/api/v1/lms/training-assessment/${assessmentId}/delete-training-assessment/`,
      CREATE_TRAINING_ASSESSMENT_QUESTION:
        "/api/v1/lms/training-assessment-question/create-training-assessment-question/",
      DELETE_BULK_ASSESSMENT_QUESTIONS:
        "/api/v1/lms/training-assessment-question/bulk-delete-assessment-question/",
      UPDATE_TRAINING_ASSESSMENT_QUESTION: (questionId: string) =>
        `/api/v1/lms/training-assessment-question/${questionId}/update-training-assessment-question/`,
      CREATE_QUESTION_OPTION:
        "/api/v1/lms/training-assessment-options/create-option/",
      UPDATE_QUESTION_OPTION: (optionId: string) =>
        `/api/v1/lms/training-assessment-options/${optionId}/update-option/`,
      DELETE_QUESTION_OPTION: (optionId: string) =>
        `/api/v1/lms/training-assessment-options/${optionId}/delete-option/`,
    },
    USERS: {
      LIST_USERS_OF_COURSE: ({
        pageNumber,
        isEnrolled,
        trainingId,
      }: {
        pageNumber: number;
        isEnrolled: boolean;
        trainingId: string;
      }) =>
        `/api/v1/lms/course-mapping/list-users?page=${pageNumber}&page_size=${PAGE_LIMIT}&training=${trainingId}&is_enrolled=${isEnrolled}`,
      ENROLL_USER_TO_TRAINING: "/api/v1/lms/training-mapping/enroll-training/",
      DELETE_USER_FROM_TRAINING:
        "/api/v1/lms/training-mapping/training-mapping-bulk-delete/",
      LIST_SESSION_ATTENDED_USERS: (sessionId: string) =>
        `/api/v1/lms/training-session/list-sessions-attended-user/?session_id=${sessionId}`,
    },
  },
  MEDIA: {
    DELETE_MEDIA: (mediaId: string) =>
      `/api/v1/lms/media-delete/${mediaId}/media-delete/`,
  },
  CATEGORIES: {
    LIST_CATEGORIES: "/api/v1/lms/category/get-course-category/",
    ADD_CATEGORY: "/api/v1/lms/category/save-course-category/",
    DELETE_CATEGORY: "/api/v1/category/delete-course-category/",
  },
  DESIGNATIONS: {
    LIST_DESIGNATION: "/api/v1/lms/course-mapping/list-designations/",
  },
  USERS: {
    LIST_USERS: (designationId: string) =>
      `/api/v1/lms/course-mapping/list-users?designations=${designationId}`,
  },
};
