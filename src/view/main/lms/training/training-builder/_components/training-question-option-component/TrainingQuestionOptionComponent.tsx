import IconButton from "@/src/components/icon-button/IconButton";
import Input from "@/src/components/input/Input";
import Switch from "@/src/components/switch/Switch";
import { IconSize } from "@/src/constants/iconsize.constant";
import { Trash } from "@phosphor-icons/react";
import React from "react";
import styles from "./training-question-option-component.module.scss";

const TrainingQuestionOptionComponent = ({
  value,
  isSelected,
  onInputChange,
  onSwitchChange,
  onDeleteClick,
}: {
  value: string;
  onInputChange: (val: string) => void;
  isSelected: boolean;
  onSwitchChange: (val: string) => void;
  onDeleteClick: () => void;
}) => {
  return (
    <div className="nu-flex nu-ai-center nu-gap-5">
      <div
        className="nu-flex nu-ai-center nu-flex nu-gap-1"
        style={{ flex: 3 }}
      >
        <IconButton
          icon={<Trash size={IconSize.M} className="nu-shrink-zero" />}
          onClick={onDeleteClick}
        />
        <div className="nu-w-full">
          <Input
            autoWidth
            showLabelText
            label={`Option`}
            value={value}
            placeholder="Enter question"
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="nu-flex nu-flex-one nu-column">
        <p className={styles["label__text-info"]}>Condition</p>
        <Switch
          options={[
            { label: "Pass", value: "pass" },
            { label: "Fail", value: "fail" },
          ]}
          onClick={onSwitchChange}
          selectedOption={isSelected ? "pass" : "fail"}
        />
      </div>
    </div>
  );
};

export default TrainingQuestionOptionComponent;
