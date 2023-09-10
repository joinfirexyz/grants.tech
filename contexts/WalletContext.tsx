"use client";

import { createContext, useState } from "react";

//just using our fire dev addr for now. replace once the user is able to create their own account
const DUMMY_WALLET_ADDRESS = "0x8D6c17Df259C8c11eb334D1B52F44bB6F9752aeF";

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
