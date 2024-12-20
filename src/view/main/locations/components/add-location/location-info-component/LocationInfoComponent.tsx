"use client";
import React from "react";
import styles from "./location-info-component.module.scss";
import Input from "@/src/components/input/Input";
import { IconSize } from "@/src/constants/iconsize.constant";
import { MapPinArea } from "@phosphor-icons/react";
import { useAddLocationStore } from "@/src/store/main/locations/add-location/useAddLocationStore";
import Toggle from "@/src/components/toggle/Toggle";
import TimePicker from "@/src/components/time-picker/TimePicker";

const LocationInfoComponent = () => {
  const {
    locationTimings,
    locationName,
    locationAddress,
    setLocationName,
    setLocationAddress,
    setLocationTimings,
  } = useAddLocationStore();
  return (
    <div className={styles["locations__main-con"]}>
      <Input
        placeholder="Enter your location name"
        label="Location name"
        onChange={(e) => setLocationName(e)}
        value={locationName}
        showLabelText
        autoWidth
      />
      <Input
        classnames="nu-my-7"
        placeholder="Enter address here"
        label="Address"
        onChange={(e) => setLocationAddress(e)}
        value={locationAddress}
        showLabelText
        prefixIcon={<MapPinArea size={IconSize.M} />}
        autoWidth
      />
      <div className={styles["store__hours-main-con"]}>
        <p className={styles["header__text"]}>Set store hours:</p>
        <div className="nu-flex nu-column nu-gap-3">
          {locationTimings.map((week) => {
            return (
              <div key={week.dayName} className="nu-flex nu-ai-center">
                <p className={styles["weekday__name-text"]}>{week.dayName}</p>
                <div className={styles["divider"]} />
                <Toggle
                  className={"nu-mx-5"}
                  checked={!week.closed}
                  onChange={() => {
                    let arr = [...locationTimings];
                    const selectedDay = locationTimings.findIndex(
                      (ele) => ele.day === week.day
                    );
                    arr[selectedDay] = {
                      ...arr[selectedDay],
                      closed: !week.closed,
                      closing_time: "",
                      opening_time: "",
                    };
                    setLocationTimings(arr);
                  }}
                />
                <p className={styles["status__text"]}>
                  {week.closed ? "Close" : "Open"}
                </p>
                <TimePicker
                  timeValue={week.opening_time}
                  isDisabled={week.closed}
                  onChange={(time) => {
                    let arr = [...locationTimings];
                    const selectedDay = locationTimings.findIndex(
                      (ele) => ele.day === week.day
                    );
                    arr[selectedDay] = {
                      ...arr[selectedDay],
                      opening_time: time,
                    };
                    setLocationTimings(arr);
                  }}
                />
                <div className="nu-ml-4">
                  <TimePicker
                    timeValue={week.closing_time}
                    minTime={week.opening_time}
                    addMinutes="10"
                    isDisabled={week.opening_time === "" || week.closed}
                    onChange={(closeTime) => {
                      let arr = [...locationTimings];
                      const selectedDay = locationTimings.findIndex(
                        (ele) => ele.day === week.day
                      );
                      arr[selectedDay] = {
                        ...arr[selectedDay],
                        closing_time: closeTime,
                      };
                      setLocationTimings(arr);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationInfoComponent;
