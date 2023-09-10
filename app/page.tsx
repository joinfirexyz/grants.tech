"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import fireLogo from "../assets/fire-icon.png";
import { WalletContext } from "../contexts/WalletContext";

export default function Homepage() {
  const router = useRouter();
  const { walletAddress } = useContext(WalletContext);

  useEffect(() => {
    if (walletAddress) {
      router.push("/dashboard");
    }
  }, [walletAddress, router]);

  return (
    <div className="h-screen w-screen items-center justify-center flex flex-col space-y-5">
      <div className="flex items-center justify-center p-4">
        <Image
          className="mx-auto mb-1 h-24 w-auto cursor-pointer self-center"
          src={fireLogo}
          alt="Workflow"
        />
      </div>
      <div className="flex text-[30px] font-semibold shrink mx-auto text-left flex-col font-ClashDisplay mb-10">
        <h1>Millions of Grants.</h1>
        <h1>Funded on Fire.</h1>
      </div>
      <button
        className="w-[332px] h-[50px] font-ClashDisplay rounded-full text-center bg-lavender hover:bg-lavender/80"
        onClick={() => {
          console.log("TODO: init wallet creation here");
        }}
      >
        Create Account
      </button>
    </div>
  );
}
