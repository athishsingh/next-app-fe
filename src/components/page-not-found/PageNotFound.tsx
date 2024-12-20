"use client";
import Image from "next/image";
import styles from "./page-not-found.module.scss";
import Button from "../button/Button";
import { ButtonType } from "../button/types";
import { useRouter } from "nextjs-toploader/app";

const PageNotFound = () => {
  const router = useRouter();
  return (
    <div className={styles["page__not-found-main-con"]}>
      <Image
        src={"/images/logo.png"}
        alt="logo"
        width={204}
        height={75}
        priority={false}
      />
      <div className="nu-flex nu-ai-center nu-column nu-gap-4">
        <Image src={"/images/404.svg"} alt="logo" width={204} height={75} />
        <div className="nu-flex nu-column nu-gap-3 nu-ai-center">
          <p className={styles["header__text"]}>Oops! You’re lost.</p>
          <p className={styles["description__text"]}>
            The page you are looking for is not here
          </p>
        </div>

        <Button
          className={styles["button__parent-con"]}
          title="Back to home page"
          onClick={() => {
            router.replace("/dashboard");
          }}
          buttonType={ButtonType.primary}
        />
      </div>
      <div className={styles["dummy__con"]} />
    </div>
  );
};

export default PageNotFound;
