"use client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { grantTechContract } from "../../../../components/contract";

export default function Page({
  params,
}: {
  params: { id: number; type: string };
}) {
  const { id, type } = params;

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
        grants[id].anchor,
        1
      );
      setBuyTokenPrice(ethers.utils.formatEther(tokenPrice.toString()));
    }
    async function getSellPrice() {
      const tokenPrice = await grantTechContract.getSellPrice(
        grants[id].anchor,
        1
      );
      setSellTokenPrice(ethers.utils.formatEther(tokenPrice.toString()));
    }
    getBuyPrice();
    getSellPrice();
  }, [id]);

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
          className="bg-plum w-[348px] h-[44px] rounded-full hover:bg-plum/80"
          onClick={() => {
            type === "buy"
              ? buyShares(grants[id].anchor)
              : sellShares(grants[id].anchor);
          }}
        >
          Confirm key purchase
        </button>
      </div>
    </div>
  );
}
