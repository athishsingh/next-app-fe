export const ManageLocationSidebarRoutes = [
  {
    label: "Locations",
    route: (locationId: string) =>
      `/locations/manage-locations/${locationId}/locations`,
  },
  {
    label: "Timings",
    route: (locationId: string) =>
      `/locations/manage-locations/${locationId}/timings`,
  },
  {
    label: "Sections",
    route: (locationId: string) =>
      `/locations/manage-locations/${locationId}/sections`,
  },
  {
    label: "Team",
    route: (locationId: string) =>
      `/locations/manage-locations/${locationId}/team`,
  },
  {
    label: "Guidelines",
    route: (locationId: string) =>
      `/locations/manage-locations/${locationId}/guidelines`,
  },
];
