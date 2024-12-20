"use client";
import React, { useEffect, useState } from "react";
import styles from "./onboarding-2.module.scss";
import { CaretLeft } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Input from "@/src/components/input/Input";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { useRouter } from "nextjs-toploader/app";
import Dropdown from "@/src/components/dropdown/Dropdown";
import { IndustryTypeOptions } from "./onboarding-2.data";
import { DropdownSelectUIType } from "@/src/components/dropdown/dropdown.types";
import { countriesData } from "@/src/data/countries-data";

const Onboarding2 = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [workspaceHandle, setWorkspaceHandle] = useState<string>("");
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [industryType, setIndustryType] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const checkIfValid = (): boolean => {
      if (
        companyName === "" ||
        workspaceHandle === "" ||
        selectedCountry[0].label === "" ||
        industryType[0].label === ""
      )
        return false;
      else return true;
    };
    setIsValid(checkIfValid());
  }, [industryType, workspaceHandle, companyName, selectedCountry]);
  return (
    <div className={styles["onboarding__2-main-con"]}>
      <div className={styles["left__component-con"]}>
        <div className={styles["left__main-component"]}>
          <div className="nu-position-relative nu-flex nu-jc-center nu-column">
            <p className={styles["page__count-text"]}>2/6</p>
            <p className={styles["title__text"]}>Let&apos;s get to know you</p>
            <button
              className={styles["arrow__left-icon"]}
              onClick={() => {
                router.push("/onboarding-page-1");
              }}
            >
              <CaretLeft size={IconSize.S} />
            </button>
          </div>
          <div style={{ height: "96px", width: "100%" }}>
            here profile upload will come
          </div>
          <div className="nu-flex nu-column nu-gap-4">
            <Input
              value={companyName}
              onChange={(value) => {
                setCompanyName(value);
              }}
              label="Company name"
              autoWidth
              showLabelText
              placeholder="Enter company name"
            />
            <Input
              value={workspaceHandle}
              onChange={(value) => {
                setWorkspaceHandle(value);
              }}
              label="Workspace handle"
              autoWidth
              showLabelText
              placeholder="Enter workspace handle"
              suffixIcon={
                <div className={styles["workspace__main-con"]}>
                  <p className={styles["workspace__suffix-text"]}>
                    nymbleup.com
                  </p>
                </div>
              }
            />
            <Dropdown
              headerLabel="Industry type"
              showHeaderLabel
              uiType={DropdownSelectUIType.basic}
              placeholder="Select an industry type"
              onChange={(industryVal) => {
                setIndustryType(industryVal);
              }}
              selectedOption={industryType}
              options={IndustryTypeOptions}
            />
            <Dropdown
              headerLabel="Country"
              showHeaderLabel
              placeholder="Select your country"
              selectedOption={selectedCountry}
              onChange={(countryValue) => {
                setSelectedCountry(countryValue);
              }}
              uiType={DropdownSelectUIType.basic}
              options={countriesData.map((country) => ({
                label: country.nicename,
                value: country.nicename,
              }))}
              forceTop
              isSearchable
              searchInputPlaceholder="Search for country"
            />
          </div>
          <Button
            buttonType={ButtonType.primary}
            title="Continue"
            isDisabled={!isValid}
            onClick={() => {
              router.push("/onboarding-page-3");
            }}
            className="nu-my-6"
          />
        </div>
      </div>
      <div className={styles["right__component-con"]}></div>
    </div>
  );
};

export default Onboarding2;
