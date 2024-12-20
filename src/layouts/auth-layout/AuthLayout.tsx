"use client";
import Image from "next/image";
import React from "react";
import styles from "./auth-layout.module.scss";
import { cn } from "@/src/utils/class.utils";
import Modal from "@/src/components/dialog/Dialog";
import { useAuthStore } from "@/src/store/auth/useAuthStore";
import PrivacyPolicyModal from "@/src/view/auth/privacy-policy-modal/PrivacyPolicyModal";
import SupportModal from "@/src/view/auth/support-modal/SupportModal";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    showPrivacyModal,
    showSupportModal,
    setShowPrivacyModal,
    setShowSupportModal,
  } = useAuthStore();
  return (
    <>
      <div className={styles["auth__main-layout-con"]}>
        <Image
          src={"/images/logo.png"}
          alt="logo"
          width={204}
          height={75}
          priority={true}
        />
        <div className={styles["auth__children-con"]}>{children}</div>
        <footer>
          <div className="nu-flex nu-ai-center nu-gap-5">
            <p className={styles["footer__text"]}>© 2024 Nymbleup Limited</p>
            <button
              className={cn(styles["footer__text"], styles["underline"])}
              onClick={() => setShowPrivacyModal(true)}
            >
              Privacy Policy
            </button>
            <button
              className={cn(styles["footer__text"], styles["underline"])}
              onClick={() => setShowSupportModal(true)}
            >
              Support
            </button>
          </div>
        </footer>
      </div>
      <Modal
        visible={showPrivacyModal}
        setVisible={() => {
          setShowPrivacyModal(false);
        }}
      >
        <PrivacyPolicyModal onCloseClick={() => setShowPrivacyModal(false)} />
      </Modal>
      <Modal
        visible={showSupportModal}
        setVisible={() => {
          setShowSupportModal(false);
        }}
      >
        <SupportModal onCloseClick={() => setShowSupportModal(false)} />
      </Modal>
    </>
  );
};

export default AuthLayout;
