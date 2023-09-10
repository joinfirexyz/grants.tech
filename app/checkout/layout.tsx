import { Metadata } from "next";
import React from "react";
import CheckoutHeader from "../../components/CheckoutHeader";
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
      {HeadMetadata}
      <body>
        <CheckoutHeader />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
