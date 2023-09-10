"use client";
import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import { Grant } from "./Grant";
import { grants } from "./Grants";
import { ethers } from "ethers";
import { grantTechContract } from "./contract";

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
  const [buyTokenPrice, setBuyTokenPrice] = useState('0');
  const [sellTokenPrice, setSellTokenPrice] = useState('0');
  
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
