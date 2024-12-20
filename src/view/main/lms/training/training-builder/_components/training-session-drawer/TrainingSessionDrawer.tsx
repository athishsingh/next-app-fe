import styles from "./training-session-drawer.module.scss";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import DatePicker from "@/src/components/datepicker/DatePicker";
import Drawer from "@/src/components/drawer/Drawer";
import Dropdown from "@/src/components/dropdown/Dropdown";
import { DropdownSelectUIType } from "@/src/components/dropdown/dropdown.types";
import IconButton from "@/src/components/icon-button/IconButton";
import Input from "@/src/components/input/Input";
import MediaPicker from "@/src/components/media-picker/MediaPicker";
import Textarea from "@/src/components/textarea/Textarea";
import TimePicker from "@/src/components/time-picker/TimePicker";
import { IconSize } from "@/src/constants/iconsize.constant";
import useFetch from "@/src/hooks/useFetchHook";
import { COMMON_ENDPOINTS } from "@/src/services/endpoints/common-endpoints";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";
import { TrainingSessionPropsType } from "@/src/types/lms/training-types";
import { Clock, CopySimple, Plus } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { deleteData, postData, putData } from "@/src/services/data.service";
import { generateFilePreviews } from "@/src/utils/general.utils";
import FileMaterialCard from "@/src/components/file-material-card/FileMaterialCard";
import Infotile from "@/src/components/info-tile/Infotile";
import Toggle from "@/src/components/toggle/Toggle";
import { isDataModified } from "@/src/utils/comparision.utils";
import useToast from "@/src/hooks/useToast";

