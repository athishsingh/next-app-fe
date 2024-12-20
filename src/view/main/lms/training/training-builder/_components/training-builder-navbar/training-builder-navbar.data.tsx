export const TrainingBuilderTabs = [
  {
    name: "Training details",
    activeKey: "/training-details",
    route: (id: string) =>
      `/lms/training/manage-training/${id}/training-details`,
  },
  {
    name: "Sessions",
    activeKey: "/sessions",
    route: (id: string) => `/lms/training/manage-training/${id}/sessions`,
  },
  {
    name: "Users",
    activeKey: "/users",
    route: (id: string) => `/lms/training/manage-training/${id}/users/enrolled`,
  },
  {
    name: "Assessment",
    activeKey: "/assessment",
    route: (id: string) => `/lms/training/manage-training/${id}/assessment`,
  },
];
