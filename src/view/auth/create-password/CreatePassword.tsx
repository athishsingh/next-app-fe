"use client";
import Input from "@/src/components/input/Input";
import { IconSize } from "@/src/constants/iconsize.constant";
import { Check, Eye, EyeSlash, Key } from "@phosphor-icons/react";
import React, { useState } from "react";
import styles from "./create-password.module.scss";
import { cn } from "@/src/utils/class.utils";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import { useRouter } from "nextjs-toploader/app";

const CreatePassword = ({ _email }: { _email: string }) => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const checkIfValid = (type: string) => {
    if (type === "uppercase") {
      return /[A-Z]/.test(password);
    }
    if (type === "lowercase") {
      return /[a-z]/.test(password);
    }
    if (type === "special") {
      return /[!@#$%^&*(){}[\]]/.test(password);
    }
    if (type === "number") {
      return /[0-9]/.test(password);
    }
    if (type === "match") {
      return password === confirmPassword && password !== "";
    }
    return false;
  };

  return (
    <div className={styles["create__password-parent"]}>
      <div className={styles["create__password-main-con"]}>
        <h1 className={styles["header__text"]}>Create password</h1>
        <Input
          value={password}
          type={showPassword ? "text" : "password"}
          classnames="nu-w-full"
          onChange={(e) => setPassword(e)}
          placeholder="Enter your password"
          label="Password"
          prefixIcon={<Key size={IconSize.M} />}
          showLabelText
          autoWidth
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
        <Input
          classnames="nu-w-full"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          allowPaste={false}
          onChange={(e) => setConfirmPassword(e)}
          placeholder="Confirm your password"
          label="Confirm password"
          prefixIcon={<Key size={IconSize.M} />}
          showLabelText
          autoWidth
          suffixIcon={
            showConfirmPassword ? (
              <Eye
                size={IconSize.M}
                tabIndex={0}
                className="nu-c-pointer"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowConfirmPassword(!showConfirmPassword);
                  }
                }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <EyeSlash
                size={IconSize.M}
                tabIndex={0}
                className="nu-c-pointer"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowConfirmPassword(!showConfirmPassword);
                  }
                }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )
          }
        />
        <div className="nu-flex nu-gap-1 nu-column">
          <div
            className={cn(
              "nu-flex nu-ai-center nu-gap-1",
              styles["rules__main-con"],
              {
                [styles["checked"]]:
                  checkIfValid("uppercase") && checkIfValid("lowercase"),
              }
            )}
          >
            <Check size={IconSize.S} />
            <p
              className={cn(styles["rule__text"], {
                [styles["checked"]]:
                  checkIfValid("uppercase") && checkIfValid("lowercase"),
              })}
            >
              {" "}
              Use at least one upper case and lower case character
            </p>
          </div>
          <div
            className={cn("nu-flex nu-gap-1", styles["rules__main-con"], {
              [styles["checked"]]: checkIfValid("special"),
            })}
          >
            <Check size={IconSize.S} />
            <p
              className={cn(styles["rule__text"], {
                [styles["checked"]]: checkIfValid("special"),
              })}
            >
              {" "}
              Use at least one special character
            </p>
          </div>
          <div
            className={cn("nu-flex nu-gap-1", styles["rules__main-con"], {
              [styles["checked"]]: checkIfValid("number"),
            })}
          >
            <Check size={IconSize.S} />
            <p
              className={cn(styles["rule__text"], {
                [styles["checked"]]: checkIfValid("number"),
              })}
            >
              Use numerical characters{" "}
            </p>
          </div>
          <div
            className={cn("nu-flex nu-gap-1", styles["rules__main-con"], {
              [styles["checked"]]: checkIfValid("match"),
            })}
          >
            <Check size={IconSize.S} />
            <p
              className={cn(styles["rule__text"], {
                [styles["checked"]]: checkIfValid("match"),
              })}
            >
              {" "}
              Both the passwords match
            </p>
          </div>
        </div>
        <Button
          title="Set password"
          onClick={() => {
            router.push("/sign-in");
          }}
          isDisabled={
            !checkIfValid("match") ||
            !checkIfValid("number") ||
            !checkIfValid("special") ||
            !checkIfValid("lowercase") ||
            !checkIfValid("uppercase")
          }
          buttonType={ButtonType.primary}
        />
      </div>
    </div>
  );
};

export default CreatePassword;
