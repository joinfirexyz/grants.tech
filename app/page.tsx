"use client";
import Image from "next/image";
import fireLogo from "../assets/fire-icon.png";

export default function Homepage() {
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
        Create Wallet
      </button>
    </div>
  );
}
