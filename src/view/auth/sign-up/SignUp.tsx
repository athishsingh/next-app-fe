"use client";
import React, { useEffect, useState } from "react";
import styles from "./sign-up.module.scss";
import Button from "@/src/components/button/Button";
import Input from "@/src/components/input/Input";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { useRouter } from "nextjs-toploader/app";
import { ButtonType } from "@/src/components/button/types";
import { validateEmail } from "@/src/utils/validators.utils";
import useTranslationHook from "@/src/hooks/useTranslationHook";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const { translate } = useTranslationHook();

  useEffect(() => {
    setIsValid(validateEmail(email.trim()));
  }, [email]);

  const handleLoginClick = () => {
    router.push("/sign-in");
  };

  const handleSignupClick = () => {
    if (!isValid) return;
    router.push("/onboarding-page-1");
  };

  return (
    <div className={styles["signup__main-container"]}>
      <div className={styles["left__component-con"]}>
        <div className={styles["left__main-con"]}>
          <h1 className={styles["sign__up-text"]}>
            {translate("signUpLabels", "headerText")}
          </h1>
          <Input
            onEnterPressed={handleSignupClick}
            autoWidth
            label={translate("signUpLabels", "emailInput", "label")}
            placeholder={translate("signUpLabels", "emailInput", "placeholder")}
            value={email}
            onChange={(e) => {
              setEmail(e);
            }}
            prefixIcon={<EnvelopeSimple size={IconSize.M} />}
          />
          <Button
            isDisabled={!isValid}
            title={translate("continue")}
            buttonType={ButtonType.tertiary}
            onClick={handleSignupClick}
          />
          <p className={styles["already__have-account-text"]}>
            {translate("signUpLabels", "alreadyHaveAccount")}{" "}
            <button
              onClick={handleLoginClick}
              className={styles["login__text"]}
            >
              {" "}
              {translate("signUpLabels", "loginText")}
            </button>
          </p>
        </div>
        <p className={styles["info__text"]}>
          {translate("signUpLabels", "infoText")}
          <button onClick={() => {}} className={styles["privacy__text"]}>
            {translate("signUpLabels", "privacyPolicyText")}
          </button>
        </p>
      </div>
      <div className={styles["right__component-con"]}>
        <h1 className={styles["header__text"]}>
          {translate("signUpLabels", "welcomeHeaderText")}
        </h1>
        <div className={styles["description__text"]}>
          <p>{translate("signUpLabels", "descriptionText")}</p>
          <p>{translate("signUpLabels", "subheaderText")}</p>
          <p>{translate("signUpLabels", "finalText")}</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
