import Navbar from "@/src/components/navbar/components/Navbar";
import React from "react";
import styles from "./main-layout.module.scss";

type Props = { children: React.ReactNode };

function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className={`${styles["main__layout_con"]}`}>{children}</div>
    </>
  );
}

export default MainLayout;
