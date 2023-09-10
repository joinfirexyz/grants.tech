"use client";
import { use, useEffect, useState } from "react";
import Drawer from "./Drawer";
import { Grant } from "./Grant";
import { grants as defaultGrants } from "./Grants";
import { ethers } from "ethers";
import { grantTechContract } from "./contract";

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
    buyPrice?: string;
    githubLink: string;
    twitterLink: string;
    name: string;
    createdAt: string;
    description: string;
    websiteUrl: string;
    bannerImg: string;
}


/**
 * Primary UI component for user interaction
 */
export const GrantList = ({ ...props }: GrantListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [buyTokenPrice, setBuyTokenPrice] = useState('0');
  const [sellTokenPrice, setSellTokenPrice] = useState('0');
  const [grants, setGrants] = useState<Grant[]>(defaultGrants);

  useEffect(() => {
    const addBuyPriceToGrants = async () => {
        const grantsWithBuyPrice = await Promise.all(grants.map(async (grant) => {
            const tokenPrice = await grantTechContract.getBuyPrice(
                grant.anchor,
                1
            );
            grant.buyPrice = ethers.utils.formatEther(tokenPrice.toString());
            return grant;
        }));
        setGrants(grantsWithBuyPrice);
    }
    addBuyPriceToGrants();
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
    const tx = await grantTechContract.buyShares(
      address,
      1,
      {
        value: ethers.utils.parseEther(buyTokenPrice),
      }
    );
    await tx.wait();
  }

  const sellShares = async (address: string) => {
    const tx = await grantTechContract.sellShares(
      address,
      1
    );
    await tx.wait();
  }
  return (
    <>
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
    </>
  );
};
