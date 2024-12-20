import { MediaBannerType } from "../common-types";
import { CategoryType } from "./lms-common-types";

export type TrainingTypes = {
  id: string;
  training_name: string;
  training_code: string;
  training_live: boolean;
  training_categories?: CategoryType[];
  training_banner: string;
  start_date: string;
  end_date: string;
  training_banner_media_address: string;
  training_description: string;
  certification_downloadable: boolean;
  within_store_geofence: boolean;
  training_banner_media?: MediaBannerType | null;
};

export type TrainingSessionPropsType = {
  id: string;
  session_name: string;
  session_description: string;
  session_type: "session" | "assessment";
  session_assessment: null;
  session_trainer: string;
  session_trainer_name: string;
  session_trainer_designation: {
    id: string;
    name: string;
  };
  session_date: string;
  session_start_time: string;
  session_end_time: string;
  session_location: "virtual" | "in_store" | "hybrid";
  session_link: string;
  training: string;
  session_store: string;
  session_store_name: string;
  session_read_materials: SessionPreReadMaterialType[];
  within_store_geofence: boolean;
};

export type SessionPreReadMaterialType = {
  media_id: string;
  media_name: string;
  media_address: string;
  media_type: "video" | "image" | "ppt" | "pdf";
  media_length: string;
  thumbnails_address: string;
};

export type TrainingSessionAssessmentType = {
  id: string;
  question: string;
  media_type: string | null;
  media_address: string | null;
  question_type: QuestionType;
  max_score: number;
  options: AssessmentQuestionType[];
  thumbnail_address: string;
  serial_number: number;
  assessment: {
    id: string;
    name: string;
  };
  media_info?: MediaBannerType | null;
};

export type QuestionType =
  | "single_choice"
  | "multiple_choice"
  | "long_answer"
  | "media_upload";
export type AssessmentInfoType = {
  id: string;
  assessment_name: string;
  test_mandatory: boolean;
  passing_percentage: number;
  data: TrainingSessionAssessmentType[];
};

export type AssessmentQuestionType = {
  id: string;
  option_value: string;
  is_answer: boolean;
  max_score: number;
  media_type: string;
  media: string;
  media_address: string;
  thumbnail_address: string;
  media_info?: MediaBannerType | null;
};

export type TrainingDetailsType = {
  id: string;
  total_users: number;
  total_session: number;
  training_name: string;
  training_code: string;
  training_description: string;
  training_live: boolean;
  training_categories: { id: string; category_name: string }[];
  training_banner: string;
  start_date: string;
  end_date: string;
  training_banner_media: MediaBannerType;
  training_created_by: string;
  training_created_by_name: string;
  training_created_on: string;
  certification_downloadable: boolean;
  within_store_geofence: boolean;
};

export type AssessmentDetailsInfoType = {
  id: string;
  assessment_name: string;
  test_mandatory: boolean;
  passing_percentage: number;
};
