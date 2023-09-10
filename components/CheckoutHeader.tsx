"use client";

import { useRouter } from "next/navigation";

//TODO: Add dynamic balance, copy address on button click, and scan QR on button click
const CheckoutHeader = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-[53px] bg-gray-50 flex flex-row justify-start items-center px-3">
      <button onClick={() => router.back()}>{`<- grants.tech`}</button>
    </div>
  );
};

export default CheckoutHeader;
