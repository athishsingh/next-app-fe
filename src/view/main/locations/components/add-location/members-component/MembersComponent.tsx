import React from "react";
import styles from "./members-component.module.scss";
import { Plus, Trash } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { useAddLocationStore } from "@/src/store/main/locations/add-location/useAddLocationStore";
import Input from "@/src/components/input/Input";
import { MemberDetailsPropsType } from "./members-info.types";

const MembersComponent = () => {
  const { membersInfo, addNewMember, updateMemberInfo } = useAddLocationStore();

  const handleInputChange = (
    val: string,
    index: number,
    key: keyof MemberDetailsPropsType
  ) => {
    let arr = [...membersInfo];
    arr[index][key] = val;
    updateMemberInfo(arr);
  };

  const handleDelete = (memberIndex: number) => {
    let arr = [...membersInfo];
    let updatedArr = arr.filter((_, index) => index !== memberIndex);
    updateMemberInfo(updatedArr);
  };
  return (
    <div className={styles["member__main-container"]}>
      <div className={styles["add__member-container"]}>
        <p className={styles["header__text"]}> Add user info</p>
        <Plus
          size={IconSize.L}
          color="#09090B"
          tabIndex={0}
          onClick={addNewMember}
          className="nu-c-pointer"
        />
      </div>
      <div className={styles["member__info-container"]}>
        {membersInfo.map((member, index) => {
          return (
            <div key={index} className="nu-flex nu-gap-3">
              <div>
                <Trash
                  onClick={() => handleDelete(index)}
                  size={IconSize.M}
                  className="nu-shrink-zero nu-c-pointer"
                />
              </div>
              <div className="nu-flex nu-column nu-gap-3">
                <Input
                  autoWidth
                  value={member.memberName}
                  label="User name"
                  showLabelText
                  onChange={(value) => {
                    handleInputChange(value, index, "memberName");
                  }}
                  placeholder="Enter user name"
                />
                <div className="nu-flex nu-gap-3">
                  <Input
                    autoWidth
                    value={member.locationId}
                    label="Location ID"
                    showLabelText
                    onChange={(value) => {
                      handleInputChange(value, index, "locationId");
                    }}
                    placeholder="Enter location id"
                  />
                  <Input
                    value={member.phoneNumber}
                    autoWidth
                    type="num"
                    label="Phone number"
                    showLabelText
                    onChange={(value) => {
                      handleInputChange(value, index, "phoneNumber");
                    }}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MembersComponent;
