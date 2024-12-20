export const TrainingUsersTabs = [
  {
    name: "Enrolled",
    route: (id: string) => `/lms/training/manage-training/${id}/users/enrolled`,
  },
  {
    name: "Not enrolled",
    route: (id: string) =>
      `/lms/training/manage-training/${id}/users/not-enrolled`,
  },
];
