"use client";
import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import copyAddress from "../assets/copy-address-icon.png";
import scanQR from "../assets/ion_scan.png";

//TODO: Add dynamic balance, copy address on button click, and scan QR on button click
const DashboardHeader = () => {
  const [address, setAddress] = useState("");
  useEffect(() => {
    const getAddress = async () => {
      const pKey = localStorage.getItem("DEMO_APP:deviceKey");
      const wallet = new ethers.Wallet(pKey!);
      const address = wallet.address;
      setAddress(address);
    };
    getAddress();
  }, []);

  const copyAddressClick = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="w-screen h-[53px] bg-white flex flex-row justify-between items-center px-5">
      <div className="bg-gray-100 px-2 rounded-full h-fit">{`${address.slice(
        0,
        7
      )}...${address.slice(-4)} Balance: $150.00`}</div>
      <div className="flex flex-row space-x-4 justify-center items-center">
        <button
          className="transition duration-100 ease-in-out hover:scale-110"
          onClick={copyAddressClick}
        >
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
