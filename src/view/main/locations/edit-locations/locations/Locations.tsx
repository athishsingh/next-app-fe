"use client";
import React, { useState } from "react";
import styles from "./location.module.scss";
import Input from "@/src/components/input/Input";
import Dropdown from "@/src/components/dropdown/Dropdown";
import { DropdownSelectUIType } from "@/src/components/dropdown/dropdown.types";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { Pencil } from "@phosphor-icons/react";
import Infotile from "@/src/components/info-tile/Infotile";
import Toggle from "@/src/components/toggle/Toggle";
import Rangepicker from "@/src/components/range-picker/Rangepicker";

const Locations = () => {
  const [range, setRange] = useState<number>(200);
  return (
    <div className={styles["locations__main-con"]}>
      <div className={styles["location__name-type-con"]}>
        <Input
          onChange={() => {}}
          value=""
          placeholder="Enter location name"
          label="Location name"
          showLabelText
          autoWidth
          classnames={styles["location_name-input"]}
        />
        <div className={styles["location__type-dropdown"]}>
          <Dropdown
            headerLabel="Industry type"
            showHeaderLabel
            uiType={DropdownSelectUIType.basic}
            placeholder="Select an industry type"
            onChange={(industryVal) => {}}
            selectedOption={[]}
            options={[
              { label: "Manufacturing", value: "manufacturing" },
              { label: "IT Industry", value: "it industry" },
              { label: "E- commerce", value: "e- commerce" },
              { label: "Restaurant", value: "restaurant" },
            ]}
          />
        </div>
      </div>
      <div className={styles["location__id-email-container"]}>
        <div className={styles["location__con"]}>
          <Input
            value=""
            classnames={styles["location__id-con"]}
            onChange={() => {}}
            placeholder="Enter location id"
            label="Location ID"
            showLabelText
            autoWidth
          />
          <Input
            autoWidth
            value=""
            classnames={styles["location__email-con"]}
            onChange={() => {}}
            placeholder="Enter email id"
            label="Email ID"
            showLabelText
          />
        </div>
        <div className={styles["unwanted__con"]} />
      </div>
      <div className={styles["location__address-lat-long-container"]}>
        <Input
          value=""
          classnames="nu-flex-one"
          onChange={() => {}}
          placeholder="Enter location address"
          label="Address"
          showLabelText
          autoWidth
        />
        <div className="nu-flex nu-flex-one nu-gap-5 nu-ai-end">
          <Input
            value=""
            onChange={() => {}}
            placeholder="0"
            label="Latitude"
            showLabelText
            autoWidth
          />
          <Input
            value=""
            onChange={() => {}}
            placeholder="0"
            label="Longitude"
            showLabelText
            autoWidth
          />
          <div>
            <Button
              title="Edit"
              prefixIcon={<Pencil />}
              onClick={() => {}}
              buttonType={ButtonType.tertiary}
            />
          </div>
        </div>
      </div>
      <div className="nu-flex nu-ai-center nu-gap-20">
        <div className="nu-flex nu-flex-one nu-gap-5 nu-wrap">
          <Infotile
            title="Timezone"
            rightComponent={
              <p className={styles["timezone__text"]}>
                Central Daylight Time Chicago (GMT-5)
              </p>
            }
          />
          <Infotile
            title="Is Geofence applicable?"
            rightComponent={<Toggle />}
          />

          <Infotile
            title="Geofence range"
            rightComponent={
              <Rangepicker
                onChange={(val) => {
                  setRange(val);
                }}
                min={20}
                max={1000}
                value={range}
                showValue
                valueSuffix="m"
              />
            }
          />
        </div>
      </div>
      <div>
        <p>maps comes here</p>
      </div>
    </div>
  );
};

export default Locations;
