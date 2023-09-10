import React from "react";
import { Pill } from "./Pill";
import Image from "next/image";

interface GrantProps {
  size?: "small" | "medium" | "large";
}

const styles = {
  boxShadow: "0px 3px 8px 0px rgba(49, 46, 69, 0.08)",
  borderRadius: "16px",
};

const imageStyles = {
  height: "104px",
  width: "104px",
  borderRadius: "12px",
};

const header = {
  fontSize: "16px",
  lineHeight: "20px",
  letterSpacing: "0.015em",
  textAlign: "left" as const,
};

const subHeader = {
  fontSize: "11px",
  lineHeight: "14px",
  letterSpacing: "0.015em",
  textAlign: "left" as const,
  color: "#ACACAC",
};

const userCount = {
  fontSize: "11px",
  letterSpacing: "0.015em",
  textAlign: "left" as const,
};

/**
 * Primary UI component for user interaction
 */
export const Grant = ({ size = "medium", ...props }: GrantProps) => {
  return (
    <div style={styles} className="p-2">
      <div className="flex flex-row">
        <div>
          <img
            style={imageStyles}
            className="mr-2"
            src="https://i.ibb.co/42V1xhP/earthcoin-initiative-logo.png"
          />
        </div>
        <div className="mt-0.5">
          <Pill primary={true}>Balance $150.00</Pill>
          <div className="ml-1">
            <div className="mt-5">
              <h3 style={header}>ETHSTAKER.TAX</h3>
            </div>
            <div>
              <h4 style={subHeader}>By 0xFf74...A0B7</h4>
            </div>
          </div>
        </div>
      </div>

      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mt-2.5 mb-2.5" />
      <div className="flex flex-row align-center justify-between">
        <div className="flex flex-row align-center">
          <div className="flex flex-row align-center mr-3">
            <Image
              className="m-0.5"
              src="/images/user.png"
              alt="clock"
              width="13"
              height="13"
            />
            <span className="flex align-center" style={userCount}>
              12,000
            </span>
          </div>

          <Image
            className="m-0.5"
            src="/images/www.png"
            alt="clock"
            width="13"
            height="13"
          />
          <Image
            className="m-0.5"
            src="/images/github.png"
            alt="clock"
            width="13"
            height="13"
          />
          <Image
            className="m-0.5"
            src="/images/twitter.png"
            alt="clock"
            width="13"
            height="13"
          />
        </div>
        <div className="flex flex-row align-center">
          <Image
            className="m-0.5"
            src="/images/clock.png"
            alt="clock"
            width="13"
            height="13"
          />
          <span style={userCount}>21H: 33M: 22S</span>
        </div>
      </div>
    </div>
  );
};
