"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Pill } from "./Pill";

interface GrantProps {
  size?: "small" | "medium" | "large";
  data: any;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Primary UI component for user interaction
 */
export const Grant = ({ size = "medium", ...props }: GrantProps) => {
  return (
    <button
      className="p-2 shadow-md bg-white w-[348px] rounded-xl"
      onClick={() => props.setModalOpen(true)}
    >
      <div className="flex flex-row">
        <div>
          <img
            className="mr-2 h-[104px] w-[104px] rounded-lg"
            src={props.data.logoImg}
          />
        </div>
        <div className="mt-0.5 ml-3">
          <Pill primary={true}>{props.data.sellPrice}</Pill>
          <div className="ml-1">
            <div className="mt-5">
              <h3>{props.data.name}</h3>
            </div>
            <div>
              <h4 className="text-gray-400">
                By{" "}
                {`${props.data.anchor.slice(0, 5)}...${props.data.anchor.slice(
                  -5,
                  props.data.anchor.length
                )}`}
              </h4>
            </div>
          </div>
        </div>
      </div>

      <hr className="h-px bg-gray-200 border-0 mt-2.5 mb-2.5 w-full" />
      <div className="flex flex-row align-center justify-between">
        <div className="flex flex-row align-center space-x-2">
          <button
            onClick={() => {
              window.open(props.data.websiteUrl, "_blank");
            }}
          >
            <Image
              className="transition duration-100 ease-in-out hover:scale-110"
              src="/images/www.png"
              alt="clock"
              width="16"
              height="16"
            />
          </button>
          <button
            onClick={() => {
              window.open(props.data.githubLink, "_blank");
            }}
          >
            <Image
              className="transition duration-100 ease-in-out hover:scale-110"
              src="/images/github.png"
              alt="clock"
              width="16"
              height="16"
            />
          </button>
          <button
            onClick={() => {
              window.open(props.data.twitterLink, "_blank");
            }}
          >
            <Image
              className="transition duration-100 ease-in-out hover:scale-110"
              src="/images/twitter.png"
              alt="clock"
              width="16"
              height="16"
            />
          </button>
        </div>
      </div>
    </button>
  );
};
