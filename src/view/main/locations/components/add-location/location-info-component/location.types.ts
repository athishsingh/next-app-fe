type LocationTimingsProps = {
  meta: {
    applicabile_all: string;
  };
  results: TimingsProps[];
};

type TimingsProps = {
  company: string;
  store: string;
  day: number;
  opening_time: string;
  closing_time: string;
  closed: boolean;
  pre_opening_hour: number;
  post_opening_hour: number;
  dayName?: string;
};

export type LocationTimingPropType = Omit<LocationTimingsProps, "meta">;

export type CreateLocationTimingProps = Omit<
  TimingsProps,
  "company" | "store" | "pre_opening_hour" | "post_opening_hour"
>;
