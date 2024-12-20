import type { Metadata } from "next";
import "../styles/globals.scss";
import Scroll from "../components/scroll/Scroll";
import NextTopLoader from "nextjs-toploader";
import "react-calendar/dist/Calendar.css";
import ToastContainer from "../components/toast/ToastContainer";

export const metadata: Metadata = {
  title: "Nymbleup",
  description: "Workforce Planning & Employee Scheduling Software | Nymbleup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <Scroll />
      <body>
        <div id="nymbleup-toast-portal"></div>
        <NextTopLoader zIndex={1000010} color="#D26300" showSpinner={false} />
        <div id="nymbleup-root">{children}</div>
        <div id="nymbleup-portal"></div>
        <ToastContainer />
      </body>
    </html>
  );
}
