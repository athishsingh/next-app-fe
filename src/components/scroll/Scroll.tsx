"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Scroll() {
  // when clicking a link, user will scroll to the top of the page smoothly.
  // their current scroll position will persist to the next page.
  // this useEffect ensures that the scroll is smooth.

  const pathname = usePathname();
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return <></>;
}
