"use client";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import { Grant } from "./Grant";
import { grants as defaultGrants } from "./Grants";
import { grantTechContract, setWethApproval } from "./contract";

const USER_ADDRESS = '0x1eA7225C5749C1F031a06B55bAB335367A3715d4';

interface GrantListProps {
  grants: any[];
  className?: string;
}

export type Grant = {
  id: string;
  anchor: string;
  logoImg: string;
  sellPrice?: number;
  githubLink: string;
  twitterLink: string;
  name: string;
  createdAt: string;
  description: string;
  websiteUrl: string;
  bannerImg: string;
  quantityOwned?: number;
};

/**
 * Primary UI component for user interaction
 */
export const GrantList = ({ ...props }: GrantListProps) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [buyTokenPrice, setBuyTokenPrice] = useState("0");
  const [sellTokenPrice, setSellTokenPrice] = useState("0");
  const [grants, setGrants] = useState<Grant[]>(defaultGrants);
  const [myTokensFilter, setMyTokensFilter] = useState(false);

  useEffect(() => {
    const addSellPriceToGrants = async () => {
      const grantsWithSellPrice = await Promise.all(
        grants.map(async (grant) => {
          const tokenPrice = await grantTechContract.getSellPrice(
            grant.anchor,
            1
          );
          const quantityOwned = await grantTechContract.sharesBalance(grant.anchor, USER_ADDRESS);
          grant.quantityOwned = quantityOwned;
          grant.sellPrice = +ethers.utils.formatEther(tokenPrice.toString()) * quantityOwned.toNumber();
          return grant;
        })
      );
      setGrants(grantsWithSellPrice);
    };
    addSellPriceToGrants();
  }, [modalOpen]);

  useEffect(() => {
    async function getBuyPrice() {
      const tokenPrice = await grantTechContract.getBuyPrice(
        grants[selectedIndex].anchor,
        1
      );
      setBuyTokenPrice(ethers.utils.formatEther(tokenPrice.toString()));
    }
    async function getSellPrice() {
      const tokenPrice = await grantTechContract.getSellPrice(
        grants[selectedIndex].anchor,
        1
      );
      setSellTokenPrice(ethers.utils.formatEther(tokenPrice.toString()));
    }
    getBuyPrice();
    getSellPrice();
  }, [selectedIndex]);

  return (
    <>
      <nav className="bg-white flex gap-2 min-w-full p-2 shadow-md">
        <button
          className={`
              flex-1 py-1 px-4 rounded-full
              text-sm text-semibold text-plum font-Manrope
              border-none appearance-none outline-none cursor-pointer
              ${
                !myTokensFilter
                  ? `bg-plum text-white`
                  : `bg-grey-100 hover:bg-grey-400`
              }
            `}
          onClick={() => setMyTokensFilter(!myTokensFilter)}
        >
          Top
        </button>
        <button
          className={`
              flex-1 py-1 px-4 rounded-full
              text-sm text-semibold text-plum font-Manrope
              border-none appearance-none outline-none cursor-pointer
              ${
                myTokensFilter
                  ? `bg-plum text-white`
                  : `bg-grey-100 hover:bg-grey-400`
              }
            `}
          onClick={() => setMyTokensFilter(!myTokensFilter)}
        >
          Your Keys
        </button>
      </nav>
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
                <span className="text-gray-400 self-start px-3">
                  Description
                </span>
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
                <span className="text-white text-lg font-ClashDisplay">
                  {(buyTokenPrice)}
                </span>
                <span className="text-white text-lg font-ClashDisplay">
                  WETH
                </span>
              </div>
              <div className="space-x-3 flex flex-row items-center justify-center">
                <button
                  className="bg-white rounded-full w-[170px] h-[44px] font-ClashDisplay text-plum hover:bg-gray-200"
                  onClick={() => {
                    router.push(`/checkout/buy/${selectedIndex}`);
                  }}
                >
                  Buy
                </button>
                <button
                  className="bg-white rounded-full w-[167px] h-[44px] font-ClashDisplay text-plum hover:bg-gray-200"
                  onClick={() => {
                    router.push(`/checkout/sell/${selectedIndex}`);
                  }}
                >
                  Sell
                </button>
              </div>
              <div className="h-5" />
            </div>
          </div>
        </Drawer>
        <div className={`flex flex-col space-y-3  ${props.className}`}>
          {grants
            .filter((grant) => {
              return (
                 !myTokensFilter || grant.quantityOwned && (grant.quantityOwned > 0)
                );
            })
            .map((grant, index) => (
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
    </>
  );
};
