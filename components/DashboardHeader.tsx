"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { getTotalWalletBalance } from "../app/api/assets";
import copyAddress from "../assets/copy-address-icon.png";
import scanQR from "../assets/ion_scan.png";
import { WalletContext } from "../contexts/WalletContext";

//TODO: Add dynamic balance, copy address on button click, and scan QR on button click
const DashboardHeader = () => {
  const { walletAddress } = useContext(WalletContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getTokenBalance = async () => {
      const res = await getTotalWalletBalance(walletAddress || "");
      console.log("logging res", res);
      setBalance(res);
    };
    getTokenBalance();
  }, []);

  return (
    <div className="w-screen h-[53px] bg-white flex flex-row justify-between items-center px-5">
      <div className="bg-gray-100 px-2 rounded-full h-fit">{`Balance: $${balance.toFixed(
        2
      )}`}</div>
      <div className="flex flex-row space-x-4 justify-center items-center">
        <button className="transition duration-100 ease-in-out hover:scale-110">
          <Image src={copyAddress} alt="" />
        </button>
        <button className="transition duration-100 ease-in-out hover:scale-110">
          <Image src={scanQR} alt="" />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
