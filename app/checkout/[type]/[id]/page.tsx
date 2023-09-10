"use client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { grants } from "../../../../components/Grants";

export default function Page({
  params,
}: {
  params: { id: string; type: string };
}) {
  const { id, type } = params;

  const [buyTokenPrice, setBuyTokenPrice] = useState("0");
  const [sellTokenPrice, setSellTokenPrice] = useState("0");
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    "bec77b2c1b174308bcaa3e622828448f"
  );
  const wallet = new ethers.Wallet(
    "5614556b0e9e476e3c2fb598f0bd034761e73182c073dbf8d88c917ce42ce4bc"
  );
  const signer = wallet.connect(provider);
  const contractAddress = "0xc09fc02765c5a107fef80501843481fe47013b27";
  const contractABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "trader",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "subject",
          type: "address",
        },
        { indexed: false, internalType: "bool", name: "isBuy", type: "bool" },
        {
          indexed: false,
          internalType: "uint256",
          name: "shareAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "ethAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "protocolEthAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "subjectEthAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "supply",
          type: "uint256",
        },
      ],
      name: "Trade",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "buyShares",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getBuyPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getBuyPriceAfterFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "supply", type: "uint256" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getSellPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getSellPriceAfterFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "protocolFeeDestination",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "protocolFeePercent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "sellShares",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_feeDestination", type: "address" },
      ],
      name: "setFeeDestination",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_feePercent", type: "uint256" },
      ],
      name: "setProtocolFeePercent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_feePercent", type: "uint256" },
      ],
      name: "setSubjectFeePercent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "sharesBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "sharesSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "subjectFeePercent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const grantTechContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  useEffect(() => {
    async function getBuyPrice() {
      const tokenPrice = await grantTechContract.getBuyPrice(
        "0x17ae58ab79444ad5b8ee2e232caf13c65c32af75",
        1
      );
      setBuyTokenPrice(ethers.utils.formatEther(tokenPrice.toString()));
    }
    async function getSellPrice() {
      const tokenPrice = await grantTechContract.getSellPrice(
        "0x17ae58ab79444ad5b8ee2e232caf13c65c32af75",
        1
      );
      setSellTokenPrice(ethers.utils.formatEther(tokenPrice.toString()));
    }
    getBuyPrice();
    getSellPrice();
  }, []);

  const buyShares = async () => {
    const tx = await grantTechContract.buyShares(
      "0x17ae58ab79444ad5b8ee2e232caf13c65c32af75",
      1,
      {
        value: ethers.utils.parseEther(buyTokenPrice),
      }
    );
    await tx.wait();
  };

  const sellShares = async () => {
    const tx = await grantTechContract.sellShares(
      "0x17ae58ab79444ad5b8ee2e232caf13c65c32af75",
      1
    );
    await tx.wait();
  };
  console.log("truying to log params here", params);
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={grants[id as any].bannerImg} />
      <h3>{`${type} 1 key of ${grants[id as any].name}`}</h3>
      <h1>{type === "buy" ? buyTokenPrice : sellTokenPrice}</h1>

      <div className="w-[350px]">
        <div className="grid grid-cols-3 space-x-10 border border-gray-200 rounded-t-lg px-3 py-1">
          <div>Pay with</div>
          <div>...address...</div>
        </div>
        <div className="grid grid-cols-3 space-x-10 border-x border-gray-200 px-3 py-1">
          <div>To</div>
          <div>{grants[id as any].name}</div>
        </div>
        <div className="grid grid-cols-3 space-x-10 border border-gray-200 px-3 py-1 rounded-b-lg">
          <div>Network</div>
          <div>Goerli</div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <span className="font-ClashDisplay text-plum">Network Fee</span>
          <span className="font-ClashDisplay text-gray-300">$0.01</span>
        </div>
        <div className="flex justify-between">
          <span className="font-ClashDisplay text-plum">{`Donation Fee (10%)`}</span>
          <span className="font-ClashDisplay text-gray-300">
            {type === "buy"
              ? Number(buyTokenPrice) * 0.1
              : Number(sellTokenPrice) * 0.1}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-ClashDisplay text-plum">Total Cost</span>
          <span className="font-ClashDisplay text-gray-300">
            {type === "buy"
              ? Number(buyTokenPrice)
              : Number(sellTokenPrice) + type === "buy"
              ? Number(buyTokenPrice) * 0.1
              : Number(sellTokenPrice) * 0.1}
          </span>
        </div>
        <button
          onClick={() => {
            type === "buy" ? buyShares() : sellShares();
          }}
        >
          Confirm key purchase
        </button>
      </div>
    </div>
  );
}
