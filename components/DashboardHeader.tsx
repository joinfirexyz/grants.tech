import Image from "next/image";
import copyAddress from "../assets/copy-address-icon.png";
import scanQR from "../assets/ion_scan.png";

//TODO: Add dynamic balance, copy address on button click, and scan QR on button click
const DashboardHeader = () => {
  return (
    <div className="w-screen h-[53px] bg-white flex flex-row justify-between items-center px-5">
      <div className="bg-gray-100 px-2 rounded-full h-fit">{`Balance: $150.00`}</div>
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
