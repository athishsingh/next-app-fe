import React, { useEffect, useState } from "react";
import styles from "./training-question-drawer.module.scss";
import Drawer from "@/src/components/drawer/Drawer";
import Input from "@/src/components/input/Input";
import Dropdown from "@/src/components/dropdown/Dropdown";
import IconButton from "@/src/components/icon-button/IconButton";
import { deepClone, generateFilePreviews } from "@/src/utils/general.utils";
import { Plus } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import MediaPicker from "@/src/components/media-picker/MediaPicker";
import FileMaterialCard from "@/src/components/file-material-card/FileMaterialCard";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import {
  AssessmentQuestionType,
  QuestionType,
  TrainingSessionAssessmentType,
} from "@/src/types/lms/training-types";
import { deleteData, postData, putData } from "@/src/services/data.service";
import { LMS_ENDPOINTS } from "@/src/services/endpoints/lms-endpoints";
import { useLmsTrainingStore } from "@/src/store/main/lms/training/useLmsTrainingStore";
import TrainingQuestionOptionComponent from "../training-question-option-component/TrainingQuestionOptionComponent";
import useToast from "@/src/hooks/useToast";

const TrainingQuestionDrawer = ({
  visible,
  setVisible,
  questionDetails,
  assessmentId,
}: {
  visible: boolean;
  setVisible: () => void;
  questionDetails: TrainingSessionAssessmentType;
  assessmentId: string;
}) => {
  const { showSuccessToast } = useToast();
  const [questionInfo, _] = useState<TrainingSessionAssessmentType>(
    deepClone(questionDetails)
  );
  const [updatedQuestionInfo, setUpdatedQuestionInfo] =
    useState<TrainingSessionAssessmentType>(questionDetails);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newFilesPreview, setNewFilesPreview] = useState<
    {
      type: string;
      url: string;
      fileName: string;
      fileSize: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setShouldRefetchAssessments } = useLmsTrainingStore();
  const [shouldDeleteMediaId, setShouldDeleteMediaId] = useState<string>("");
  const [addedOptions, setAddedOptions] = useState<
    {
      option_value: string;
      is_answer: boolean;
    }[]
  >([]);
  const [updatedOptions, setUpdatedOptions] = useState<
    AssessmentQuestionType[]
  >([]);
  const [deleteOptions, setDeleteOptions] = useState<string[]>([]);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleNewFileDelete = (index: number) => {
    setNewFilesPreview((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setNewFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const checkIfFieldsEdited = () => {
    if (
      questionInfo?.question_type !== updatedQuestionInfo?.question_type ||
      questionInfo?.question !== updatedQuestionInfo?.question ||
      questionInfo?.max_score !== updatedQuestionInfo?.max_score ||
      newFiles.length > 0
    ) {
      return true;
    } else return false;
  };
  const checkIfValid = () => {
    if (
      updatedQuestionInfo?.question === "" ||
      updatedQuestionInfo?.question === undefined ||
      updatedQuestionInfo?.question_type === null ||
      updatedQuestionInfo?.question_type === undefined
    ) {
      return false;
    }

    if (
      updatedQuestionInfo?.question_type === "multiple_choice" ||
      updatedQuestionInfo?.question_type === "single_choice"
    ) {
      const allOptions = [
        ...(updatedQuestionInfo.options || []),
        ...addedOptions,
      ];

      return checkBasedOnQuestionType(allOptions);
    } else return true;
  };

  const checkBasedOnQuestionType = (
    options: { option_value: string; is_answer: boolean }[]
  ) => {
    if (updatedQuestionInfo.question_type === "multiple_choice") {
      const allHaveValue = options.every(
        (option) => option.option_value !== ""
      );
      const atLeastOneTrue = options.some(
        (option) => option.is_answer === true
      );
      return allHaveValue && atLeastOneTrue;
    } else if (updatedQuestionInfo.question_type === "single_choice") {
      const allHaveValue = options.every(
        (option) => option.option_value !== ""
      );
      const exactlyOneTrue =
        options.filter((option) => option.is_answer === true).length === 1;
      return allHaveValue && exactlyOneTrue;
    }

    return false;
  };

  useEffect(() => {
    const finalUpdatedOptions = updatedOptions
      .filter((option) => {
        const originalOption = questionInfo.options.find(
          (o) => o.id === option.id
        );
        return (
          originalOption &&
          (option.is_answer !== originalOption.is_answer ||
            option.option_value !== originalOption.option_value)
        );
      })
      .filter((option) => !deleteOptions.includes(option.id));

    const isDataEdited =
      checkIfFieldsEdited() ||
      deleteOptions.length > 0 ||
      shouldDeleteMediaId !== "" ||
      addedOptions.length > 0 ||
      newFiles.length > 0 ||
      finalUpdatedOptions.length > 0;

    setIsEdited(isDataEdited);

    const isValidData = checkIfValid();
    setIsValid(isValidData);
  }, [
    updatedQuestionInfo,
    deleteOptions,
    addedOptions,
    shouldDeleteMediaId,
    updatedOptions,
    newFiles,
  ]);

  const questionTypeMap = {
    multiple_choice: "Mutiple choice",
    single_choice: "Single choice",
    long_answer: "Long answer",
    media_upload: "File upload",
  };

  const createData = () => {
    const formData = new FormData();
    formData.append("assessment", assessmentId);
    formData.append("question", updatedQuestionInfo.question);
    formData.append("question_type", updatedQuestionInfo.question_type);
    formData.append("max_score", String(updatedQuestionInfo.max_score ?? 0));
    if (newFiles.length > 0) {
      newFiles.forEach((file) => {
        formData.append("training_media", file);
      });
    }

    return formData;
  };

  const handleCreateQuestion = async () => {
    try {
      setIsLoading(true);
      const data = createData();
      const response = await postData<FormData, { question_id: string }>(
        LMS_ENDPOINTS.TRAINING.ASSESSMENTS.CREATE_TRAINING_ASSESSMENT_QUESTION,
        data,
        {
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        }
      );
      if (addedOptions.length) {
        await mapQuestionOptionToQuestion(response.question_id);
      }
      showSuccessToast({
        message: "Successful",
        description: "Assessment question created successfully!!",
      });
      setShouldRefetchAssessments();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const mapQuestionOptionToQuestion = async (questionId: string) => {
    if (questionId === "") return;
    try {
      await Promise.all(
        addedOptions.map((option) => {
          const data = {
            assessment_question: questionId,
            ...option,
          };
          postData(
            LMS_ENDPOINTS.TRAINING.ASSESSMENTS.CREATE_QUESTION_OPTION,
            data
          );
        })
      );
    } catch (error) {}
  };

  const handleUpdateQuestion = async () => {
    try {
      if (checkIfFieldsEdited()) {
        const data = createData();
        await putData(
          LMS_ENDPOINTS.TRAINING.ASSESSMENTS.UPDATE_TRAINING_ASSESSMENT_QUESTION(
            updatedQuestionInfo.id
          ),
          data,
          {
            config: {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          }
        );
      }
      await handleMediaDeletionsAndUpdate();
      const promises = [];
      if (addedOptions.length) {
        promises.push(mapQuestionOptionToQuestion(updatedQuestionInfo.id));
      }

      if (updatedOptions.length) {
        const finalUpdatedOptions = updatedOptions
          .filter((option) => {
            const originalOption = questionInfo.options.find(
              (o) => o.id === option.id
            );
            return (
              originalOption &&
              (option.is_answer !== originalOption.is_answer ||
                option.option_value !== originalOption.option_value)
            );
          })
          .filter((option) => !deleteOptions.includes(option.id));

        promises.push(
          Promise.all(
            finalUpdatedOptions.map((option) =>
              handleUpdateQuestionOption(option)
            )
          )
        );
      }
      if (
        (updatedQuestionInfo.question_type === "multiple_choice" ||
          updatedQuestionInfo.question_type === "single_choice") &&
        deleteOptions.length > 0
      ) {
        promises.push(
          Promise.all(
            deleteOptions.map((option) => handleDeleteQuestionOption(option))
          )
        );
      }
      if (
        (updatedQuestionInfo.question_type === "long_answer" ||
          updatedQuestionInfo.question_type === "media_upload") &&
        updatedQuestionInfo.options.length > 0
      ) {
        promises.push(
          Promise.all(
            updatedQuestionInfo.options.map((option) =>
              handleDeleteQuestionOption(option.id)
            )
          )
        );
      }
      if (promises.length) {
        await Promise.all(promises);
      }
      showSuccessToast({
        message: "Successful",
        description: "Assessment question updated successfully!!",
      });

      setShouldRefetchAssessments();
    } catch (error) {}
  };

  const handleDeleteQuestionOption = async (optionId: string) => {
    try {
      await deleteData(
        LMS_ENDPOINTS.TRAINING.ASSESSMENTS.DELETE_QUESTION_OPTION(optionId)
      );
    } catch (error) {}
  };

  const handleUpdateQuestionOption = async (option: AssessmentQuestionType) => {
    try {
      const data = {
        option_value: option.option_value || "",
        is_answer: option.is_answer || false,
      };
      await putData(
        LMS_ENDPOINTS.TRAINING.ASSESSMENTS.UPDATE_QUESTION_OPTION(option.id),
        data
      );
    } catch (error) {}
  };

  const handleMediaDeletionsAndUpdate = async () => {
    if (shouldDeleteMediaId) {
      try {
        await deleteData(LMS_ENDPOINTS.MEDIA.DELETE_MEDIA(shouldDeleteMediaId));
      } catch (error) {}
    } else return;
  };

  return (
    <Drawer
      headerText="Step rules & settings"
      visible={visible}
      setVisible={setVisible}
      footerComponent={
        <>
          <Button
            isDisabled={!isEdited || !isValid}
            isLoading={isLoading}
            title={updatedQuestionInfo?.id ? "Update question" : "Add question"}
            onClick={
              updatedQuestionInfo?.id
                ? handleUpdateQuestion
                : handleCreateQuestion
            }
            buttonType={ButtonType.primary}
          />
        </>
      }
    >
      <div className="nu-px-15 nu-py-7 nu-border-bottom nu-flex nu-column">
        <Input
          value={updatedQuestionInfo?.question || ""}
          onChange={(val) =>
            setUpdatedQuestionInfo({ ...updatedQuestionInfo, question: val })
          }
          placeholder="Enter question"
          autoWidth
          label="Question"
          showLabelText
        />
      </div>
      <div className="nu-px-15 nu-py-7 nu-gap-3 nu-border-bottom nu-flex nu-column">
        <p className={styles["header__text"]}>Question type</p>
        <Dropdown
          placeholder="Select question type"
          selectedOption={
            updatedQuestionInfo?.question_type
              ? [
                  {
                    label: questionTypeMap[updatedQuestionInfo.question_type],
                    value: updatedQuestionInfo.question_type,
                  },
                ]
              : []
          }
          placeHolderLabel="Question type"
          onChange={([val]) => {
            setUpdatedQuestionInfo({
              ...updatedQuestionInfo,
              question_type: val.value as QuestionType,
            });
          }}
          options={[
            { label: "Mutiple choice", value: "multiple_choice" },
            { label: "Single choice", value: "single_choice" },
            { label: "Long answer", value: "long_answer" },
            { label: "File upload", value: "media_upload" },
          ]}
        />
      </div>
      {updatedQuestionInfo?.question_type !== null &&
        updatedQuestionInfo?.question_type !== undefined &&
        updatedQuestionInfo?.question_type !== "long_answer" &&
        updatedQuestionInfo?.question_type !== "media_upload" && (
          <div className="nu-px-15 nu-py-7 nu-gap-3 nu-border-bottom nu-flex nu-column">
            <div className="nu-flex nu-ai-center nu-jc-sb">
              <p className={styles["header__text"]}>Options</p>
              <IconButton
                icon={<Plus size={IconSize.L} />}
                onClick={() =>
                  setAddedOptions([
                    ...addedOptions,
                    { option_value: "", is_answer: false },
                  ])
                }
              />
            </div>
            {(updatedQuestionInfo?.options ?? []).map((option, index) => {
              return (
                <TrainingQuestionOptionComponent
                  onDeleteClick={() => {
                    setDeleteOptions([...deleteOptions, option.id]);
                    let tempArr = [...updatedQuestionInfo.options];
                    const finalArr = tempArr.filter((_, i) => i !== index);
                    setUpdatedQuestionInfo({
                      ...updatedQuestionInfo,
                      options: finalArr,
                    });
                  }}
                  key={index}
                  value={option.option_value}
                  onInputChange={(val) => {
                    const tempArr = [...updatedQuestionInfo.options];
                    tempArr[index].option_value = val;
                    setUpdatedOptions(tempArr);
                    const updatedOptionTempArr = [
                      ...updatedQuestionInfo.options,
                    ];
                    updatedOptionTempArr[index].option_value = val;
                    setUpdatedQuestionInfo({
                      ...updatedQuestionInfo,
                      options: updatedOptionTempArr,
                    });
                  }}
                  isSelected={option.is_answer}
                  onSwitchChange={(value) => {
                    const tempArr = [...updatedQuestionInfo.options];
                    tempArr[index].is_answer = value === "fail" ? false : true;
                    setUpdatedOptions(tempArr);
                    const updatedOptionTempArr = [
                      ...updatedQuestionInfo.options,
                    ];
                    updatedOptionTempArr[index].is_answer =
                      value === "fail" ? false : true;
                    setUpdatedQuestionInfo({
                      ...updatedQuestionInfo,
                      options: updatedOptionTempArr,
                    });
                  }}
                />
              );
            })}
            {addedOptions.map((option, index) => {
              return (
                <TrainingQuestionOptionComponent
                  onDeleteClick={() => {
                    setAddedOptions(
                      addedOptions.filter((item, i) => i !== index)
                    );
                  }}
                  key={index}
                  value={option.option_value}
                  onInputChange={(val) => {
                    const tempArr = [...addedOptions];
                    tempArr[index].option_value = val;
                    setAddedOptions(tempArr);
                  }}
                  isSelected={option.is_answer}
                  onSwitchChange={(value) => {
                    const tempArr = [...addedOptions];
                    tempArr[index].is_answer = value === "fail" ? false : true;
                    setAddedOptions(tempArr);
                  }}
                />
              );
            })}
          </div>
        )}

      <div className="nu-px-15 nu-py-7 nu-border-bottom nu-flex nu-column  nu-gap-3">
        <p className={styles["header__text"]}>Scoring</p>
        <div className="nu-flex nu-gap-3 nu-ai-center">
          <div className="nu-flex  nu-gap-3 nu-column nu-flex-one">
            <p className={styles["description__text"]}>Correct answer</p>
            <Input
              classnames="nu-w-full"
              value={(updatedQuestionInfo?.max_score ?? 0).toString()}
              onChange={(val) => {
                setUpdatedQuestionInfo({
                  ...updatedQuestionInfo,
                  max_score: Number(val),
                });
              }}
              placeholder="Enter correct answer score"
              autoWidth
            />
          </div>
        </div>
      </div>
      <div className="nu-px-15 nu-py-7 nu-border-bottom nu-flex nu-column  nu-gap-3">
        <div className="nu-flex nu-column nu-gap-3">
          <div className="nu-flex nu-ai-center nu-jc-sb nu-gap-3">
            <p className={styles["description__text"]}>Upload files</p>
            {(updatedQuestionInfo?.media_info === null ||
              updatedQuestionInfo?.media_info === undefined) &&
              newFiles.length === 0 && (
                <MediaPicker
                  allowedFileFormats={[".jpeg", ".jpg", ".png", ".pdf"]}
                  isFromModal
                  maxFilesCount={1}
                  renderComponent={
                    <div className="nu-flex nu-ai-center nu-gap-1">
                      <Plus size={IconSize.S} />
                      <p
                        className={styles["assessment__question-add-material"]}
                      >
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
          <p className={styles["file__formats-allowed-text"]}>
            Only JPG, JPEG, PNG, GIF and PDF formats with maximum of 1 file
            allowed
          </p>
        </div>
        {updatedQuestionInfo?.media_info && (
          <FileMaterialCard
            mediaLength={updatedQuestionInfo.media_info.media_length}
            mediaName={updatedQuestionInfo.media_info.media_name}
            mediaType={updatedQuestionInfo.media_info.media_type}
            onDeleteClick={() => {
              setUpdatedQuestionInfo({
                ...updatedQuestionInfo,
                media_info: null,
              });
              setShouldDeleteMediaId(
                updatedQuestionInfo.media_info?.media_id || ""
              );
            }}
          />
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
      </div>
    </Drawer>
  );
};

export default TrainingQuestionDrawer;
