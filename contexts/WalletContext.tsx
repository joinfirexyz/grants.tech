"use client";

import { createContext, useState } from "react";

//just using our fire dev addr for now. replace once the user is able to create their own account
const DUMMY_WALLET_ADDRESS = "0x1eA7225C5749C1F031a06B55bAB335367A3715d4";

interface WalletContext {
  walletAddress: string | undefined;
}

interface WalletContextProviderProps {
  children: React.ReactNode;
}

export const WalletContext = createContext<WalletContext>({
  walletAddress: undefined,
});

//informs the direction that a user is traveling within a given workflow, allowing for customizations to the transitions for that direction
export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({
  children,
}) => {
  //TODO: Grab the wallet address from localstorage or wherever we want to keep it
  const [walletAddress, setWalletAddress] = useState<string | undefined>(
    DUMMY_WALLET_ADDRESS
  );

  return (
    <WalletContext.Provider value={{ walletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};
