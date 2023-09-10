"use client";
import Image from "next/image";
import { useEffect } from "react";
import fireLogo from "../assets/fire-icon.png";
import { useAppStore } from "../services/AppStore";

export default function Homepage() {
  const {
    initAppStore,
    fireblocksNCW,
    generateNewDeviceId,
    assignCurrentDevice,
    fireblocksNCWStatus,
    assignDeviceStatus,
    appStoreInitialized,
    loginToDemoAppServer,
  } = useAppStore();

  const onClickCreateWallet = async () => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      if (fireblocksNCW) {
        await fireblocksNCW.clearAllStorage();
      }
      userId = Math.random().toString(36).substring(2);
      localStorage.setItem("userId", userId);
      console.log("userId", userId);
      initAppStore(userId);
      await loginToDemoAppServer();
      await generateNewDeviceId();
      await assignCurrentDevice();
    } else {
      console.log("userId", userId);
      initAppStore(userId);
    }
  };

  useEffect(() => {
    const init = async () => {};
    init();
  }, [assignCurrentDevice, fireblocksNCW, generateNewDeviceId, initAppStore]);

  console.log("fireblocksNCWStatus", fireblocksNCWStatus);
  console.log("appStoreInitialized", appStoreInitialized);

  return (
    <div className="h-screen w-screen items-center justify-center flex flex-col space-y-5">
      <div className="flex items-center justify-center p-4">
        <Image
          className="mx-auto mb-1 h-24 w-auto cursor-pointer self-center"
          src={fireLogo}
          alt="Fire Logo"
        />
      </div>
      <div className="flex text-[30px] font-semibold shrink mx-auto text-left flex-col font-ClashDisplay mb-10">
        <h1>Millions of Grants.</h1>
        <h1>Funded on Fire.</h1>
      </div>
      <button
        className="w-[332px] h-[50px] font-ClashDisplay rounded-full text-center bg-lavender hover:bg-lavender/80"
        onClick={onClickCreateWallet}
      >
        Create Wallet {assignDeviceStatus} {appStoreInitialized}
      </button>
    </div>
  );
}
