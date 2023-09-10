"use client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import { Grant } from "./Grant";
import { grants } from "./Grants";

interface GrantListProps {
  grants: any[];
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const GrantList = ({ ...props }: GrantListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
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
  return (
    <div>
      <Drawer visible={modalOpen} setVisible={setModalOpen}>
        <div className="h-fit bg-plum rounded-t-lg">
          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-3xl bg-white mt-10">
            <img
              className="rounded-xl mx-auto px-3"
              src={grants[selectedIndex].bannerImg}
              alt=""
            />
            <h1 className="font-ClashDisplay text-xl text-center mx-auto">
              {grants[selectedIndex].name}
            </h1>
            <div className="flex flex-row justify-center items-center space-x-1">
              <h3 className="text-grey-400">{`By `}</h3>
              <img
                className="rounded-full h-3 w-3"
                src={grants[selectedIndex].logoImg}
                alt=""
              />
              <h3 className="text-gray-400">{`${grants[
                selectedIndex
              ].anchor.slice(0, 5)}...${grants[selectedIndex].anchor.slice(
                0,
                5
              )}`}</h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-gray-400 self-start px-3">Description</span>
              <p className="px-3">{grants[selectedIndex].description}</p>
            </div>
            <div className="p-3 flex w-full">
              <div className="flex flex-row justify-start space-x-2">
                <button
                  onClick={() => {
                    window.open(grants[selectedIndex].websiteUrl, "_blank");
                  }}
                >
                  <img
                    className="transition duration-100 ease-in-out hover:scale-110"
                    src="/images/www.png"
                    alt="clock"
                    width="16"
                    height="16"
                  />
                </button>
                <button
                  onClick={() => {
                    window.open(grants[selectedIndex].githubLink, "_blank");
                  }}
                >
                  <img
                    className="transition duration-100 ease-in-out hover:scale-110"
                    src="/images/github.png"
                    alt="clock"
                    width="16"
                    height="16"
                  />
                </button>
                <button
                  onClick={() => {
                    window.open(grants[selectedIndex].twitterLink, "_blank");
                  }}
                >
                  <img
                    className="transition duration-100 ease-in-out hover:scale-110"
                    src="/images/twitter.png"
                    alt="clock"
                    width="16"
                    height="16"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-fit mx-auto">
            <label className="text-white text-sm mt-4 mb-2 self-start">
              Key Price
            </label>
            <div className="px-4 items-center flex justify-between bg-gray-500 w-[350px] h-9 rounded-full mb-3">
              <span className="text-white text-lg font-ClashDisplay">$100</span>
              <span className="text-white text-lg font-ClashDisplay">USD</span>
            </div>
            <div className="space-x-3 flex flex-row items-center justify-center">
              <button
                className="bg-white rounded-full w-[170px] h-[44px] font-ClashDisplay text-plum hover:bg-gray-200"
                onClick={() => {
                  console.log("TODO: Add buy call here", grants[selectedIndex]);
                }}
              >
                Buy
              </button>
              <button
                className="bg-white rounded-full w-[167px] h-[44px] font-ClashDisplay text-plum hover:bg-gray-200"
                onClick={() => {
                  console.log("TODO: Add buy call here", grants[selectedIndex]);
                }}
              >
                Sell
              </button>
            </div>
            <div className="h-5" />
          </div>
        </div>
        <div className="h-[375px] p-4">
          <h1 className="font-ClashDisplay text-xl">
            {grants[selectedIndex].name}
          </h1>
          <button
            onClick={() => {
              buyShares();
            }}
          >
            Buy for {buyTokenPrice}
          </button>
          <button
            onClick={() => {
              sellShares();
            }}
          >
            Sell for {sellTokenPrice}
          </button>
        </div>
      </Drawer>
      <div className={`flex flex-col space-y-3  ${props.className}`}>
        {grants.map((grant, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            <Grant key={index} data={grant} setModalOpen={setModalOpen} />
          </button>
        ))}
      </div>
    </div>
  );
};
