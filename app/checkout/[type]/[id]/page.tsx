"use client";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Grant } from "../../../../components/GrantList";
import { grants as defaultGrants } from "../../../../components/Grants";
import {
  grantTechContract,
  sendTransaction,
  setWethApproval,
} from "../../../../components/contract";
import { WalletContext } from "../../../../contexts/WalletContext";
import { getAppStore } from "../../../../services/AppStore";

export default function Page({
  params,
}: {
  params: { id: number; type: string };
}) {
  const { id, type } = params;

  const [buyTokenPrice, setBuyTokenPrice] = useState("0");
  const [sellTokenPrice, setSellTokenPrice] = useState("0");
  const [grants, setGrants] = useState<Grant[]>(defaultGrants);
  const { walletAddress } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);
  const { createTransaction, txs } = getAppStore();

  useEffect(() => {
    const addSellPriceToGrants = async () => {
      const grantsWithSellPrice = await Promise.all(
        grants.map(async (grant) => {
          const tokenPrice = await grantTechContract.getSellPrice(
            grant.anchor,
            1
          );
          grant.sellPrice = +ethers.utils.formatEther(tokenPrice.toString());
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
    setLoading(true);
    const txReq = {
      to: grantTechContract.address,
      data: grantTechContract.interface.encodeFunctionData("buyShares", [
        address,
        1,
      ]),
      value: ethers.utils.parseEther(buyTokenPrice),
    } satisfies ethers.providers.TransactionRequest;

    await createTransaction({
      transactionRequest: txReq,
    });
    const approvalTx = await setWethApproval();
    await approvalTx.wait(1);
    const result = await sendTransaction("buyShares", [address, 1]);
    console.log("result", result);
    setLoading(false);
    alert("Key successfully bought!");
  };

  const sellShares = async (address: string) => {
    setLoading(true);
    const result = await sendTransaction("sellShares", [address, 1]);
    console.log("result", result);
    setLoading(false);
    alert("Key successfully sold!");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <img src={grants[id as any].bannerImg} className="mt-5 rounded-xl" />
      <h3 className="font-ClashDisplay text-lg">{`${type} 1 key of ${
        grants[id as any].name
      }`}</h3>
      <h1 className="font-ClashDisplay text-2xl">
        {type === "buy" ? buyTokenPrice : sellTokenPrice}
      </h1>

      <div className="w-[350px] shadow-md font-ClashDisplay">
        <div className="grid grid-cols-3 h-[45px] space-x-10 border border-gray-200 rounded-t-lg px-3 py-1">
          <div>Pay with</div>
          <div className="grid colspan-2">{`${walletAddress?.slice(
            0,
            5
          )}...${walletAddress?.slice(0, 5)}`}</div>
        </div>
        <div className="grid grid-cols-3 h-[45px] space-x-10 border-x border-gray-200 px-3 py-1 font-ClashDisplay">
          <div>To</div>
          <div className="grid colspan-2">{grants[id as any].name}</div>
        </div>
        <div className="grid grid-cols-3 h-[45px] space-x-10 border border-gray-200 px-3 py-1 rounded-b-lg font-ClashDisplay">
          <div>Network</div>
          <div className="grid colspan-2">Goerli</div>
        </div>
      </div>
      <div className="w-[350px] space-y-1.5">
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
          <span className="font-ClashDisplay text-plum font-semibold">
            Total Cost
          </span>
          <span className="font-ClashDisplay text-gray-300 font-semibold">
            {type === "buy"
              ? Number(buyTokenPrice)
              : Number(sellTokenPrice) + type === "buy"
              ? Number(buyTokenPrice) * 0.1
              : Number(sellTokenPrice) * 0.1}
          </span>
        </div>
        <div className="h-5" />
        <button
          className="bg-plum w-[348px] h-[44px] rounded-full hover:bg-plum/80 text-white font-ClashDisplay flex items-center justify-center space-x-2"
          disabled={loading}
          onClick={() => {
            type === "buy"
              ? buyShares(grants[id].anchor)
              : sellShares(grants[id].anchor);
          }}
        >
          {loading && (
            <TailSpin
              height="30"
              width="30"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{ position: "absolute", left: "50px" }}
              wrapperClass=""
              visible={true}
            />
          )}
          <div>Confirm key purchase</div>
        </button>
      </div>
    </div>
  );
}
