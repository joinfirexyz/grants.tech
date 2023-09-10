import { Metadata } from "next";
import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { HeadMetadata } from "../../components/HeadMetadata";

export const metadata: Metadata = {
  title: "grants.tech",
  description:
    "Grants.tech is a platform for funding open source software development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      {HeadMetadata}
      <body>
        <DashboardHeader />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
