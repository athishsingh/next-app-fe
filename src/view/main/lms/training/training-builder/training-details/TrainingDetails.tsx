/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./training-details.module.scss";
import Input from "@/src/components/input/Input";
import Image from "next/image";
import Button from "@/src/components/button/Button";
import { generateFilePreviews, noop } from "@/src/utils/general.utils";
import MediaPicker from "@/src/components/media-picker/MediaPicker";
import { ButtonType } from "@/src/components/button/types";
import { Trash, UploadSimple } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Textarea from "@/src/components/textarea/Textarea";
import Infotile from "@/src/components/info-tile/Infotile";
import Toggle from "@/src/components/toggle/Toggle";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import { TrainingTypes } from "@/src/types/lms/training-types";
import useFetch from "@/src/hooks/useFetchHook";
import TrainingDetailsShrimmer from "./TrainingDetailsShrimmer";
import { isDataModified } from "@/src/utils/comparision.utils";
import Dropdown from "@/src/components/dropdown/Dropdown";
import { DropdownSelectUIType } from "@/src/components/dropdown/dropdown.types";
import { CategoryType } from "@/src/types/lms/lms-common-types";
import { deleteData, postData, putData } from "@/src/services/data.service";
import { useRouter } from "nextjs-toploader/app";
import DatePicker from "@/src/components/datepicker/DatePicker";
import { addDaysToDate } from "@/src/utils/date.utils";
import useToast from "@/src/hooks/useToast";

const TrainingDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const initialData = {
    id: "",
    training_banner: "",
    training_banner_media_address: "",
    training_code: "",
    training_description: "",
    training_live: false,
    training_name: "",
    end_date: "",
    start_date: "",
    training_categories: [],
    certification_downloadable: false,
    within_store_geofence: false,
  };
  const [imgData, setImgData] = useState<File | null>(null);
  const [trainingData, setTrainingData] = useState<TrainingTypes>(initialData);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [updatedTraingData, setUpdatedTrainingData] =
    useState<TrainingTypes>(initialData);
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [refetchCount, setRefetchCount] = useState<number>(0);
  const [deleteMediaId, setDeleteMediaId] = useState<string>("");
  const [isAllFieldsPresent, setIsAllFiledPresent] = useState<boolean>(false);
  const { showSuccessToast, showErrorToast } = useToast();

  const { response, error, isLoading } = useFetch<TrainingTypes>(
    id !== "create" && id !== undefined
      ? LMS_ENDPOINTS.TRAINING.TRAINING.GET_TRAINING(id)
      : null,
    [refetchCount]
  );

  const { response: categoriesData, isLoading: categeoriesLoading } = useFetch<{
    total_count: number;
    results: CategoryType[];
  }>(LMS_ENDPOINTS.CATEGORIES.LIST_CATEGORIES);

  useEffect(() => {
    if (response) {
      setUpdatedTrainingData(response);
      setTrainingData(response);
      setBannerUrl(response.training_banner_media?.media_pre_url || "");
      setImgData(null);
    }
  }, [response]);

  useEffect(() => {
    const hasChanged =
      isDataModified(trainingData, updatedTraingData) || imgData !== null;
    const isCreateable = checkIfAllFieldsPresent();
    setIsEdited(hasChanged);
    setIsAllFiledPresent(isCreateable);
  }, [trainingData, updatedTraingData, id, imgData, bannerUrl]);

  const getDate = (date: string) => {
    const info = `${date.split(" ")[0]}T00:00:00.000Z`;
    return info;
  };

  const checkIfAllFieldsPresent = () => {
    if (
      updatedTraingData.training_name === "" ||
      updatedTraingData.training_description === "" ||
      updatedTraingData.start_date === "" ||
      updatedTraingData.end_date === ""
    ) {
      return false;
    } else return true;
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append(
      "certification_downloadable",
      String(updatedTraingData.certification_downloadable ?? false)
    );
    formData.append(
      "training_description",
      updatedTraingData.training_description || ""
    );
    formData.append("training_name", updatedTraingData.training_name || "");
    formData.append(
      "within_store_geofence",
      String(updatedTraingData.within_store_geofence ?? false)
    );
    formData.append("start_date", updatedTraingData.start_date);
    formData.append("end_date", updatedTraingData.end_date);

    if (imgData) {
      formData.append("training_banner", imgData);
    }
    const categories = updatedTraingData.training_categories ?? [];
    categories.forEach((category) => {
      formData.append("training_categories", category.id);
    });

    return formData;
  };

  const handleCreateTraining = async () => {
    const formData = createFormData();
    try {
      const response = await postData<
        FormData,
        { message: string; data: { id: string } }
      >(LMS_ENDPOINTS.TRAINING.TRAINING.CREATE_TRAINING, formData, {
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      });
      showSuccessToast({
        message: "Successful",
        description: "Training created successfully!",
      });
      router.push(`/lms/training/manage-training/${response.data.id}/sessions`);
    } catch (error) {
      console.error("Error creating training:", error);
    }
  };

  const handleMediaDelete = async (mediaId: string) => {
    try {
      await deleteData(LMS_ENDPOINTS.MEDIA.DELETE_MEDIA(mediaId));
    } catch (error) {
      console.log("failed to delete media");
    }
  };

  const handleUpdateTraining = async () => {
    const formData = createFormData();
    try {
      if (deleteMediaId) await handleMediaDelete(deleteMediaId);
      await putData<FormData>(
        LMS_ENDPOINTS.TRAINING.TRAINING.UPDATE_TRAINING(id),
        formData,
        {
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        }
      );
      setRefetchCount(refetchCount + 1);
      showSuccessToast({
        message: "Successfull",
        description: "Training updated successfully!",
      });
    } catch (error) {
      console.error("Error updating training:", error);
    }
  };

  if (isLoading) return <TrainingDetailsShrimmer />;

  return (
    <div className={styles["training__details-main-con"]}>
      <Input
        value={updatedTraingData?.training_name || ""}
        onChange={(name) =>
          setUpdatedTrainingData({ ...updatedTraingData, training_name: name })
        }
        placeholder="Enter training name"
        label="Training name"
        showLabelText
        autoWidth
      />
      <div className="nu-flex nu-ai-center nu-jc-sb nu-gap-2">
        <div className="nu-flex nu-gap-4 nu-ai-center">
          <Image
            alt="default-pic"
            src={bannerUrl ? bannerUrl : "/images/default-pic.svg"}
            width={52}
            height={52}
            priority
            className={styles["training__img"]}
          />
          <div className="nu-flex nu-column nu-gap-2">
            <p className={styles["media__picker-header"]}>Display Picture</p>
            <p className={styles["media__picker-desc"]}>
              We support PNGs and JPEGs under 10MB
            </p>
          </div>
        </div>
        <div className="nu-flex nu-ai-center nu-gap-3">
          <MediaPicker
            allowedFileFormats={[".jpg", ".png", ".jpeg"]}
            renderComponent={
              <Button
                title="Upload image"
                prefixIcon={<UploadSimple size={IconSize.M} />}
                buttonType={ButtonType.tertiary}
                onClick={noop}
              />
            }
            onSubmit={(file) => {
              const imgPreviews = generateFilePreviews(file);
              const [firstData] = imgPreviews;
              if (firstData) {
                setImgData(file[0]);
                setUpdatedTrainingData({
                  ...updatedTraingData,
                  training_banner_media: null,
                });
                setBannerUrl(firstData.url);
              }
            }}
          />
          {bannerUrl !== "" && (
            <Button
              title="Remove"
              onClick={() => {
                setImgData(null);
                setUpdatedTrainingData({
                  ...updatedTraingData,
                  training_banner_media: null,
                });
                setBannerUrl("");
                if (updatedTraingData.training_banner_media?.media_id) {
                  setDeleteMediaId(
                    updatedTraingData.training_banner_media.media_id
                  );
                }
              }}
              prefixIcon={<Trash size={IconSize.M} />}
              buttonType={ButtonType.secondary}
            />
          )}
        </div>
      </div>

      <Textarea
        value={updatedTraingData?.training_description || ""}
        onChange={(desc) =>
          setUpdatedTrainingData({
            ...updatedTraingData,
            training_description: desc,
          })
        }
        label="Description"
        placeholder="Enter training description"
      />
      <div>
        <p className={styles["header__text"]}>Add categories</p>
        <Dropdown
          placeHolderLabel="Categories"
          placeholder="Select categeories from the dropdown"
          isMultiSelect
          uiType={DropdownSelectUIType.advanced}
          options={(categoriesData?.results ?? []).map((category) => ({
            label: category.category_name,
            value: category.id,
          }))}
          onChange={(val) =>
            setUpdatedTrainingData({
              ...updatedTraingData,
              training_categories: val.map((option) => ({
                category_name: option.label,
                id: option.value,
              })),
            })
          }
          disabled={categeoriesLoading}
          selectedOption={(updatedTraingData.training_categories ?? [])?.map(
            (option) => ({ label: option.category_name, value: option.id })
          )}
          padding={12}
        />
      </div>

      <div className=" nu-flex nu-ai-center nu-gap-2 nu-jc-sb">
        <div className="nu-flex nu-column nu-gap-1">
          <p className={styles["header__text"]}>Within location geofence</p>
          <p className={styles["desc__text"]}>
            While attending this training, user needs to be inside geo- fence of
            the store location
          </p>
        </div>
        <Infotile
          title="Required"
          rightComponent={
            <Toggle
              checked={updatedTraingData.within_store_geofence}
              onChange={() => {
                setUpdatedTrainingData({
                  ...updatedTraingData,
                  within_store_geofence:
                    !updatedTraingData.within_store_geofence,
                });
              }}
            />
          }
        />
      </div>
      <div className=" nu-flex nu-ai-center nu-gap-2 nu-jc-sb">
        <div className="nu-flex nu-column nu-gap-1">
          <p className={styles["header__text"]}>Allow certification</p>
          <p className={styles["desc__text"]}>
            Award certification to users who successfully complete training
          </p>
        </div>

        <Infotile
          title="Allow certification download"
          rightComponent={
            <Toggle
              checked={updatedTraingData.certification_downloadable}
              onChange={() => {
                setUpdatedTrainingData({
                  ...updatedTraingData,
                  certification_downloadable:
                    !updatedTraingData.certification_downloadable,
                });
              }}
            />
          }
        />
      </div>
      <div className="nu-flex nu-ai-center nu-jc-sb">
        <p className={styles["header__text"]}>Select training start date</p>
        <DatePicker
          date={
            updatedTraingData.start_date
              ? new Date(getDate(updatedTraingData.start_date))
              : null
          }
          onSelect={(val) => {
            const date = val.toString().split("T")[0];
            setUpdatedTrainingData({
              ...updatedTraingData,
              start_date: `${date} 00:00:00`,
              end_date: `${date} 00:00:00`,
            });
          }}
          minDate={addDaysToDate(new Date(), 0)}
        />
      </div>
      <div className="nu-flex nu-ai-center nu-jc-sb">
        <p className={styles["header__text"]}>Select training end date</p>
        <DatePicker
          date={
            updatedTraingData.end_date
              ? new Date(
                  `${updatedTraingData.end_date.split(" ")[0]}T00:00:00.000Z`
                )
              : updatedTraingData.start_date
              ? addDaysToDate(new Date(updatedTraingData.start_date), 0)
              : null
          }
          onSelect={(val) => {
            const date = val.toString().split("T")[0];
            setUpdatedTrainingData({
              ...updatedTraingData,
              end_date: `${date} 00:00:00`,
            });
          }}
          minDate={
            updatedTraingData.start_date
              ? addDaysToDate(
                  new Date(getDate(updatedTraingData.start_date)),
                  0
                )
              : addDaysToDate(new Date(), 0)
          }
        />
      </div>
      <div className="nu-flex nu-jc-end nu-gap-2">
        {id !== "create" && isEdited && (
          <div style={{ width: "100px" }}>
            <Button
              title="Cancel"
              parentWidth
              onClick={() => {
                setUpdatedTrainingData(trainingData);
                setBannerUrl(
                  trainingData.training_banner_media?.media_pre_url || ""
                );
                setImgData(null);
              }}
            />
          </div>
        )}
        <div style={{ width: "200px" }}>
          <Button
            isDisabled={!isEdited || !isAllFieldsPresent}
            title={id === "create" ? "Create training" : "Update training"}
            onClick={
              id === "create" ? handleCreateTraining : handleUpdateTraining
            }
            buttonType={ButtonType.primary}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingDetails;
