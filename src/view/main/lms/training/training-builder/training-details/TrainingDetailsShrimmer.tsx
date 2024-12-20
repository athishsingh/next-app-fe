import React from "react";
import styles from "./training-details.module.scss";
import Shrimmer from "@/src/components/shrimmer/Shrimmer";

const TrainingDetailsShrimmer = () => {
  return (
    <div className={styles["training__details-shrimmer-con"]}>
      <div className="nu-flex nu-column nu-gap-1">
        <Shrimmer width={100} height={16} />
        <Shrimmer autoWidth height={36} />
      </div>
      <div className="nu-flex nu-ai-center nu-jc-sb">
        <div className="nu-flex  nu-gap-3 nu-ai-center">
          <Shrimmer width={52} height={52} borderRadius={52} />
          <div className="nu-flex nu-column nu-gap-1">
            <Shrimmer height={20} />
            <Shrimmer height={16} width={228} />
          </div>
        </div>
        <div className="nu-flex nu-ai-center nu-gap-3">
          <Shrimmer width={115} height={36} />
          <Shrimmer width={115} height={36} />
        </div>
      </div>
      <div className="nu-flex nu-column nu-gap-1">
        <Shrimmer width={100} height={16} />
        <Shrimmer autoWidth height={100} />
      </div>

      <div className="nu-flex nu-column nu-gap-1">
        <Shrimmer width={166} height={20} />
        <Shrimmer autoWidth height={40} />
      </div>
      <div className="nu-flex nu-ai-center nu-jc-sb">
        <div className="nu-flex nu-column nu-gap-1">
          <Shrimmer width={166} height={20} />
          <Shrimmer width={460} height={16} />
        </div>
        <Shrimmer width={120} height={36} />
      </div>
      <div className="nu-flex nu-ai-center nu-jc-sb">
        <div className="nu-flex nu-column nu-gap-1">
          <Shrimmer width={116} height={20} />
          <Shrimmer width={350} height={16} />
        </div>
        <Shrimmer width={240} height={36} />
      </div>
      <div className="nu-flex nu-ai-center nu-jc-sb">
        <Shrimmer width={165} height={18} />
        <Shrimmer width={140} height={36} />
      </div>
      <div className="nu-flex nu-ai-center nu-jc-sb">
        <Shrimmer width={165} height={18} />
        <Shrimmer width={140} height={36} />
      </div>
      <div className="nu-flex nu-jc-end">
        <Shrimmer width={200} height={36} />
      </div>
    </div>
  );
};

export default TrainingDetailsShrimmer;
