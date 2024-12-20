import { IconSize } from "@/src/constants/iconsize.constant";
import { CalendarDots, VideoCamera } from "@phosphor-icons/react";
import { ModuleOptionsProps } from "./module-options.type";

export const moduleOptions: ModuleOptionsProps[] = [
  {
    name: "Scheduling",
    icon: <CalendarDots size={IconSize.XL} color="#FCA16C" />,
    description:
      "I want to know my teams availability to create and share schedules",
    id: "001",
  },
  {
    name: "LMS",
    icon: <VideoCamera size={IconSize.XL} color="#FCA16C" />,
    description:
      "I want to know my teams availability to create and share schedules",

    id: "002",
  },
  {
    name: "Projects & Tasks",
    icon: <CalendarDots size={IconSize.XL} color="#FCA16C" />,
    description:
      "I want to know my teams availability to create and share schedules",

    id: "003",
  },
  {
    name: "Sales Forecasting",
    icon: <VideoCamera size={IconSize.XL} color="#FCA16C" />,
    description:
      "I want to know my teams availability to create and share schedules",

    id: "004",
  },
  {
    name: "Timesheet",
    icon: <VideoCamera size={IconSize.XL} color="#FCA16C" />,
    description:
      "I want to know my teams availability to create and share schedules",

    id: "005",
  },
  {
    name: "Incident Management",
    icon: <VideoCamera size={IconSize.XL} color="#FCA16C" />,
    description:
      "I want to know my teams availability to create and share schedules",

    id: "006",
  },
];
