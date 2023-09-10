"use client";
import { useState } from "react";
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
