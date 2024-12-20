"use client";
import React, { useEffect, useState } from "react";
import styles from "./forgot-password.module.scss";
import Image from "next/image";
import Input from "@/src/components/input/Input";
import { ArrowLeft, EnvelopeSimple } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { validateEmail } from "@/src/utils/validators.utils";
import { useRouter } from "nextjs-toploader/app";
import Modal from "@/src/components/dialog/Dialog";
import SentEmailModal from "./SentEmailModal";

const ForgotPassword = ({ sent }: { sent?: string }) => {
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const router = useRouter();
  const [showSentModal, setShowSentModal] = useState<string>(sent || "false");

  useEffect(() => {
    setIsEmailValid(validateEmail(email.trim()));
  }, [email]);

  useEffect(() => {
    setShowSentModal(sent || "false");
  }, [sent]);

  const handleClick = () => {
    router.replace("/forgot-password?sent=true");
    setEmail("");
  };
  return (
    <>
      <div className={styles["forgot__password-main-con"]}>
        <Image src={"/icons/lock.svg"} alt="lock" width={36} height={36} />
        <h1 className={styles["header__text"]}>Forgot Password?</h1>
        <p className={styles["description__text"]}>
          Enter the email address associated with your account and we&apos;ll
          send you a link to reset your password.
        </p>
        <div className="nu-w-full">
          <Input
            value={email}
            onChange={(e) => setEmail(e)}
            placeholder="Enter your work email address"
            label="Email ID"
            classnames="nu-my-7"
            showLabelText
            onEnterPressed={handleClick}
            autoWidth
            prefixIcon={<EnvelopeSimple size={IconSize.M} />}
          />
        </div>
        <Button
          title="Send mail"
          onClick={handleClick}
          isDisabled={!isEmailValid}
          buttonType={ButtonType.primary}
        />

        <div
          tabIndex={0}
          role="button"
          className="nu-f-center nu-gap-2 nu-c-pointer"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation();
              router.push("/sign-in");
            }
          }}
          onClick={() => {
            router.push("/sign-in");
          }}
        >
          <ArrowLeft size={IconSize.XL} color="#8E8EA9" />
          <p className={styles["back__to-login-text"]}>Back to login</p>
        </div>
      </div>
      <Modal
        visible={showSentModal === "true"}
        setVisible={() => {}}
        width={"440px"}
      >
        <SentEmailModal />
      </Modal>
    </>
  );
};

export default ForgotPassword;
