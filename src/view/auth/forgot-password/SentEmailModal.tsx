"use client";
import Image from "next/image";
import React from "react";
import styles from "./sent-email-modal.module.scss";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { ArrowLeft } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";

const SentEmailModal = () => {
  const router = useRouter();
  const handleResendEmailClick = () => router.replace("/forgot-password");
  return (
    <div className={styles["sent__email-main-con"]}>
      <Image src={"/icons/email.svg"} alt="email" width={56} height={56} />
      <h1 className={styles["header__text"]}>Check your mail!</h1>
      <p className={styles["desc__text"]}>
        An email was sent to you with the instructions to reset your password
      </p>
      <Link
        href={"https://mail.google.com/mail"}
        target="_blank"
        className="nu-w-full"
      >
        <Button
          className="nu-my-7"
          title="Open your inbox"
          onClick={() => {}}
          buttonType={ButtonType.primary}
        />
      </Link>
      <div
        tabIndex={0}
        className="nu-f-center nu-gap-3 nu-c-pointer"
        role="button"
        onClick={handleResendEmailClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleResendEmailClick();
          }
        }}
      >
        <ArrowLeft color="#8E8EA9" size={IconSize.L} />
        <p>Resend email</p>
      </div>
    </div>
  );
};

export default SentEmailModal;
