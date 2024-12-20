import React, { useState } from "react";
import Modal from "../dialog/Dialog";
import styles from "./media-picker.module.scss";
import IconButton from "../icon-button/IconButton";
import { FilePdf, FileZip, Play, X } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Image from "next/image";
import Button from "../button/Button";
import { ButtonType } from "../button/types";
import { generateFilePreviews } from "@/src/utils/general.utils";

const MediaPicker = ({
  renderComponent,
  maxFilesCount = 1,
  allowedFileFormats = [
    ".jpg",
    ".png",
    ".svg",
    ".mp4",
    ".zip",
    ".jpeg",
    ".pdf",
    ".ppt",
    ".pptx",
  ],
  onSubmit,
  isFromModal = false,
}: {
  renderComponent: React.ReactNode;
  maxFilesCount?: number;
  allowedFileFormats?: (
    | ".jpg"
    | ".png"
    | ".svg"
    | ".zip"
    | ".mp4"
    | ".jpeg"
    | ".pdf"
    | ".ppt"
    | ".pptx"
  )[];
  onSubmit: (files: File[]) => void;
  isFromModal?: boolean;
}) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<
    { type: string; url: string; fileName: string; fileSize: string }[]
  >([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleOpen = () => {
    setShowPicker(!showPicker);
    setSelectedFiles([]);
    setFilePreviews([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + selectedFiles.length > maxFilesCount) {
        alert(`You can upload a maximum of ${maxFilesCount} files.`);
        return;
      }
      const newFiles = selectedFiles.concat(files).slice(0, maxFilesCount);
      setSelectedFiles(newFiles);
      generatePreviews(newFiles);
      e.target.value = "";
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (filePreviews.length === maxFilesCount) return;
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      if (files.length + selectedFiles.length > maxFilesCount) {
        alert(`You can upload a maximum of ${maxFilesCount} files.`);
        return;
      }
      const newFiles = selectedFiles.concat(files).slice(0, maxFilesCount);
      setSelectedFiles(newFiles);
      generatePreviews(newFiles);
    }
  };

  const generatePreviews = (files: File[]) => {
    const previews = generateFilePreviews(files);
    setFilePreviews(previews);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...filePreviews];
    URL.revokeObjectURL(updatedPreviews[index].url);
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setFilePreviews(updatedPreviews);
  };

  const handleFormSubmit = () => {
    onSubmit(selectedFiles);
    handleOpen();
    // const formData = new FormData();
    // selectedFiles.forEach((file, index) => {
    //   formData.append(`file${index + 1}`, file, file.name);
    // });
    // try {
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     console.log("Files uploaded successfully!");
    //   } else {
    //     console.error("File upload failed.");
    //   }
    // } catch (error) {
    //   console.error("Error uploading files:", error);
    // }
  };

  return (
    <div className={styles["media__picker-main-con"]}>
      <div
        tabIndex={0}
        className="nu-c-pointer nu-w-content"
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOpen();
          }
        }}
      >
        {renderComponent}
      </div>

      <Modal
        width="550px"
        visible={showPicker}
        isConfirmModal={isFromModal}
        setVisible={handleOpen}
      >
        <div className={styles["picker__dialog"]}>
          <div className="nu-flex nu-jc-sb nu-ai-center nu-gap-1">
            <div className="nu-flex nu-column">
              <p className={styles["header__text"]}>Media Upload</p>
              <p className={styles["description__text"]}>
                {`Add your documents here, and you can upload up to ${maxFilesCount} file${
                  maxFilesCount > 1 ? "s" : ""
                } max`}
              </p>
            </div>
            <IconButton icon={<X size={IconSize.L} />} onClick={handleOpen} />
          </div>

          <div
            className={`${styles["upload__container"]} ${
              isDragging ? styles["dragging"] : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Image
              draggable={false}
              src={"/icons/upload.svg"}
              width={42}
              height={42}
              alt="upload"
              className="nu-mb-6"
            />
            <p className={styles["upload__description-text"]}>
              {isDragging
                ? "Release to upload"
                : "Drag your file(s) to start uploading"}
            </p>
            <div className="nu-flex nu-gap-3 nu-mb-4 nu-ai-center">
              <div className={styles["divider"]} />
              <p className={styles["or__text"]}>Or</p>
              <div className={styles["divider"]} />
            </div>

            <div>
              <Button
                title="Browse files"
                isDisabled={filePreviews.length === maxFilesCount}
                onClick={handleUploadClick}
                buttonType={ButtonType.tertiary}
              />
              <input
                type="file"
                id="fileInput"
                accept={allowedFileFormats.join(", ")}
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <p className={styles["supporting__format-text"]}>
            {`Supports ${
              allowedFileFormats.slice(0, -1).join(", ") +
              (allowedFileFormats.length > 1 ? " and " : "") +
              allowedFileFormats[allowedFileFormats.length - 1] +
              " " +
              (allowedFileFormats.length > 1 ? "files" : "file")
            }`}
          </p>

          <div className={styles["selected__files"]}>
            {filePreviews.length > 0 && (
              <div className={styles["file__preview-grid"]}>
                {filePreviews.map((file, index) => (
                  <div className={styles["file__preview-con"]} key={index}>
                    {file.type === "image" ? (
                      <Image
                        draggable={false}
                        src={file.url}
                        alt={`preview__${index}`}
                        width={80}
                        height={80}
                        className={styles["file__preview"]}
                      />
                    ) : file.type === "zip" ? (
                      <div className={styles["zip__file-preview"]}>
                        <FileZip size={32} />
                      </div>
                    ) : file.type === "pdf" ? (
                      <div className={styles["zip__file-preview"]}>
                        <FilePdf size={32} />
                      </div>
                    ) : (
                      <div className={styles["video__preview"]}>
                        <video width={80} height={80}>
                          <source src={file.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className={styles["play__icon"]}>
                          <Play size={14} />
                        </div>
                      </div>
                    )}
                    <div className={styles["close__icon"]}>
                      <IconButton
                        icon={<X size={10} />}
                        onClick={() => handleRemoveFile(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="nu-flex nu-ai-center nu-jc-end nu-gap-4">
            <div className={styles["button__parent-con"]}>
              <Button
                title="Cancel"
                onClick={handleOpen}
                buttonType={ButtonType.secondary}
              />
            </div>
            <div className={styles["button__parent-con"]}>
              <Button
                title="Next"
                isDisabled={selectedFiles.length === 0}
                onClick={handleFormSubmit}
                buttonType={ButtonType.primary}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MediaPicker;
