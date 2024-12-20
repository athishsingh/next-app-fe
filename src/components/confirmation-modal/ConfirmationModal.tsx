import React from "react";
import Modal from "../dialog/Dialog";
import Button from "../button/Button";
import { ButtonType } from "../button/types";
import styles from "./confirmation-modal.module.scss";

const ConfirmationModal = ({
  visible,
  isConfirmButtonLoading = false,
  header = "Are you sure?",
  confirmButtonText = "Yes",
  description,
  setVisible,
  onCancelClick,
  onConfirmClick,
  isConfirmModal = false,
}: {
  visible: boolean;
  isConfirmButtonLoading?: boolean;
  header?: string;
  description: string;
  confirmButtonText?: string;
  setVisible: () => void;
  onCancelClick: () => void;
  onConfirmClick: () => void;
  isConfirmModal?: boolean;
}) => {
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      width="450px"
      blockClosing
      isConfirmModal={isConfirmModal}
    >
      <div className={styles["confirmation__modal-main-con"]}>
        <h1 className={styles["confirmation__modal-header"]}>{header}</h1>
        <p className={styles["confirmation__modal-desc"]}>{description}</p>
        <div className="nu-flex nu-gap-3">
          <Button title="Cancel" onClick={onCancelClick} />
          <Button
            title={confirmButtonText}
            isLoading={isConfirmButtonLoading}
            buttonType={ButtonType.primary}
            onClick={onConfirmClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
