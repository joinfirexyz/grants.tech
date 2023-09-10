import { Metadata } from "next";
import React from "react";
import { HeadMetadata } from "../components/HeadMetadata";
import { WalletContextProvider } from "../contexts/WalletContext";
import "./globals.css";

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
        <WalletContextProvider>
          {/* <Header /> */}
          <main>{children}</main>
        </WalletContextProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
