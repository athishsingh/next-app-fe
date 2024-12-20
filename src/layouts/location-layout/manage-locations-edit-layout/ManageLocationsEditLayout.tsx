"use client";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import Header from "@/src/components/header/Header";
import IconButton from "@/src/components/icon-button/IconButton";
import Toggle from "@/src/components/toggle/Toggle";
import { IconSize } from "@/src/constants/iconsize.constant";
import { ArrowLeft, X } from "@phosphor-icons/react";
import React from "react";
import styles from "./manage-locations-edit-layout.module.scss";
import { ManageLocationSidebarRoutes } from "./manage-locations-sidebar-data";
import { cn } from "@/src/utils/class.utils";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

const ManageLocationsEditLayout = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <div className={styles["manage__location-edit-main-con"]}>
      <Header
        paddingTop={12}
        paddingBottom={12}
        classnames={styles["header__container"]}
        leftComponent={
          <div className="nu-flex nu-ai-center nu-gap-5">
            <div className="nu-flex nu-ai-center nu-gap-3">
              <IconButton
                icon={<ArrowLeft size={IconSize.L} />}
                onClick={() => {}}
              />
              <p className={styles["location__name-text"]}>Location Name</p>
            </div>
            <Toggle />
          </div>
        }
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-5">
            <Button
              title="Save changes"
              onClick={() => {}}
              buttonType={ButtonType.secondary}
            />
            <IconButton onClick={() => {}} icon={<X size={IconSize.L} />} />
          </div>
        }
      />
      <div className={styles["locations__children-main-container"]}>
        <div className={styles["sidebar__route-con"]}>
          {ManageLocationSidebarRoutes.map((e) => {
            return (
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    router.replace(e.route(id));
                  }
                }}
                onClick={() => {
                  router.replace(e.route(id));
                }}
                key={e.label}
                className={cn(styles["link__con"], {
                  [styles["selected"]]: pathName === e.route(id),
                })}
              >
                {e.label}
              </div>
            );
          })}
        </div>
        <div className={styles["children__main-con"]}>{children}</div>
      </div>
    </div>
  );
};

export default ManageLocationsEditLayout;
