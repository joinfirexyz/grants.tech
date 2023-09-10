"use client";
import { use, useEffect, useState } from "react";
import Drawer from "./Drawer";
import { Grant } from "./Grant";
import { grants as defaultGrants } from "./Grants";
import { ethers } from "ethers";
import { grantTechContract } from "./contract";
import { parse } from "json5";

interface GrantListProps {
  grants: any[];
  className?: string;
}

// {
//     id: "0xcde649b95fd2d6bbfbe036c9e74188a5302bda0dfa48730333b9f9b825a82924",
//     anchor: "0x2bd2E7777b2581E5cb7B6fE4aAdeE2eeA8ECa038",
//     githubLink: "https://github.com/airaffairdrones",
//     twitterLink: "https://twitter.com/airaffairdrones",
//     name: "AirAffair Drones",
//     createdAt: "2021-07-26",
//     description:
//       "AirAffair - A drone service that plants seeds in deforested areas. Rebuilding our forests from the sky.",
//     websiteUrl: "https://airaffairdrones.org",
//     logoImg: "https://i.ibb.co/HpnPZdV/airaffair-drones-logo.png",
//     bannerImg: "https://i.ibb.co/71fhcnJ/airaffair-drones.png",

type Grant = {
  id: string;
  anchor: string;
  logoImg: string;
  sellPrice?: string;
  githubLink: string;
  twitterLink: string;
  name: string;
  createdAt: string;
  description: string;
  websiteUrl: string;
  bannerImg: string;
};

/**
 * Primary UI component for user interaction
 */
export const GrantList = ({ ...props }: GrantListProps) => {
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
          grant.sellPrice = ethers.utils.formatEther(tokenPrice.toString());
          return grant;
        })
      );
      setGrants(grantsWithSellPrice);
    };
    addSellPriceToGrants();
  }, []);

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

  const buyShares = async (address: string) => {
    const tx = await grantTechContract.buyShares(address, 1, {
      value: ethers.utils.parseEther(buyTokenPrice),
    });
    await tx.wait();
  };

  const sellShares = async (address: string) => {
    const tx = await grantTechContract.sellShares(address, 1);
    await tx.wait();
  };
  return (
    <>
      <nav className="bg-white flex gap-2 min-w-full p-2 shadow-md">
      <button
            className={`
              flex-1 py-1 px-4 rounded-full
              text-sm text-semibold text-plum font-Manrope
              border-none appearance-none outline-none cursor-pointer
              ${!myTokensFilter ? `bg-plum text-white` : `bg-grey-100 hover:bg-grey-400`}
            `}
            onClick={()=>setMyTokensFilter(!myTokensFilter)}
          >
            Top
          </button>
          <button
            className={`
              flex-1 py-1 px-4 rounded-full
              text-sm text-semibold text-plum font-Manrope
              border-none appearance-none outline-none cursor-pointer
              ${myTokensFilter ? `bg-plum text-white` : `bg-grey-100 hover:bg-grey-400`}
            `}
            onClick={()=>setMyTokensFilter(!myTokensFilter)}
          >
            Your Keys
          </button>
      </nav>
      <Drawer visible={modalOpen} setVisible={setModalOpen}>
        <div className="h-[375px] p-4">
          <h1 className="font-ClashDisplay text-xl">
            {grants[selectedIndex].name}
          </h1>
          <button
            onClick={() => {
              buyShares(grants[selectedIndex].anchor);
            }}
          >
            Buy for {buyTokenPrice}
          </button>
          <button
            onClick={() => {
              sellShares(grants[selectedIndex].anchor);
            }}
          >
            Sell for {sellTokenPrice}
          </button>
        </div>
      </Drawer>
      <div className={`flex flex-col space-y-3  ${props.className}`}>
        {grants
          .filter((grant) => {
            return !myTokensFilter || (grant.sellPrice && +grant.sellPrice > 0);
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
    </>
  );
};
