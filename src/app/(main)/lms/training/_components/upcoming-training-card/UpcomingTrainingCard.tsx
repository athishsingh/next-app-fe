"use client";
import React, { useState } from "react";
import styles from "./upcoming-training-card.module.scss";
import IconButton from "@/src/components/icon-button/IconButton";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Image from "next/image";

const UpcomingTrainingCard = () => {
  const [selectedCourse, setSelectedCourse] = useState<number>(0);

  const data = [
    {
      name: "Counter training 1",
      startDate: "28/09/24",
      imgUrl:
        "https://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-EKq9qNA-600.jpg",
      category: "Marketing",
    },
    {
      name: "Counter training 2",
      startDate: "29/09/24",
      imgUrl:
        "https://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-EKq9qNA-600.jpg",
      category: "Ad company",
    },
    {
      name: "Counter training 3",
      startDate: "30/09/24",
      imgUrl:
        "https://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-EKq9qNA-600.jpg",
      category: "Development",
    },
  ];

  const handleClick = ({
    type = "increment",
  }: {
    type: "increment" | "decrement";
  }) => {
    if (type === "increment") {
      if (selectedCourse < data.length - 1) {
        setSelectedCourse(selectedCourse + 1);
      } else if (selectedCourse === data.length - 1) {
        setSelectedCourse(0);
      }
    } else if (type === "decrement") {
      if (selectedCourse > 0) {
        setSelectedCourse(selectedCourse - 1);
      } else {
        setSelectedCourse(data.length - 1);
      }
    }
  };

  return (
    <div className={styles["upcoming__course-card"]}>
      <p className={styles["header__text"]}>Upcoming trainings to conduct</p>
      <div>
        <div className={styles["course__info-parent-con"]}>
          <div className="nu-flex nu-gap-4">
            <Image
              className={styles["course__img"]}
              src={data[selectedCourse].imgUrl}
              alt="course-img"
              width={40}
              height={40}
              priority={false}
            />
            <div className={styles["course__info-con"]}>
              <p className={styles["course__name-text"]}>
                {data[selectedCourse].name}
              </p>
              <div className="nu-flex nu-gap-1 nu-ai-center">
                <p className={styles["course__info-text"]}>
                  Starting on: {data[selectedCourse].startDate}
                </p>
                <div className="dot-con" />
                <p className={styles["course__info-text"]}>
                  {data[selectedCourse].category}
                </p>
              </div>
            </div>
          </div>
          <div className={styles["date__info-con"]}>
            <p className={styles["day__text"]}>mon</p>
            <p className={styles["date__text"]}>22</p>
          </div>
        </div>
        <div className="nu-flex nu-ai-center nu-mt-3 nu-jc-sb">
          <p className={styles["selected__course-count"]}>
            {selectedCourse + 1 < 10
              ? `0${selectedCourse + 1}`
              : selectedCourse + 1}
            /{data.length < 10 ? `0${data.length}` : data.length}
          </p>
          <div className="nu-flex">
            <IconButton
              icon={<CaretLeft size={IconSize.M} />}
              onClick={() => handleClick({ type: "decrement" })}
            />
            <IconButton
              icon={<CaretRight size={IconSize.M} />}
              onClick={() => handleClick({ type: "increment" })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTrainingCard;
