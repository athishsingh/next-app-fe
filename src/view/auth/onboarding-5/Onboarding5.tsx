"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../onboarding-4/onboarding-4.module.scss";
import { CaretLeft, Plus, Trash } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { useRouter } from "nextjs-toploader/app";
import Input from "@/src/components/input/Input";
import IconButton from "@/src/components/icon-button/IconButton";

const Onboarding5 = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [sections]);

  return (
    <div className={styles["onboarding__5-main-container"]}>
      <div className={styles["header__component"]}>
        <div className="nu-position-relative nu-flex nu-jc-center nu-column">
          <p className={styles["page__count-text"]}>5/6</p>
          <p className={styles["title__text"]}>Add sections</p>
          <button
            className={styles["arrow__left-icon"]}
            onClick={() => {
              router.push("/onboarding-page-4");
            }}
          >
            <CaretLeft size={IconSize.S} />
          </button>
        </div>
        <div className="nu-flex nu-gap-4 nu-jc-sb nu-ai-end">
          <p className={styles["description__text"]}>
            Sections are where people are scheduled to work. It could be an
            area, department or role.
          </p>
          <div className="nu-flex nu-gap-5 nu-ai-center">
            <Button
              title="Add sections"
              onClick={() => {
                setSections([...sections, ""]);
              }}
              buttonType={ButtonType.tertiary}
              prefixIcon={<Plus size={IconSize.M} />}
            />
          </div>
        </div>
      </div>
      <div ref={scrollContainerRef} className="nu-h-full nu-overflow-scroll">
        <div className="nu-flex nu-column nu-h-full nu-gap-4">
          {/* mapping comes here */}
          {sections.map((section, index) => {
            return (
              <div key={index} className="nu-flex  nu-ai-center  nu-gap-15">
                <div className="nu-flex nu-ai-center nu-gap-4">
                  <div className={styles["number__container"]}>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>
                  <Input
                    width={380}
                    value={section}
                    onChange={(val) => {
                      let arr = [...sections];
                      arr[index] = val;
                      setSections(arr);
                    }}
                    placeholder="Enter location name"
                    label="Location name"
                    showLabelText
                  />
                </div>
                <div className="nu-mr-20">
                  <IconButton
                    icon={
                      <div className={styles["delete__container"]}>
                        <Trash />
                      </div>
                    }
                    onClick={() => {
                      setSections(
                        sections.filter(
                          (_, filteredIndex) => index !== filteredIndex
                        )
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="nu-flex nu-jc-end nu-mt-14">
        <div className="nu-flex nu-gap-3 nu-jc-end">
          <Button
            title="Previous"
            onClick={() => {
              router.push("/onboarding-page-4");
            }}
            buttonType={ButtonType.secondary}
          />
          <Button
            title="Next section"
            isDisabled={sections.length === 0}
            onClick={() => {
              router.push("/dashboard");
            }}
            buttonType={ButtonType.tertiary}
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding5;
