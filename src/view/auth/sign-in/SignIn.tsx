"use client";
import React, { useEffect, useState } from "react";
import styles from "./sign-in.module.scss";
import Input from "@/src/components/input/Input";
import { EnvelopeSimple, Eye, EyeSlash, Key } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import Link from "next/link";
import { validateEmail } from "@/src/utils/validators.utils";
import { useRouter } from "nextjs-toploader/app";
import useTranslationHook from "@/src/hooks/useTranslationHook";
import { postData } from "@/src/services/data.service";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH__TOKEN_STORAGE_KEY,
} from "@/src/constants/auth";
import { AUTH_ENDPOINTS } from "@/src/services/endpoints/auth-endpoints";

type SignInPayloadType = { email: string; password: string };

type SignInResponseType = { refresh: string; access: string };

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { translate } = useTranslationHook();

  useEffect(() => {
    const checkIfValid = () => {
      if (validateEmail(email.trim()) && password !== "") return true;
      else return false;
    };

    setIsValid(checkIfValid());
  }, [email, password, isValid]);

  const handleOnClick = async () => {
    if (validateEmail(email.trim()) && password !== "") {
      try {
        const data = await postData<SignInPayloadType, SignInResponseType>(
          AUTH_ENDPOINTS.AUTH.LOGIN,
          {
            email,
            password,
          }
        );
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(
            ACCESS_TOKEN_STORAGE_KEY,
            `Bearer ${data.access}`
          );
          localStorage.setItem(
            REFRESH__TOKEN_STORAGE_KEY,
            `Bearer ${data.refresh}`
          );
        }
        router.replace("/lms/training/manage-training");
      } catch (error) {
        console.log(error, "this is error");
      }
    } else {
      return;
    }
  };

  return (
    <div className={styles["signin__main-container"]}>
      <div className={styles["sigin__left-container"]}>
        <div className={styles["left__main-con"]}>
          <h1 className={styles["welcome__text"]}>
            {translate("signInLabels", "headerText")}
          </h1>
          <div className="nu-flex nu-column nu-gap-3">
            <Input
              value={email}
              onChange={(value) => {
                setEmail(value);
              }}
              onEnterPressed={handleOnClick}
              placeholder={translate(
                "signInLabels",
                "emailInput",
                "placeholder"
              )}
              label={translate("signInLabels", "emailInput", "label")}
              showLabelText
              autoWidth
              prefixIcon={<EnvelopeSimple size={IconSize.M} />}
            />
            <Input
              value={password}
              onChange={(value) => {
                setPassword(value);
              }}
              placeholder={translate(
                "signInLabels",
                "passwordInput",
                "placeholder"
              )}
              label={translate("signInLabels", "passwordInput", "label")}
              type={showPassword ? "text" : "password"}
              showLabelText
              autoWidth
              prefixIcon={<Key size={IconSize.M} />}
              onEnterPressed={handleOnClick}
              suffixIcon={
                showPassword ? (
                  <Eye
                    size={IconSize.M}
                    tabIndex={0}
                    className="nu-c-pointer"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setShowPassword(!showPassword);
                      }
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeSlash
                    size={IconSize.M}
                    tabIndex={0}
                    className="nu-c-pointer"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setShowPassword(!showPassword);
                      }
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )
              }
            />
            <Link
              className={styles["forgot__password-link"]}
              href={"/forgot-password"}
            >
              {translate("signInLabels", "forgotPasswordText")}
            </Link>
            <Button
              title={translate("continue")}
              isDisabled={!isValid}
              onClick={handleOnClick}
              buttonType={ButtonType.tertiary}
            />
            <p className={styles["sign__up-text"]}>
              {translate("signInLabels", "dontHaveAccount")}
              <Link className={styles["h__link"]} href={"/sign-up"}>
                {translate("signInLabels", "signUp")}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className={styles["signin__right-container"]}>
        <h1 className={styles["header__text"]}>
          {translate("signInLabels", "welcomeHeaderText")}
        </h1>
        <div className={styles["description__text"]}>
          <p>{translate("signInLabels", "descriptionText")}</p>
          <p>{translate("signInLabels", "subheaderText")}</p>
          <p>{translate("signInLabels", "finalText")}</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
