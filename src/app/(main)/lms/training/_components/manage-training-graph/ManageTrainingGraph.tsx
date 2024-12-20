import RateGraph from "@/src/components/rate-graph/components/RateGraph";
import React from "react";
import styles from "./manage-training-graph.module.scss";
import { RateGraphType } from "@/src/components/rate-graph/components/RateGraphBar";
import UpcomingTrainingCard from "../upcoming-training-card/UpcomingTrainingCard";

const ManageTrainingGraph = () => {
  const chartData: RateGraphType[] = [
    {
      header: "30",
      chartColor: "#0AE2FF",
      displayText: "Total training",
    },
    {
      header: "30",
      chartColor: "#CE0AFF",
      displayText: "Total active trainings",
    },
    {
      header: "18",
      chartColor: "#96BF1D",
      displayText: "Conducted (Virtual)",
    },
    {
      header: "30",
      chartColor: "#FFC90A",
      displayText: "Conducted (Location)",
    },
    {
      header: "22",
      chartColor: "#FF0A60",
      displayText: "Total users enrolled",
    },
    {
      header: "18",
      chartColor: "#1DBF73",
      displayText: "Avg. Training attendance",
    },
    {
      header: "10",
      chartColor: "#3F42E4",
      displayText: "Participant drop- off rate",
    },
  ];
  return (
    <div className={styles["manage-training-garph__main-con"]}>
      <div className={styles["sub__con"]}>
        <RateGraph completionRate={30} chartData={chartData} />
      </div>
      <UpcomingTrainingCard />
    </div>
  );
};

export default ManageTrainingGraph;
