import { Metadata } from "next";
import React from "react";
import CheckoutHeader from "../../components/CheckoutHeader";
import { HeadMetadata } from "../../components/HeadMetadata";
import { WalletContextProvider } from "../../contexts/WalletContext";

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
        <CheckoutHeader />
        <WalletContextProvider>
          <main>{children}</main>
        </WalletContextProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
