"use client";

import { TKeyStatus, TMPCAlgorithm } from "@fireblocks/ncw-js-sdk";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import fireLogo from "../assets/fire-icon.png";
import { useAppStore } from "../services/AppStore";

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    loginToDemoAppServer,
    initAppStore,
    initFireblocksNCW,
    generateNewDeviceId,
    assignCurrentDevice,
    fireblocksNCW,
    keysStatus,
  } = useAppStore();

  const onClickCreateWallet = async () => {
    let userId = localStorage.getItem("userId");
    setIsLoading(true);
    if (!userId) {
      if (fireblocksNCW) {
        await fireblocksNCW.clearAllStorage();
      }
      userId = Math.random().toString(36).substring(2);
      localStorage.setItem("userId", userId);
      initAppStore(userId);
      await loginToDemoAppServer();
      await generateNewDeviceId();
      await assignCurrentDevice();
      await initFireblocksNCW();
      await fireblocksNCW?.generateMPCKeys(
        new Set<TMPCAlgorithm>(["MPC_CMP_ECDSA_SECP256K1"])
      );

      router.push("/dashboard");
    }
  };
  const statusToProgress = (status?: TKeyStatus | null) => {
    switch (status) {
      case "INITIATED":
        return "Wallet creation initiated";
      case "REQUESTED_SETUP":
        return "Initiation complete";
      case "SETUP":
        return "Generation in progress";
      case "SETUP_COMPLETE":
        return "Finishing up";
      case "READY":
        return "Completed";
      default:
        return "Creating Wallet";
    }
  };
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (userId) {
      initAppStore(userId);
      initFireblocksNCW();
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        className="w-[332px] h-[50px] font-ClashDisplay rounded-full  bg-lavender enabled:bg-lavender/80 disabled:opacity-80 flex items-center justify-center"
        onClick={onClickCreateWallet}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
        {isLoading
          ? statusToProgress(keysStatus?.MPC_CMP_ECDSA_SECP256K1?.keyStatus)
          : "Create Wallet"}
      </button>
    </div>
  );
}
