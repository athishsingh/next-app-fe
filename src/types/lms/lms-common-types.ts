export type CategoryType = {
  id: string;
  category_name: string;
};

export type LmsUsersType = {
  id: string;
  emp_id: string;
  email: string;
  full_name: string;
  gender: string;
  store: {
    id: string;
    name: string;
    store_id: string;
  };
  designation: {
    id: string;
    name: string;
  };
  department: {
    id: string;
    name: string;
  };
  joining_date: string;
  is_enrolled: boolean;
  user_course_mapping_id: string | null;
  user_training_mapping_id: string | null;
  user_draft_course_mapping_id: string | null;
};
