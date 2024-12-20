"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./onboarding-4.module.scss";
import { useRouter } from "nextjs-toploader/app";
import { IconSize } from "@/src/constants/iconsize.constant";
import { CaretLeft, Export, Plus, Trash } from "@phosphor-icons/react";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import Input from "@/src/components/input/Input";
import IconButton from "@/src/components/icon-button/IconButton";

type LocationDetailsInterface = {
  locationName: string;
  locationAddress: string;
};

const Onboarding4 = () => {
  const router = useRouter();
  const [locationDetails, setLocationDetails] = useState<
    LocationDetailsInterface[]
  >([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (
    value: string,
    index: number,
    key: keyof LocationDetailsInterface
  ) => {
    let arr = [...locationDetails];
    arr[index][key] = value;
    setLocationDetails(arr);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [locationDetails]);

  return (
    <div className={styles["onboarding__4-main-container"]}>
      <div className={styles["header__component"]}>
        <div className="nu-position-relative nu-flex nu-jc-center nu-column">
          <p className={styles["page__count-text"]}>4/6</p>
          <p className={styles["title__text"]}>Add locations</p>
          <button
            className={styles["arrow__left-icon"]}
            onClick={() => {
              router.push("/onboarding-page-3");
            }}
          >
            <CaretLeft size={IconSize.S} />
          </button>
        </div>
        <div className="nu-flex nu-gap-4 nu-jc-sb nu-ai-end">
          <p className={styles["description__text"]}>
            Add your business locations, you could add them manually or bulk
            upload your locations.
          </p>
          <div className="nu-flex nu-gap-5 nu-ai-center">
            <Button
              title="Bulk upload"
              onClick={() => {}}
              buttonType={ButtonType.secondary}
              prefixIcon={<Export size={IconSize.M} />}
            />
            <Button
              title="Add location"
              onClick={() => {
                setLocationDetails([
                  ...locationDetails,
                  { locationAddress: "", locationName: "" },
                ]);
              }}
              buttonType={ButtonType.tertiary}
              prefixIcon={<Plus size={IconSize.M} />}
            />
          </div>
        </div>
      </div>
      <div ref={scrollContainerRef} className="nu-h-full nu-overflow-scroll">
        <div className="nu-flex nu-column nu-h-full nu-gap-4">
          {locationDetails.map((location, index) => {
            return (
              <div
                key={index}
                className="nu-flex nu-ai-center nu-jc-sb nu-gap-5"
              >
                <div className="nu-flex nu-gap-5 nu-ai-center">
                  <div className={styles["number__container"]}>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>
                  <Input
                    width={340}
                    value={location.locationName}
                    onChange={(val) => {
                      handleOnChange(val, index, "locationName");
                    }}
                    placeholder="Enter location name"
                    label="Location name"
                    showLabelText
                  />
                  <Input
                    width={340}
                    value={location.locationAddress}
                    onChange={(value) => {
                      handleOnChange(value, index, "locationAddress");
                    }}
                    placeholder="Enter location address"
                    label="Location address"
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
                      setLocationDetails(
                        locationDetails.filter(
                          (e, filteredIndex) => index !== filteredIndex
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
              router.push("/onboarding-page-3");
            }}
            buttonType={ButtonType.secondary}
          />
          <Button
            title="Next section"
            isDisabled={locationDetails.length === 0}
            onClick={() => {
              router.push("/onboarding-page-5");
            }}
            buttonType={ButtonType.tertiary}
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding4;