const TrainingSessionDrawer = ({
  trainingId,
  onSuccess,
}: {
  trainingId: string;
  onSuccess: () => void;
}) => {
  const { showSuccessToast } = useToast();
  const {
    showSessionDrawer,
    drawerSessionId,
    drawerSessionInfo,
    drawerSessionInfoCopy,
    setDrawerSessionId,
    setShowSessionDrawer,
    setDrawerSessionInfo,
    setDrawerSessionInfoCopy,
  } = useLmsTrainingStore();

  const [copied, setCopied] = useState<boolean>(false);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [shouldDeleteMediaIds, setShouldDeleteMediaIds] = useState<string[]>(
    []
  );
  const [newFilesPreview, setNewFilesPreview] = useState<
    {
      type: string;
      url: string;
      fileName: string;
      fileSize: string;
    }[]
  >([]);
  const sessionTypeMap = {
    virtual: "Virtual",
    hybrid: "Hybrid",
    in_store: "In store",
  };
  const [allFieldsPresent, setAllFieldsPresent] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const handleClose = () => {
    setShowSessionDrawer(!showSessionDrawer);
    setDrawerSessionId("");
    setDrawerSessionInfo(null);
    setDrawerSessionInfoCopy(null);
    setNewFiles([]);
    setNewFilesPreview([]);
    setShouldDeleteMediaIds([]);
  };

  const handleCheckCanCreate = () => {
    if (
      (drawerSessionInfo?.session_name ?? "") === "" ||
      (drawerSessionInfo?.session_description ?? "") === "" ||
      (drawerSessionInfo?.session_trainer_designation?.id ?? "") === "" ||
      (drawerSessionInfo?.session_trainer ?? "") === "" ||
      drawerSessionInfo?.session_date === undefined ||
      (drawerSessionInfo?.session_start_time ?? "") === "" ||
      (drawerSessionInfo?.session_end_time ?? "") === "" ||
      checkTypeBased()
    ) {
      return false;
    }
    return true;
  };

  const checkTypeBased = () => {
    const {
      session_location,
      session_store = "",
      session_link = "",
    } = drawerSessionInfo || {};

    switch (session_location) {
      case "hybrid":
        return !session_store || !session_link;
      case "in_store":
        return !session_store;
      case "virtual":
        return !session_link;
      default:
        return true;
    }
  };

  useEffect(() => {
    const check = handleCheckCanCreate();
    const hasChanges =
      isDataModified(
        drawerSessionInfoCopy as TrainingSessionPropsType,
        drawerSessionInfo as TrainingSessionPropsType
      ) ||
      newFiles.length > 0 ||
      shouldDeleteMediaIds.length > 0;
    setIsEdited(hasChanges);
    setAllFieldsPresent(check);
  }, [drawerSessionInfo, newFiles, shouldDeleteMediaIds]);

  const { response: designations } = useFetch<{
    total_count: number;
    results: { id: string; name: string }[];
  }>(LMS_ENDPOINTS.DESIGNATIONS.LIST_DESIGNATION, []);

  const { response: usersResponse, setResponse: setUsersResponse } = useFetch<{
    total_count: number;
    results: { id: string; full_name: string }[];
  }>(
    drawerSessionInfo?.session_trainer_designation?.id
      ? LMS_ENDPOINTS.USERS.LIST_USERS(
          drawerSessionInfo.session_trainer_designation.id
        )
      : null,
    [drawerSessionInfo?.session_trainer_designation?.id]
  );

  const { response: outletsResponse } = useFetch<
    { id: string; name: string }[]
  >(COMMON_ENDPOINTS.OUTLETS.LIST_ALL_OUTLETS, []);

  const handleMediaDeletionsAndUpdate = async () => {
    if (shouldDeleteMediaIds.length > 0) {
      try {
        await Promise.all(
          shouldDeleteMediaIds.map((mediaId) => handleMediaDelete(mediaId))
        );
      } catch (error) {}
    } else return;
  };

  const handleMediaDelete = async (mediaId: string) => {
    try {
      await deleteData(LMS_ENDPOINTS.MEDIA.DELETE_MEDIA(mediaId));
    } catch (error) {
      console.log(error, "this is error");
    }
  };

  const handleNewFileDelete = (index: number) => {
    setNewFilesPreview((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setNewFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append("training", trainingId);
    formData.append("session_name", drawerSessionInfo?.session_name || "");
    formData.append(
      "session_description",
      drawerSessionInfo?.session_description || ""
    );
    formData.append("session_type", "session");
    formData.append(
      "session_trainer_designation",
      drawerSessionInfo?.session_trainer_designation?.id || ""
    );
    formData.append(
      "session_trainer_name",
      drawerSessionInfo?.session_trainer_name || ""
    );
    formData.append(
      "session_trainer",
      drawerSessionInfo?.session_trainer || ""
    );
    formData.append("session_date", drawerSessionInfo?.session_date || "");
    formData.append(
      "session_start_time",
      drawerSessionInfo?.session_start_time || ""
    );
    formData.append(
      "session_end_time",
      drawerSessionInfo?.session_end_time || ""
    );
    formData.append(
      "session_location",
      drawerSessionInfo?.session_location || ""
    );
    if (
      drawerSessionInfo?.session_location === "virtual" ||
      drawerSessionInfo?.session_location === "hybrid"
    ) {
      formData.append("session_link", drawerSessionInfo?.session_link || "");
    }
    if (
      drawerSessionInfo?.session_location === "in_store" ||
      drawerSessionInfo?.session_location === "hybrid"
    ) {
      formData.append("session_store", drawerSessionInfo?.session_store || "");
      formData.append(
        "session_store_name",
        drawerSessionInfo?.session_store_name || ""
      );
    }
    if (drawerSessionInfo?.session_location === "in_store") {
      formData.append(
        "within_store_geofence",
        String(drawerSessionInfo.within_store_geofence ?? false)
      );
    }
    if (newFiles.length > 0) {
      newFiles.forEach((file) => {
        formData.append("session_pre_read_material", file);
      });
    }

    return formData;
  };

  const handleCreateSession = async () => {
    const formData = createFormData();
    setisLoading(true);
    try {
      await postData<FormData, unknown>(
        LMS_ENDPOINTS.TRAINING.SESSIONS.CREATE_TRAINING_SESSION,
        formData,
        {
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        }
      );
      showSuccessToast({
        message: "Successful",
        description: "Session created successfully!",
      });
      onSuccess();
      handleClose();
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };

  const handleUpdateSession = async () => {
    if (
      drawerSessionId === "add" ||
      drawerSessionId === null ||
      drawerSessionId === ""
    )
      return;
    const formData = createFormData();
    setisLoading(true);
    try {
      await handleMediaDeletionsAndUpdate();
      await putData<FormData>(
        LMS_ENDPOINTS.TRAINING.SESSIONS.UPDATE_TRAINING_SESSION(
          drawerSessionId
        ),
        formData,
        {
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        }
      );
      showSuccessToast({
        message: "Successful",
        description: "Session updated successfully!",
      });
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Error updating training:", error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Drawer
      width={450}
      showConfirmationModal={isLoading || isEdited}
      confirmationModalDetails={{
        title: "Are you sure you want to close?",
        subtitle:
          "There's are unsaved changes and on closing all the unsaved changes will be lost!",
        onConfirmClick: handleClose,
      }}
      headerText="Session details"
      visible={showSessionDrawer}
      setVisible={handleClose}
      footerComponent={
        <>
          <Button
            isDisabled={!allFieldsPresent || !isEdited}
            isLoading={isLoading}
            title={
              drawerSessionId === "add" ? "Add session" : "Updated session"
            }
            onClick={
              drawerSessionId === "add"
                ? handleCreateSession
                : handleUpdateSession
            }
            buttonType={ButtonType.primary}
          />
        </>
      }
    >
      <div className="nu-px-15 nu-py-7 nu-border-bottom nu-flex nu-gap-3 nu-column">
        <Input
          value={drawerSessionInfo?.session_name || ""}
          onChange={(val) => {
            setDrawerSessionInfo({
              ...drawerSessionInfo,
              session_name: val,
            } as TrainingSessionPropsType);
          }}
          placeholder="Enter session name"
          label="Session name"
          showLabelText
          autoWidth
        />
        <Textarea
          value={drawerSessionInfo?.session_description || ""}
          onChange={(value) => {
            setDrawerSessionInfo({
              ...drawerSessionInfo,
              session_description: value,
            } as TrainingSessionPropsType);
          }}
          placeholder="Enter session description"
          label="Session description"
        />
        <div className="nu-flex nu-gap-5 nu-ai-center">
          <Dropdown
            placeholder="Select designation"
            headerLabel="Designation"
            showHeaderLabel
            uiType={DropdownSelectUIType.basic}
            selectedOption={
              drawerSessionInfo?.session_trainer_designation?.id
                ? [
                    {
                      label:
                        drawerSessionInfo?.session_trainer_designation.name ||
                        "",
                      value:
                        drawerSessionInfo?.session_trainer_designation.id || "",
                    },
                  ]
                : []
            }
            onChange={([val]) => {
              setUsersResponse(null);
              setDrawerSessionInfo({
                ...drawerSessionInfo,
                session_trainer_designation: { id: val.value, name: val.label },
                session_trainer_name: "",
                session_trainer: "",
              } as TrainingSessionPropsType);
            }}
            options={(designations?.results ?? []).map((designation) => ({
              label: designation.name,
              value: designation.id,
            }))}
            classNames="nu-flex-one"
            width="150%"
          />
          <Dropdown
            classNames="nu-flex-one"
            placeholder={"Select trainer"}
            headerLabel="Trainer name"
            showHeaderLabel
            noItemsText="No users found for the designation"
            uiType={DropdownSelectUIType.basic}
            selectedOption={
              drawerSessionInfo?.session_trainer &&
              drawerSessionInfo?.session_trainer_name
                ? [
                    {
                      label: drawerSessionInfo.session_trainer_name,
                      value: drawerSessionInfo?.session_trainer,
                    },
                  ]
                : []
            }
            options={(usersResponse?.results ?? []).map((user) => ({
              label: user.full_name,
              value: user.id,
            }))}
            onChange={([val]) => {
              setDrawerSessionInfo({
                ...drawerSessionInfo,
                session_trainer_name: val.label,
                session_trainer: val.value,
              } as TrainingSessionPropsType);
            }}
            width="150%"
          />
        </div>
      </div>

      <div className="nu-px-15 nu-py-7 nu-border-bottom nu-flex nu-gap-3 nu-column">
        <p className={styles["training__session-header"]}>
          Set date & timings:
        </p>
        <div className="nu-flex nu-ai-end nu-gap-1 nu-jc-sb">
          <DatePicker
            date={
              drawerSessionInfo?.session_date
                ? new Date(`${drawerSessionInfo?.session_date}T00:00:00.000Z`)
                : null
            }
            onSelect={(val) => {
              const date = val.toString().split("T")[0];
              setDrawerSessionInfo({
                ...drawerSessionInfo,
                session_date: date,
              } as TrainingSessionPropsType);
            }}
            label="On date"
          />
          <TimePicker
            onChange={(val) => {
              setDrawerSessionInfo({
                ...drawerSessionInfo,
                session_start_time: `${val}:00`,
                session_end_time: "",
              } as TrainingSessionPropsType);
            }}
            timeValue={drawerSessionInfo?.session_start_time || ""}
            label="Start time"
            prefixIcon={
              <Clock size={IconSize.S} color="#b2b1ff" weight="fill" />
            }
          />
          <TimePicker
            addMinutes="01"
            onChange={(val) => {
              setDrawerSessionInfo({
                ...drawerSessionInfo,
                session_end_time: `${val}:00`,
              } as TrainingSessionPropsType);
            }}
            minTime={drawerSessionInfo?.session_start_time}
            timeValue={drawerSessionInfo?.session_end_time || ""}
            label="End time"
            prefixIcon={
              <Clock size={IconSize.S} color="#b2b1ff" weight="fill" />
            }
          />
        </div>
      </div>
      <div className="nu-px-15 nu-py-7 nu-border-bottom nu-flex nu-gap-3 nu-column">
        <p className={styles["training__session-header"]}>Session info:</p>
        <div className="nu-flex nu-ai-end nu-gap-5">
          <div style={{ flex: 1 }}>
            <Dropdown
              options={[
                { label: "Hybrid", value: "hybrid" },
                { label: "In store", value: "in_store" },
                { label: "Virtual", value: "virtual" },
              ]}
              selectedOption={
                drawerSessionInfo?.session_location
                  ? [
                      {
                        label:
                          sessionTypeMap[drawerSessionInfo?.session_location],
                        value: drawerSessionInfo?.session_location,
                      },
                    ]
                  : []
              }
              placeholder="Select type"
              headerLabel="Session type"
              showHeaderLabel
              onChange={([val]) => {
                setDrawerSessionInfo({
                  ...drawerSessionInfo,
                  session_location: val.value,
                } as TrainingSessionPropsType);
              }}
              uiType={DropdownSelectUIType.basic}
            />
          </div>
          <div style={{ flex: 2 }}>
            {drawerSessionInfo?.session_location != "in_store" && (
              <Input
                autoWidth
                value={drawerSessionInfo?.session_link || ""}
                onChange={(linkVal) => {
                  setDrawerSessionInfo({
                    ...drawerSessionInfo,
                    session_link: linkVal,
                  } as TrainingSessionPropsType);
                }}
                placeholder="Enter meeting url"
                label="Meet info"
                showLabelText
                suffixIcon={
                  drawerSessionInfo?.session_link && (
                    <IconButton
                      icon={
                        <CopySimple
                          size={IconSize.S}
                          color={copied ? "#66BB6A" : "#212121"}
                        />
                      }
                      onClick={() => {
                        navigator.clipboard.writeText(
                          drawerSessionInfo?.session_link || ""
                        );
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 1000);
                      }}
                    />
                  )
                }
              />
            )}
            {drawerSessionInfo?.session_location === "in_store" && (
              <Dropdown
                placeholder="Select store"
                selectedOption={
                  drawerSessionInfo?.session_store &&
                  drawerSessionInfo?.session_store_name
                    ? [
                        {
                          label: drawerSessionInfo?.session_store_name,
                          value: drawerSessionInfo?.session_store,
                        },
                      ]
                    : []
                }
                options={(outletsResponse ?? []).map((outlet) => ({
                  label: outlet.name,
                  value: outlet.id,
                }))}
                onChange={([val]) => {
                  setDrawerSessionInfo({
                    ...drawerSessionInfo,
                    session_store: val.value,
                    session_store_name: val.label,
                  } as TrainingSessionPropsType);
                }}
                uiType={DropdownSelectUIType.basic}
                headerLabel="Store"
                showHeaderLabel
              />
            )}
          </div>
        </div>
        {drawerSessionInfo?.session_location === "hybrid" && (
          <Dropdown
            placeholder="Select store"
            selectedOption={
              drawerSessionInfo?.session_store &&
              drawerSessionInfo?.session_store_name
                ? [
                    {
                      label: drawerSessionInfo?.session_store_name,
                      value: drawerSessionInfo?.session_store,
                    },
                  ]
                : []
            }
            options={(outletsResponse ?? []).map((outlet) => ({
              label: outlet.name,
              value: outlet.id,
            }))}
            onChange={([val]) => {
              setDrawerSessionInfo({
                ...drawerSessionInfo,
                session_store: val.value,
                session_store_name: val.label,
              } as TrainingSessionPropsType);
            }}
            uiType={DropdownSelectUIType.basic}
            headerLabel="Store"
            showHeaderLabel
          />
        )}
        {drawerSessionInfo?.session_location === "in_store" && (
          <Infotile
            parentWidth
            classnames="nu-w-full"
            rightComponent={
              <div className="nu-flex nu-flex-one nu-w-full nu-jc-end">
                <Toggle
                  checked={drawerSessionInfo.within_store_geofence ?? false}
                  onChange={() => {
                    setDrawerSessionInfo({
                      ...drawerSessionInfo,
                      within_store_geofence:
                        !drawerSessionInfo.within_store_geofence,
                    } as TrainingSessionPropsType);
                  }}
                />
              </div>
            }
            title="Allow Geofence"
          />
        )}
      </div>

      <div className="nu-px-15 nu-py-7 nu-border-bottom nu-flex nu-gap-3 nu-column nu-mb-10">
        <div className="nu-flex nu-jc-sb nu-ai-center nu-gap-2">
          <p className={styles["training__session-header"]}>
            Add pre read materials:
          </p>
          {(drawerSessionInfo?.session_read_materials?.length || 0) -
            shouldDeleteMediaIds.length +
            newFiles.length <
            10 && (
            <MediaPicker
              allowedFileFormats={[
                ".jpeg",
                ".jpg",
                ".mp4",
                ".png",
                ".pdf",
                ".ppt",
                ".pptx",
              ]}
              isFromModal
              maxFilesCount={
                10 -
                ((drawerSessionInfo?.session_read_materials?.length || 0) -
                  shouldDeleteMediaIds.length) -
                newFiles.length
              }
              renderComponent={
                <div className="nu-flex nu-ai-center nu-gap-1">
                  <Plus size={IconSize.S} />
                  <p className={styles["training__session-add-material"]}>
                    Add new file
                  </p>
                </div>
              }
              onSubmit={(files) => {
                setNewFiles([...newFiles, ...files]);
                const fileSelected = generateFilePreviews(files);
                setNewFilesPreview([...newFilesPreview, ...fileSelected]);
              }}
            />
          )}
        </div>
        <>
          {(drawerSessionInfo?.session_read_materials ?? []).map(
            (material, index) => {
              return (
                <FileMaterialCard
                  mediaLength={material.media_length}
                  mediaName={material.media_name}
                  mediaType={material.media_type}
                  key={material.media_id}
                  onDeleteClick={() => {
                    let tempArr = [
                      ...(drawerSessionInfo?.session_read_materials ?? []),
                    ];
                    tempArr.splice(index, 1);
                    setDrawerSessionInfo({
                      ...drawerSessionInfo,
                      session_read_materials: tempArr,
                    } as TrainingSessionPropsType);

                    setShouldDeleteMediaIds([
                      ...shouldDeleteMediaIds,
                      material.media_id,
                    ]);
                  }}
                />
              );
            }
          )}
          {(newFilesPreview ?? []).map((file, index) => {
            return (
              <FileMaterialCard
                key={file.fileName}
                mediaLength={file.fileSize}
                mediaName={file.fileName}
                mediaType={file.type}
                onDeleteClick={() => handleNewFileDelete(index)}
              />
            );
          })}
        </>
      </div>
    </Drawer>
  );
};

export default TrainingSessionDrawer;
