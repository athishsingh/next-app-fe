"use client";
import React, { useEffect, useState } from "react";
import styles from "./onboarding-1.module.scss";
import Input from "@/src/components/input/Input";
import { Divider } from "@/src/components/divider/Divider";
import Toggle from "@/src/components/toggle/Toggle";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { useRouter } from "nextjs-toploader/app";
import { CaretDown } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Dropdown from "@/src/components/dropdown/Dropdown";
import { countriesData } from "@/src/data/countries-data";

const Onboarding1 = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [mobileNo, setMobileNo] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<
    {
      label: string;
      value: string;
    }[]
  >([
    {
      label: "India",
      value: "91",
    },
  ]);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const checkIfValid = () => {
      if (fullName === "" || mobileNo === "") return false;
      else return true;
    };
    setIsValid(checkIfValid());
  }, [fullName, mobileNo]);

  const handleOnContinueClick = () => {
    if (!isValid) return;
    router.push("/onboarding-page-2");
  };
  return (
    <div className={styles["onboarding__1-main-con"]}>
      <div className={styles["left__component-container"]}>
        <div className={styles["left__main-component"]}>
          <div>
            <div>
              <p className={styles["page__count-text"]}>1/6</p>
              <p className={styles["title__text"]}>
                Let&apos;s get to know you
              </p>
            </div>
            <div className="nu-flex nu-column nu-gap-4 nu-w-full nu-mt-6">
              <Input
                value={fullName}
                placeholder="Enter your full name"
                autoWidth
                onChange={(e) => {
                  setFullName(e);
                }}
                label="Full name"
                showLabelText
              />
              <Input
                value={mobileNo}
                placeholder="Enter your mobile number"
                autoWidth
                type="num"
                onChange={(e) => {
                  setMobileNo(e);
                }}
                label="Mobile no."
                showLabelText
                prefixIcon={
                  <>
                    <Dropdown
                      options={countriesData.map((country) => {
                        return {
                          label: country.nicename,
                          value: country.phonecode,
                          customRenderer: (
                            <div className="nu-flex nu-jc-sb nu-w-full nu-ai-center">
                              <p className="nu-flex-one">{country.nicename}</p>
                              <p>+{country.phonecode}</p>
                            </div>
                          ),
                        };
                      })}
                      onChange={(value) => {
                        setSelectedCountry(value);
                      }}
                      isSearchable
                      customSelectContainer={
                        <div
                          className={
                            styles["country__dropdown-select-container"]
                          }
                          tabIndex={0}
                        >
                          <p>+ {selectedCountry[0].value}</p>
                          <CaretDown size={IconSize.S} />
                        </div>
                      }
                      removeAllStyles
                      selectedOption={selectedCountry}
                      placeholder=""
                      width="350px"
                      noItemsText="Country not found"
                    />
                  </>
                }
              />
              <Divider />
              <div className="nu-flex nu-gap-1 nu-ai-center">
                <div className={"nu-flex nu-column nu-flex-one nu-gap-1"}>
                  <p className={styles["subscrible__text"]}>
                    Subscribe to product update emails
                  </p>
                  <p className={styles["subscribe__desc-text"]}>
                    Get the latest updates about features and product updates.
                  </p>
                </div>

                <Toggle className={"nu-shrink-zero"} />
              </div>
            </div>
          </div>
          <Button
            buttonType={ButtonType.primary}
            title="Continue"
            isDisabled={!isValid}
            onClick={handleOnContinueClick}
            className="nu-my-6"
          />
        </div>
      </div>
      <div className={styles["right__component-container"]} />
    </div>
  );
};

export default Onboarding1;
