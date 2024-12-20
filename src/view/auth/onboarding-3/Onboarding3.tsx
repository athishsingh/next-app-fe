"use client";
import React, { useState } from "react";
import styles from "./onboarding-3.module.scss";
import { useRouter } from "nextjs-toploader/app";
import { IconSize } from "@/src/constants/iconsize.constant";
import { CaretLeft } from "@phosphor-icons/react";
import { cn } from "@/src/utils/class.utils";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { moduleOptions } from "./module-options.data";
import { ModuleOptionsProps } from "./module-options.type";
import Chip from "@/src/components/chip/Chip";

const Onboarding3 = () => {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<ModuleOptionsProps[]>(
    []
  );

  const handleOptionClick = (option: ModuleOptionsProps) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter(
          (optionId) => optionId.id !== option.id
        );
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  return (
    <div className={styles["onboarding__3-main-container"]}>
      <div className={styles["left__component-con"]}>
        <div className={styles["left__main-component"]}>
          <div>
            <div className="nu-position-relative nu-flex nu-jc-center nu-column">
              <p className={styles["page__count-text"]}>3/6</p>
              <p className={styles["title__text"]}>
                Help us customise your workspace
              </p>
              <button
                className={styles["arrow__left-icon"]}
                onClick={() => {
                  router.push("/onboarding-page-2");
                }}
              >
                <CaretLeft size={IconSize.S} />
              </button>
            </div>
            <p className={cn(styles["description__text"], "nu-mt-2")}>
              Let&apos;s customise your trail according to your needs.
            </p>
            <p className={cn(styles["description__text"], "nu-mt-2")}>
              You can easily create workflows for virtually any use case.
              We&apos;ve got dozens of templates to get you started.
            </p>
          </div>
          <div className={styles["selected__options-con"]}>
            <p className={styles["usage__text"]}>
              What will you be using Nymble up for?
            </p>
            <div className={"nu-flex nu-ai-center nu-gap-1 nu-wrap nu-mt-6"}>
              {selectedOptions.map((option) => {
                return <Chip key={option.id} title={option.name} />;
              })}
            </div>
          </div>
          <Button
            className={styles["continue__button-component"]}
            title="Continue"
            isDisabled={selectedOptions.length === 0}
            buttonType={ButtonType.primary}
            onClick={() => {
              router.push("/onboarding-page-4");
            }}
          />
        </div>
      </div>
      <div className={styles["right__component-con"]}>
        <p>Select modules for your workspace</p>
        <div className={styles["usage__options-sub-con"]}>
          <div className={styles["usage__sub"]}>
            {moduleOptions.map((option) => {
              return (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      handleOptionClick(option);
                    }
                  }}
                  onClick={() => handleOptionClick(option)}
                  className={cn(styles["option__container"], {
                    [styles["selected"]]: selectedOptions.includes(option),
                  })}
                  key={option.id}
                >
                  <div className={styles["icon"]}>{option.icon}</div>
                  <div>
                    <p className={styles["option__name"]}>{option.name}</p>
                    <p className={styles["option__description"]}>
                      {option.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding3;
